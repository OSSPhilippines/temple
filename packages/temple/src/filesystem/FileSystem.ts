import type { 
  FileStat,
  FileRecursiveOption,
  FileStream
} from '../types';

export default interface FileSystem {
  existsSync(path: string): boolean;
  readFileSync(path: string, encoding: BufferEncoding): string;
  realpathSync(string: string): string;
  lstatSync(path: string): FileStat;
  writeFileSync(path: string, data: string): void;
  mkdirSync(path: string, options?: FileRecursiveOption): void
  createReadStream(path: string): FileStream;
}