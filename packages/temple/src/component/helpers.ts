import crypto from 'crypto';
import type { SourceFile } from 'ts-morph';
import * as vm from 'vm';

/**
 * Converts a string into camel format
 * ie. "some string" to "someString"
 */
export function camelize(string: string, lower = false) {
  const camel = string.trim()
    //replace special characters with underscores
    .replace(/[^a-zA-Z0-9]/g, '_')
    //replace multiple underscores with a single underscore
    .replace(/_{2,}/g, '_')
    //trim underscores from the beginning and end of the string
    .replace(/^_+|_+$/g, '')
    //replace underscores with capital
    .replace(/([-_][a-z0-9])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  return lower ? lowerlize(camel): capitalize(camel);
}

/**
 * Converts a word into capital format
 * ie. "title" to "Title"
 */
export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Decrypts an encrypted message using a seed
 */
export function decrypt(message: string, seed: string) {
  const iv = crypto.scryptSync(seed, 'salt', 16);
  const key = crypto.scryptSync(seed, 'salt', 32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(message, 'hex')), decipher.final()
  ]);
  return decrypted.toString();
}

/**
 * Encrypts a message using a seed
 */
export function encrypt(message: string, seed: string) {
  const iv = crypto.scryptSync(seed, 'salt', 16);
  const key = crypto.scryptSync(seed, 'salt', 32);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat(
    [cipher.update(message), cipher.final()]
  );
  return encrypted.toString('hex');
}

/**
 * Converts a word into lower format
 * ie. "Title" to "title"
 */
export function lowerlize(word: string) {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

/**
 * Creates a serialized hash of a string
 */
export function serialize(string: string) {
  return crypto
    .createHash('shake256', { outputLength: 10 })
    .update(string)
    .digest('hex');
}

/**
 * Converts a title to a slug
 * ie. "Some Title" or "SomeTitle" to "some-title"
 */
export function slugify(string: string) {
  return string
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .toLowerCase();
}

/**
 * Converts source file to typescript
 */
export const toTS = (source: SourceFile) => source.getFullText();

/**
 * Converts source file to javascript
 */
export const toJS = (source: SourceFile) => source
  .getEmitOutput()
  .getOutputFiles()
  .filter(file => file.getFilePath().endsWith('.js'))
  .map(file => file.getText())
  .join('\n');

/**
 * Virtually loads a module from a source code string
 */
export const load = function(source: string) {
  //create a new vm enviroment with the source code
  const script = new vm.Script(source);
  //get the context
  const context = vm.createContext({ exports: {} });
  //inject missing dependencies
  context.console = console;
  context.module = module;
  context.require = require;
  //now run the server script
  script.runInContext(context);
  return context;
}