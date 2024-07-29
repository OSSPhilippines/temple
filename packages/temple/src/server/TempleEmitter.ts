/**
 * Server emitter shim
 */
export class TempleEmitter {
  /**
   * Emits an event
   */
  emit<T = any>(event: string, target?: T) {
    return this;
  }

  /**
   * Listens for an event
   */
  on(event: string, callback: EventListener) {
    return this;
  }

  /**
   * Listens for an event once
   */
  once(event: string, callback: EventListener) {
    return this;
  }

  /**
   * Unbinds an event
   */
  unbind(event: string, callback: EventListener) {
    return this;
  }
}

const emitter = new TempleEmitter();

export default emitter;