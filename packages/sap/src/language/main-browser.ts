import { EmptyFileSystem } from "langium";
import { startLanguageServer } from "langium/lsp";
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from "vscode-languageserver/browser.js";
import { createSapServices } from "./sap-module.js";

declare const self: DedicatedWorkerGlobalScope;

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

const { shared } = createSapServices({ connection, ...EmptyFileSystem });

startLanguageServer(shared);

// shared.workspace.DocumentBuilder.onBuildPhase(DocumentState.Validated, (documents) => {
//   for (const document of documents) {
//     // console.log(document.parseResult);
//     // if (!document.uri.toString().startsWith("builtin")) {
//     //   const hackvm = document.diagnostics?.find((d) => d.severity == 1)
//     //     ? { text: "// Jack source failed validation" }
//     //     : convertJackAstToVMCode(document.parseResult.value as Program, "myfilename");
//     //   const json = jsonSerializer.serialize(document.parseResult.value, {
//     //     sourceText: false,
//     //     textRegions: true,
//     //     refText: true,
//     //   });
//     //   const documentChangeNotification = new NotificationType<DocumentChange>("browser/DocumentChange/" + document.uri.toString());
//     //   // console.log("Sending notification from browser:", hackvm.trace);
//     //   connection.sendNotification(documentChangeNotification, {
//     //     uri: document.uri.toString(),
//     //     content: json,
//     //     diagnostics: document.diagnostics ?? [],
//     //     compiledCode: hackvm.text,
//     //     sourceMap: hackvm.trace,
//     //     symbols: Jack.lsp.DocumentSymbolProvider?.getSymbols(document, { textDocument: { uri: document.uri.toString() } }),
//     //   });
//     // }
//   }
// });
