import { type Module, inject } from "langium";
import {
  createDefaultModule,
  createDefaultSharedModule,
  type DefaultSharedModuleContext,
  type LangiumServices,
  type LangiumSharedServices,
  type PartialLangiumServices,
} from "langium/lsp";
import { SapGeneratedModule, SapGeneratedSharedModule } from "./generated/module.js";
import { SapValidator, registerValidationChecks } from "./sap-validator.js";
import { SapSignatureHelpProvider } from "./sap-signature.js";
import { SapDocumentationProvider } from "./sap-documentation.js";
import { SapHoverProvider } from "./sap-hover.js";

/**
 * Declaration of custom services - add your own service classes here.
 */
export type SapAddedServices = {
  validation: {
    SapValidator: SapValidator;
  };
};

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type SapServices = LangiumServices & SapAddedServices;

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const SapModule: Module<SapServices, PartialLangiumServices & SapAddedServices> = {
  documentation: { DocumentationProvider: () => new SapDocumentationProvider() },
  validation: {
    SapValidator: () => new SapValidator(),
  },
  lsp: {
    // CompletionProvider: (services) => new SapCompletionProvider(services),
    SignatureHelp: (services) => new SapSignatureHelpProvider(services),
    // CodeActionProvider: (services) => new JackCodeActionProvider(),
    HoverProvider: (services) => new SapHoverProvider(services),
  },
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createSapServices(context: DefaultSharedModuleContext): {
  shared: LangiumSharedServices;
  Sap: SapServices;
} {
  const shared = inject(createDefaultSharedModule(context), SapGeneratedSharedModule);
  const Sap = inject(createDefaultModule({ shared }), SapGeneratedModule, SapModule);
  shared.ServiceRegistry.register(Sap);
  registerValidationChecks(Sap);
  if (!context.connection) {
    // We don't run inside a language server
    // Therefore, initialize the configuration provider instantly
    shared.workspace.ConfigurationProvider.initialized({});
  }
  return { shared, Sap };
}
