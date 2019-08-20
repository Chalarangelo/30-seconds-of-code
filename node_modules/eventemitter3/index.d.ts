/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 */
declare class EventEmitter<EventTypes extends string | symbol = string | symbol> {
  static prefixed: string | boolean;

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   */
  eventNames(): Array<EventTypes>;

  /**
   * Return the listeners registered for a given event.
   */
  listeners(event: EventTypes): Array<EventEmitter.ListenerFn>;

  /**
   * Return the number of listeners listening to a given event.
   */
  listenerCount(event: EventTypes): number;

  /**
   * Calls each of the listeners registered for a given event.
   */
  emit(event: EventTypes, ...args: Array<any>): boolean;

  /**
   * Add a listener for a given event.
   */
  on(event: EventTypes, fn: EventEmitter.ListenerFn, context?: any): this;
  addListener(event: EventTypes, fn: EventEmitter.ListenerFn, context?: any): this;

  /**
   * Add a one-time listener for a given event.
   */
  once(event: EventTypes, fn: EventEmitter.ListenerFn, context?: any): this;

  /**
   * Remove the listeners of a given event.
   */
  removeListener(event: EventTypes, fn?: EventEmitter.ListenerFn, context?: any, once?: boolean): this;
  off(event: EventTypes, fn?: EventEmitter.ListenerFn, context?: any, once?: boolean): this;

  /**
   * Remove all listeners, or those of the specified event.
   */
  removeAllListeners(event?: EventTypes): this;
}

declare namespace EventEmitter {
  export interface ListenerFn {
    (...args: Array<any>): void;
  }

  export interface EventEmitterStatic {
    new<EventTypes extends string | symbol = string | symbol>(): EventEmitter<EventTypes>;
  }

  export const EventEmitter: EventEmitterStatic;
}

export = EventEmitter;
