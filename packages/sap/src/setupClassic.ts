import { MonacoEditorLanguageClientWrapper, UserConfig } from "monaco-editor-wrapper";
import { configureWorker, defineUserServices } from "./setupCommon.js";
import monarchSyntax from "./syntaxes/sap.monarch.js";

const code = `lxi sp, 0f0h
mvi a, 1
mvi b, 0

loop:
out
mov c, a
mov a, b
cpi 1
mov a, c
jz rotate_right
jnz rotate_left
jmp loop

rotate_right:
rar
cpi 01
cz set_left
jmp loop

rotate_left:
ral
cpi 80
cz set_right
jmp loop

set_left:
mvi  b, 0
ret

set_right:
mvi b, 1
ret

hlt`;

export const setupConfigClassic = (): UserConfig => {
  return {
    wrapperConfig: {
      serviceConfig: defineUserServices(),
      editorAppConfig: {
        $type: "classic",
        languageId: "sap",
        code,
        useDiffEditor: false,
        languageExtensionConfig: { id: "langium" },
        languageDef: monarchSyntax,
        editorOptions: {
          "semanticHighlighting.enabled": true,
          theme: "vs-dark",
        },
      },
    },
    languageClientConfig: configureWorker(),
  };
};

export const executeClassic = async (htmlElement: HTMLElement) => {
  const userConfig = setupConfigClassic();
  const wrapper = new MonacoEditorLanguageClientWrapper();
  await wrapper.initAndStart(userConfig, htmlElement);
};
