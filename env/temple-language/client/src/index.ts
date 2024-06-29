import type { ExtensionContext } from './language/LanguageClient';

import path from 'path';
import LanguageClient, { useBasic } from './language/LanguageClient';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // The server is implemented in node
  const server = context.asAbsolutePath(path.join('server', 'out', 'index.js'));

  client = useBasic({
    id: 'languageServerExample',
    label: 'Language Server Example',
		language: 'plaintext',
    server: server
  });

  // Start the client. This will also launch the server
  client.activate();
}

export function deactivate() {
  if (!client) {
    return undefined;
  }
  return client.deactivate();
}