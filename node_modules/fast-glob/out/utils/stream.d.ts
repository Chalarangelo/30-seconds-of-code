/// <reference types="node" />
/**
 * Merge multiple streams and propagate their errors into one stream in parallel.
 */
export declare function merge(streams: NodeJS.ReadableStream[]): NodeJS.ReadableStream;
