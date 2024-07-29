export type { ExtensionContext } from 'vscode';
export type ClientOptions = {
  id: string,
  label: string,
  server: string,
  language: string,
  scheme?: string,
  watcher?: string
};

import { workspace } from 'vscode';
import {
	LanguageClient as VSLanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

export default class LanguageClient {
  // The vscode language client
  protected _client: VSLanguageClient;

  /**
   * Makes a new vscode language client
   */
  constructor(
    id: string,
    label: string,
    serverOptions: ServerOptions, 
    clientOptions: LanguageClientOptions
  ) {
    // Create the language client and start the client.
    this._client = new VSLanguageClient(
      id,
      label,
      serverOptions,
      clientOptions
    );
  }

  /**
   * Starts the client
   */
  activate() {
    // Start the client. This will also launch the server
    return this._client.start();
  }
  
  /**
   * Stops the client
   */
  deactivate(): Thenable<void> | undefined {
    return this._client.stop();
  }
}

export function useBasic(options: ClientOptions) {
  const { 
    id, 
    label, 
    server, 
    language, 
    scheme = 'file', 
    watcher = '**/.clientrc' 
  } = options;

  // If the extension is launched in debug mode 
  // then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: server, transport: TransportKind.ipc },
    debug: {
      module: server,
      transport: TransportKind.ipc,
    }
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: [{ scheme, language }],
    synchronize: {
      // Notify the server about file changes to 
      // '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher(watcher)
    }
  };

  return new LanguageClient(
    id,
    label,
    serverOptions,
    clientOptions
  );
}