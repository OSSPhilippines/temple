import type { 
  CompletionItem,
  Connection,
  Diagnostic,
  DocumentDiagnosticReport,
  InitializeResult
} from 'vscode-languageserver/node';
import {
  CompletionItemKind,
  createConnection,
  DiagnosticSeverity,
  DocumentDiagnosticReportKind,
  DidChangeConfigurationNotification,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import LanguageSettings from './LanguageSettings';

export type { 
  Diagnostic,
  InitializeResult,
  DocumentDiagnosticReport
};

export { 
  DiagnosticSeverity,
  DidChangeConfigurationNotification,
  DocumentDiagnosticReportKind,
  CompletionItem,
  CompletionItemKind,
  TextDocument,
  TextDocumentSyncKind
};

/**
 * Event wrapper for VSCode Language Server
 */
export default class LanguageServer {
  //the server connection
  protected _connection: Connection|null = null;
  //list of open documents
  protected _documents: TextDocuments<TextDocument>|null = null;
  //custom language settings
  protected _settings: LanguageSettings;
  //has configuration capability
  protected _canConfigure = false;
  //has diagnostic related information capability
  protected _canDiagnose = false;
  //has workspace folder capability
  protected _inWorkspace = false;

  /**
   * Returns true if has configuration capability
   */
  public get canConfigure() {
    return this._canConfigure;
  }

  /**
   * Returns true if has diagnostic related information capability
   */
  public get canDiagnose() {
    return this._canDiagnose;
  }

  /**
   * Returns true if has workspace folder capability
   */
  public get inWorkspace() {
    return this._inWorkspace;
  }

  /**
   * Whether if has configuration capability
   */
  public set canConfigure(can: boolean) {
    this._canConfigure = can;
  }

  /**
   * Whether if has diagnostic related information capability
   */
  public set canDiagnose(can: boolean) {
    this._canDiagnose = can;
  }

  /**
   * Whether if has workspace folder capability
   */
  public set inWorkspace(inside: boolean) {
    this._inWorkspace = inside;
  }

  /**
   * Returns the server connection
   */
  public get connection() {
    if (!this._connection) {
      // Create a connection for the server, using Node's IPC as a transport.
      // Also include all preview / proposed LSP features.
      this._connection = createConnection(ProposedFeatures.all);
    }
    return this._connection;
  }

  /**
   * Returns the list of open documents
   */
  public get documents() {
    if (!this._documents) {
      // Create a simple text document manager.
      this._documents = new TextDocuments(TextDocument);
    }

    return this._documents;
  }

  /**
   * Returns the custom language settings
   */
  public get settings() {
    return this._settings;
  }

  /**
   * Processes the initialization parameters
   */
  public constructor(settings: Record<string, any>) {
    this._settings = new LanguageSettings(this, settings);
  }

  /**
   * Starts the server
   */
  public listen() {
    // Make the text document manager listen on the connection
    // for open, change and close text document events
    this.documents.listen(this.connection);
    
    // Listen on the connection
    this.connection.listen();
  }
}