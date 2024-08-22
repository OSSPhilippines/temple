import type { PluginBuild } from 'esbuild';
import type FSInterface from '../filesystem/FSInterface';
import type TempleDocument from '../server/TempleDocument';
export type Platform = 'node'|'browser';

export type DocumentClass = {
  new(client: string): TempleDocument
};

export type Build = {
  source: { 
    server: string, 
    client: string
  },
  TempleDocument: DocumentClass,
  document: TempleDocument
};

export type AliasPluginOptions = {
  cwd?: string,
  fs?: FSInterface
};

export type ComponentPluginOptions = {
  brand?: string,
  cwd?: string,
  fs?: FSInterface,
  seed?: string,
  tsconfig?: string,
  extname?: string
};

export type DocumentPluginOptions = {
  brand?: string,
  cwd?: string,
  fs?: FSInterface,
  seed?: string,
  tsconfig?: string,
  extname?: string
};

export type BuildOptions = {
  minify?: boolean,
  bundle?: boolean,
  platform?: Platform,
  globalName?: string,
  plugins?: {
    name: string,
    setup: (build: PluginBuild) => void
  }[]
};

export type BuilderOptions = { 
  minify?: boolean,
  bundle?: boolean,
  tsconfig?: string,
  brand?: string,
  cwd?: string,
  fs?: FSInterface,
  seed?: string,
  component_extname?: string,
  document_extname?: string
};