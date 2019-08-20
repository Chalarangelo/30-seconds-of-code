import { Thunk } from './definitions';

export function resolveMaybeThunk<T>(thingOrThunk: Thunk<T>): T;

export function camelCase(str: string): string;

export function getPluralName(name: string): string;

export function upperFirst(str: string): string;

export function clearName(str: string): string;

export function omit(obj: object, keys: string[]): object;

export function only(obj: object, keys: string[]): object;

/**
 * Used to print values in error messages.
 */
export function inspect(value: any): string;

export function forEachKey<V>(
  arrayOrObject: { [key: string]: V },
  callback: (value: V, key: string) => void
): void;
