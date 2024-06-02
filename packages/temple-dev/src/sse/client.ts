import type { ClientOptions } from './types';

export default function client(options: ClientOptions = {}) {
  const { path = '/__temple_dev__' } = options;
  const source = new EventSource(path);
  source.addEventListener('refresh', () => {
    window.location.reload();
  });
}