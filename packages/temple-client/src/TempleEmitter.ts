export class TempleEmitter extends EventTarget {
  /**
   * Emits an event
   */
  emit<T = any>(event: string, target?: T) {
    this.dispatchEvent(new CustomEvent<T>(event, { detail: target }));
    return this;
  }

  /**
   * Listens for an event
   */
  on(event: string, callback: EventListener) {
    if (event === 'ready') {
      // see if DOM is already available
      if (document.readyState !== 'loading') {
        const event = new CustomEvent<undefined>('ready');
        // call on next available tick
        setTimeout(() => callback(event), 1);
        return this;
      }
    }
    this.addEventListener(event, callback);
    return this;
  }

  /**
   * Listens for an event once
   */
  once(event: string, callback: EventListener) {
    const unbinder: EventListener = e => {
      this.unbind(event, unbinder);
      callback(e);
    };
    this.on(event, unbinder);
    return this;
  }

  /**
   * Unbinds an event
   */
  unbind(event: string, callback: EventListener) {
    this.removeEventListener(event, callback);
    return this;
  }
}

const emitter = new TempleEmitter();

document.onreadystatechange = () => {
  if (document.readyState !== 'loading') {
    emitter.emit('ready');
  }
};

export default emitter;