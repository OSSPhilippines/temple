import type { ClientOptions } from './types';

export default function client(id: string, options: ClientOptions = {}, wait = 0) {
  const { path = '/__temple_dev__' } = options;
  const source = new EventSource(path);
  source.addEventListener('refresh', message => {
    const data = JSON.parse(message.data) as Record<string, string[]>;
    if (!data[id]) return;
    data[id].forEach(code => {
      try {
        const script = new Function(code);
        script();
      } catch (e) {
        console.error(e);
      }
    });
  });

  source.onopen = () => {
    if (wait > 0) {
      window.location.reload();
    }
  };

  source.onerror = () => {
    source.close();
    if (wait < 10000) {
      setTimeout(() => client(id, options, wait + 2000), wait);
    } else {
      console.error(
        'Too many connection attempts. Please check your server and refresh page.'
      );
    }
  };
}