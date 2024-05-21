import type { Listenable, EventAction } from '@blanquera/types';

import { EventEmitter } from '@blanquera/types';

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
      if (document.readyState === 'complete' 
        || document.readyState === 'interactive'
      ) {
        // call on next available tick
        setTimeout(next, 1);
      } else {
        document.addEventListener('DOMContentLoaded', () => next());
      }
      return this;
    }

    return super.on(event, callback, priority);
  }
}

const emitter = new TempleEmitter();

export default emitter;