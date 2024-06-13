import type { ClientOptions } from './types';
import { EventEmitter } from '@blanquera/types';
import SocketClient from './SocketClient';

export type * from './types';

export { SocketClient };

export default function client(options: Record<string, any> = {}) {
  options.emitter = options.emitter || new EventEmitter();
  return new SocketClient(options as ClientOptions);
}