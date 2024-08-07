import type { 
  TextDocument,
  Diagnostic,
  InitializeResult,
  DocumentDiagnosticReport
} from './language/LanguageServer';

import LanguageServer, { 
  DiagnosticSeverity,
  DidChangeConfigurationNotification,
  DocumentDiagnosticReportKind,
  CompletionItem,
  CompletionItemKind,
  TextDocumentSyncKind
} from './language/LanguageServer';

import { ComponentException, Tokenizer } from '@ossph/temple/compiler';

// - validate example usage
async function validate(document: TextDocument) {
  // In this simple example we get the settings for every validate run.
  const settings = await server.settings.get(document.uri);

  const text = document.getText();

	const diagnostics: Diagnostic[] = [];
	try {
		Tokenizer.tokenize(text);
	} catch (e) {
		const error = e as ComponentException;
		const diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Error,
			message: error.message,
			range: {
				start: document.positionAt(error.start),
				end: document.positionAt(error.end)
			}
		};
		diagnostics.push(diagnostic);
	}

  // Send the computed diagnostics to VSCode.
  server.connection.sendDiagnostics({ uri: document.uri, diagnostics });

  return diagnostics;
};

const server = new LanguageServer({ maxNumberOfProblems: 1000 });

// Triggered when the language server is first initialized. This is 
// one of the first messages sent by the client to the server.
server.connection.onInitialize(params => {
  const capabilities = params.capabilities;
  // Does the client support the `workspace/configuration` request?
  // If not, we fall back using global settings.
  server.canConfigure = !!(
    capabilities.workspace && !!capabilities.workspace.configuration
  );
  server.inWorkspace = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  );
  server.canDiagnose = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: true
      }
    }
  };
  if (server.inWorkspace) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true
      }
    };
  }
  return result;
});
// Triggered after the server has been initialized. This is used for 
// any additional setup that might be needed after initialization.
server.connection.onInitialized(() => {
  if (server.canConfigure) {
    // Register for all configuration changes.
    server.connection.client.register(DidChangeConfigurationNotification.type, undefined);
  }
  if (server.inWorkspace) {
    server.connection.workspace.onDidChangeWorkspaceFolders(event => {
      server.connection.console.log('Workspace folder change event received.');
    });
  }
});
// Triggered when the client sends an exit notification, usually 
// when the client is shutting down.
server.connection.onExit(() => {
  server.connection.console.log('The client is shutting down.');
});
// Triggered when the client detects changes in configuration 
// settings that might affect the server's behavior.
server.connection.onDidChangeConfiguration(change => {
  server.settings.reset(change.settings.languageServerExample);
  // Revalidate all open text documents
  server.documents.all().forEach(document => {
    validate(document);
  });
});
// Triggered when watched files change, such as when a file is 
// created, modified, or deleted.
server.connection.onDidChangeWatchedFiles(change => {
  server.connection.console.log('We received an file change event');
});
// Triggered when the user requests code completion suggestions. 
// This usually occurs when the user is typing and invokes the 
// auto-completion feature (e.g., by typing a dot after an object or 
// invoking a completion command manually). The server responds with 
// a list of completion items relevant to the context.
// This handler provides the initial list of the completion items.
server.connection.onCompletion(position => {
  const items: CompletionItem[] = [];
  // The pass parameter contains the position of the text document in
  // which code complete got requested. For the example we ignore this
  // info and always provide the same completion items.
  items.push({
    label: 'TypeScript',
    kind: CompletionItemKind.Text,
    data: 1
  },
  {
    label: 'JavaScript',
    kind: CompletionItemKind.Text,
    data: 2
  });
  return items;
});
// Triggered when additional information about a specific completion 
// item is needed. After the initial completion items are provided by 
// the onCompletion handler, the client may request more details 
// about a particular item (e.g., documentation, additional text 
// edits). This allows the server to provide more detailed and 
// context-specific information for the selected completion item.
// This handler resolves additional information for the item selected in
// the completion list.
server.connection.onCompletionResolve(item => {
  if (item.data === 1) {
    item.detail = 'TypeScript details';
    item.documentation = 'TypeScript documentation';
  } else if (item.data === 2) {
    item.detail = 'JavaScript details';
    item.documentation = 'JavaScript documentation';
  }
  return item;
});

server.connection.languages.diagnostics.on(async (params) => {
  const document = server.documents.get(params.textDocument.uri);

  if (document !== undefined) {
    return {
      kind: DocumentDiagnosticReportKind.Full,
      items: await validate(document)
    } satisfies DocumentDiagnosticReport;
  } else {
    // We don't know the document. We can either try to read it from disk
    // or we don't report problems for it.
    return {
      kind: DocumentDiagnosticReportKind.Full,
      items: []
    } satisfies DocumentDiagnosticReport;
  }
});

// Only keep settings for open documents
server.documents.onDidClose(event => {
  server.settings.remove(event.document.uri);
});
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
server.documents.onDidChangeContent(change => {
  validate(change.document);
});

server.listen();