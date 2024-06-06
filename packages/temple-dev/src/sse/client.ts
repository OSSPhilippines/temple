import type { ClientOptions } from './types';

export default function client(options: ClientOptions = {}, wait = 0) {
  const { path = '/__temple_dev__' } = options;
  const source = new EventSource(path);
  source.addEventListener('refresh', () => {
    window.location.reload();
  });

  source.onopen = () => {
    if (wait > 0) {
      console.clear();
      console.log('Connection re-established.')
    }
    wait = 0;
  };

  source.onerror = () => {
    source.close();
    if (wait < 10000) {
      setTimeout(() => client(options, wait + 2000), wait);
    } else {
      console.error(
        'Too many connection attempts. Please check your server and refresh page.'
      );
    }
  };
}