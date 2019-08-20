/**
 * Copyright (c) 2016, Lee Byron
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Note: TypeScript already has built-in definitions for
// Iterable, Iterator, AsyncIterable, and AsyncIterator so they are not
// defined here. However you may need to configure TypeScript to include them.

export var $$iterator: symbol

export function isIterable(obj: any): obj is Iterable<any>

export function isArrayLike(obj: any): obj is { length: number }

export function isCollection(obj: any): obj is Iterable<any> | { length: number }

export function getIterator<TValue>(
  iterable: Iterable<TValue>
): Iterator<TValue>
export function getIterator(iterable: any): void | Iterator<any>

export function getIteratorMethod<TValue>(
  iterable: Iterable<TValue>
): () => Iterator<TValue>
export function getIteratorMethod(iterable: any): void | (() => Iterator<any>)

export function createIterator<TValue>(
  collection: Iterable<TValue>
): Iterator<TValue>
export function createIterator(collection: { length: number }): Iterator<any>
export function createIterator(collection: any): void | Iterator<any>

export function forEach<TValue, TCollection extends Iterable<TValue>>(
  collection: TCollection,
  callbackFn: (value: TValue, index: number, collection: TCollection) => any,
  thisArg?: any
): void
export function forEach<TCollection extends { length: number }>(
  collection: TCollection,
  callbackFn: (value: any, index: number, collection: TCollection) => any,
  thisArg?: any
): void

export var $$asyncIterator: symbol

export function isAsyncIterable(obj: any): obj is AsyncIterable<any>

export function getAsyncIterator<TValue>(
  asyncIterable: AsyncIterable<TValue>
): AsyncIterator<TValue>
export function getAsyncIterator(
  asyncIterable: any
): void | AsyncIterator<any>

export function getAsyncIteratorMethod<TValue>(
  asyncIterable: AsyncIterable<TValue>
): () => AsyncIterator<TValue>
export function getAsyncIteratorMethod(
  asyncIterable: any
): void | (() => AsyncIterator<any>)

export function createAsyncIterator<TValue>(
  collection: AsyncIterable<TValue> | Iterable<Promise<TValue> | TValue>
): AsyncIterator<TValue>
export function createAsyncIterator(
  collection: {length: number}
): AsyncIterator<any>
export function createAsyncIterator(
  collection: any
): void | AsyncIterator<any>

export function forAwaitEach<TValue, TCollection extends AsyncIterable<TValue>>(
  collection: TCollection,
  callbackFn: (value: TValue, index: number, collection: TCollection) => any,
  thisArg?: any
): Promise<void>
export function forAwaitEach<TValue, TCollection extends Iterable<Promise<TValue> | TValue>>(
  collection: TCollection,
  callbackFn: (value: TValue, index: number, collection: TCollection) => any,
  thisArg?: any
): Promise<void>
export function forAwaitEach<TCollection extends { length: number }>(
  collection: TCollection,
  callbackFn: (value: any, index: number, collection: TCollection) => any,
  thisArg?: any
): Promise<void>
