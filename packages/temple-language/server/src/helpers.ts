import { Position } from 'vscode-languageserver/node';
import { URI } from 'vscode-uri';

/**
 * Returns the path of the url if the scheme is file
 */
export function urlToPath(stringUrl: string): string | null {
  const url = URI.parse(stringUrl);
  if (url.scheme !== 'file') {
    return null;
  }
  return url.fsPath.replace(/\\/g, '/');
}

/**
 * Returns the url of the path
 */
export function pathToUrl(path: string) {
  return URI.file(path).toString();
}

/**
 * Some paths (on windows) start with a upper case driver letter, some don't.
 * This is normalized here.
 */
export function normalizePath(path: string): string {
  return URI.file(path).fsPath.replace(/\\/g, '/');
}

/**
 * URIs coming from the client could be encoded in a different
 * way than expected / than the internal services create them.
 * This normalizes them to be the same as the internally generated ones.
 */
export function normalizeUri(uri: string): string {
  return URI.parse(uri).toString();
}

/**
 * Returns the highest minimum value
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, num));
}

/**
 * Get the line and character based on the offset
 */
export function positionAt(
  offset: number,
  text: string,
  lineOffsets = getLineOffsets(text)
): Position {
  offset = clamp(offset, 0, text.length);

  let low = 0;
  let high = lineOffsets.length;
  if (high === 0) {
      return Position.create(0, offset);
  }

  while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const lineOffset = lineOffsets[mid];

      if (lineOffset === offset) {
          return Position.create(mid, 0);
      } else if (offset > lineOffset) {
          low = mid + 1;
      } else {
          high = mid - 1;
      }
  }

  // low is the least x for which the line offset is larger than the current offset
  // or array.length if no line offset is larger than the current offset
  const line = low - 1;
  return Position.create(line, offset - lineOffsets[line]);
}

/**
 * Get the offset of the line and character position
 */
export function offsetAt(
  position: Position,
  text: string,
  lineOffsets = getLineOffsets(text)
): number {
  if (position.line >= lineOffsets.length) {
      return text.length;
  } else if (position.line < 0) {
      return 0;
  }

  const lineOffset = lineOffsets[position.line];
  const nextLineOffset =
      position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : text.length;

  return clamp(nextLineOffset, lineOffset, lineOffset + position.character);
}

/**
 * Get the line offsets
 */
export function getLineOffsets(text: string) {
  const lineOffsets = [];
  let isLineStart = true;

  for (let i = 0; i < text.length; i++) {
      if (isLineStart) {
          lineOffsets.push(i);
          isLineStart = false;
      }
      const ch = text.charAt(i);
      isLineStart = ch === '\r' || ch === '\n';
      if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
          i++;
      }
  }

  if (isLineStart && text.length > 0) {
      lineOffsets.push(text.length);
  }

  return lineOffsets;
}

export type GetCanonicalFileName = (fileName: string) => string;
/**
 * adopted from https://github.com/microsoft/TypeScript/blob/8192d550496d884263e292488e325ae96893dc78/src/compiler/core.ts#L2312
 */
export function createGetCanonicalFileName(
    useCaseSensitiveFileNames: boolean
): GetCanonicalFileName {
    return useCaseSensitiveFileNames ? identity : toFileNameLowerCase;
}

function identity<T>(x: T) {
  return x;
}

/**
 * adopted from https://github.com/microsoft/TypeScript/blob/8192d550496d884263e292488e325ae96893dc78/src/compiler/core.ts#L1769-L1807
 * see the comment there about why we can't just use String.prototype.toLowerCase() here
 */
export function toFileNameLowerCase(x: string) {
  const filenameLower = /[^\u0130\u0131\u00DFa-z0-9\\/:\-_\. ]+/g;
  return filenameLower.test(x) ? x.replace(filenameLower, toLowerCase) : x;
}

function toLowerCase(x: string) {
  return x.toLowerCase();
}