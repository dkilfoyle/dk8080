import { DocumentState, EmptyFileSystem } from "langium";
import { startLanguageServer } from "langium/lsp";
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from "vscode-languageserver/browser.js";
import { createSapServices } from "./sap-module.js";
import { Argument, isInstruction, isLabel, isProgram } from "./generated/ast.js";
import { opcodes } from "./opcodes.js";

declare const self: DedicatedWorkerGlobalScope;

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

const { shared } = createSapServices({ connection, ...EmptyFileSystem });

startLanguageServer(shared);

shared.workspace.DocumentBuilder.onBuildPhase(DocumentState.Validated, (documents) => {
  for (const document of documents) {
    if (document.diagnostics?.length == 0) {
      const root = document.parseResult.value;
      let addr = 0;
      const addrMap: Record<string, number> = {};
      const lineOpcodeMap: Record<number, string> = {};

      if (isProgram(root)) {
        // first parse, build address map
        root.lines.forEach((line, lineNum) => {
          if (isInstruction(line)) {
            const lookup = Object.entries(opcodes).find(([_n, o]) => {
              if (o.instr != line.op.name.toUpperCase()) return false;
              if (o.arg1 != "") {
                if (["imm16", "imm8", "addr"].includes(o.arg1)) {
                  if (line.arg1 == undefined) return false;
                } else if (o.arg1 != line.arg1?.name?.toUpperCase()) return false;
              }
              if (o.arg2 != "") {
                if (["imm16", "imm8", "addr"].includes(o.arg2)) {
                  if (line.arg2 == undefined) return false;
                } else if (o.arg2 != line.arg2?.name?.toUpperCase()) return false;
              }
              return true;
            });
            if (!lookup) throw Error("Unable to find opcode");
            addr += lookup[1].bytes;
            lineOpcodeMap[lineNum] = lookup[0];
            // console.log(line, lookup);
          } else if (isLabel(line)) {
            addrMap[line.name.slice(0, -1)] = addr;
          }
        });

        const bytes = new Uint8Array(addr);
        addr = 0;
        // second parse, build bytes
        const addArgBytes = (arg: Argument, argType: string) => {
          if (argType == "imm8") {
            if (arg.number == undefined) throw Error("Missing imm8 arg.number");
            bytes[addr++] = arg.number & 0xff;
          } else if (argType == "imm16") {
            if (arg.number == undefined) throw Error("Missing imm16 arg.number");
            bytes[addr++] = arg.number & 0xff;
            bytes[addr++] = (arg.number >> 8) & 0xff;
          } else if (argType == "addr") {
            if (!arg) throw Error("Missing addr arg");
            if (arg.name) {
              const labelAddr = addrMap[arg.name];
              if (labelAddr == undefined) {
                throw Error("Label not found");
              }
              bytes[addr++] = labelAddr & 0xff;
              bytes[addr++] = (labelAddr >> 8) & 0xff;
            } else if (arg.number) {
              bytes[addr++] = arg.number & 0xff;
              bytes[addr++] = (arg.number >> 8) & 0xff;
            } else throw Error();
          }
        };
        root.lines.forEach((line, lineNum) => {
          if (isInstruction(line)) {
            const lookup = opcodes[lineOpcodeMap[lineNum]];
            bytes[addr++] = lookup.code & 0xff;
            if (line.arg1) addArgBytes(line.arg1, lookup.arg1);
            if (line.arg2) addArgBytes(line.arg2, lookup.arg2);
          }
        });

        console.log({
          addrMap,
          bytes: [...bytes].map((x) => x.toString(16)),
          lineOpcodeMap,
        });
      }
    }

    // if (!document.uri.toString().startsWith("builtin")) {
    //   const hackvm = document.diagnostics?.find((d) => d.severity == 1)
    //     ? { text: "// Jack source failed validation" }
    //     : convertJackAstToVMCode(document.parseResult.value as Program, "myfilename");
    //   const json = jsonSerializer.serialize(document.parseResult.value, {
    //     sourceText: false,
    //     textRegions: true,
    //     refText: true,
    //   });
    //   const documentChangeNotification = new NotificationType<DocumentChange>("browser/DocumentChange/" + document.uri.toString());
    //   // console.log("Sending notification from browser:", hackvm.trace);
    //   connection.sendNotification(documentChangeNotification, {
    //     uri: document.uri.toString(),
    //     content: json,
    //     diagnostics: document.diagnostics ?? [],
    //     compiledCode: hackvm.text,
    //     sourceMap: hackvm.trace,
    //     symbols: Jack.lsp.DocumentSymbolProvider?.getSymbols(document, { textDocument: { uri: document.uri.toString() } }),
    //   });
    // }
  }
});
