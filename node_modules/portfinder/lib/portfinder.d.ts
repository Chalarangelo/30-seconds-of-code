/**
 * portfinder.js typescript definitions.
 *
 * (C) 2011, Charlie Robbins
 */

type PortfinderCallback = (err: Error, port: number) => void;

interface PortFinderOptions{
  /**
   * Host to find available port on.
   */
  host?: string;
  /**
   * search start port (equals to port when not provided)
   * This exists because getPort and getPortPromise mutates port state in
   * recursive calls and doesn't have a way to retrieve begininng port while
   * searching.
   */
  startPort?: number;
  /**
   * Minimum port (takes precedence over `basePort`).
   */
  port?: number;
  /**
   * Maximum port
   */
  stopPort?: number;
}

/**
 * The lowest port to begin any port search from.
 */
export let basePort: number;

/**
 * Responds with a unbound port on the current machine.
 */
export function getPort(callback: PortfinderCallback): void;
export function getPort(options: PortFinderOptions, callback: PortfinderCallback): void;

export function getPorts(count: number, options: PortFinderOptions, callback: (err: Error, ports: Array<number>) => void): void;

/**
 * Responds a promise of an unbound port on the current machine.
 */
export function getPortPromise(options?: PortFinderOptions): Promise<number>;
