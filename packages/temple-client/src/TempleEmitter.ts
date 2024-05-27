import type { Listenable, EventAction } from '@blanquera/types';

import EventEmitter from '@blanquera/types/dist/EventEmitter';

export class TempleEmitter<Args extends any[]> extends EventEmitter<Args> {
  /**
   * Adds a callback to the given event listener
   */
  on(
    event: Listenable, 
    callback: EventAction<Args>, 
    priority: number = 0
  ): EventEmitter<Args> {
    if (event === 'ready') {
      const next = callback as unknown as Function;
      // see if DOM is already available
      if (document.readyState !== 'loading') {
        // call on next available tick
        setTimeout(next, 1);
        return this;
      }
    }

    return super.on(event, callback, priority);
  }
}

const emitter = new TempleEmitter();

document.onreadystatechange = () => {
  if (document.readyState !== 'loading') {
    emitter.emit('ready');
  }
};

export default emitter;