declare module 'timm' {
  type ArrayOrObject = Array<any> | Object;
  type Key = number | string;

  export function clone<T = ArrayOrObject>(obj: T): T;
  export function addLast<T>(array: Array<T>, val: Array<T> | T): Array<T>;
  export function addFirst<T>(array: Array<T>, val: Array<T> | T): Array<T>;
  export function removeLast<T>(array: Array<T>): Array<T>;
  export function removeFirst<T>(array: Array<T>): Array<T>;
  export function insert<T>(
    array: Array<T>,
    idx: number,
    val: Array<T> | T
  ): Array<T>;
  export function removeAt<T>(array: Array<T>, idx: number): Array<T>;
  export function replaceAt<T>(
    array: Array<T>,
    idx: number,
    newItem: T
  ): Array<T>;
  export function getIn(obj: ArrayOrObject | undefined, path: Array<Key>): any;
  export function set<T>(obj: T | undefined, key: Key, val: any): T;
  export function setIn<T = ArrayOrObject>(
    obj: T,
    path: Array<Key>,
    val: any
  ): T;
  export function update<T = ArrayOrObject>(
    obj: T,
    key: Key,
    fnUpdate: (prevValue: any) => any
  ): T;
  export function updateIn<T = ArrayOrObject>(
    obj: T,
    path: Array<Key>,
    fnUpdate: (prevValue: any) => any
  ): T;
  export function merge(
    a: Object,
    b?: Object,
    c?: Object,
    d?: Object,
    e?: Object,
    f?: Object,
    ...rest: Array<Object>
  ): Object;
  export function mergeDeep(
    a: Object,
    b?: Object,
    c?: Object,
    d?: Object,
    e?: Object,
    f?: Object,
    ...rest: Array<Object>
  ): Object;
  export function mergeIn<T = ArrayOrObject>(
    a: T,
    path: Array<Key>,
    b?: Object,
    c?: Object,
    d?: Object,
    e?: Object,
    f?: Object,
    ...rest: Array<Object>
  ): T;
  export function omit(obj: Object, attrs: Array<string> | string): Object;
  export function addDefaults(
    a: Object,
    b?: Object,
    c?: Object,
    d?: Object,
    e?: Object,
    f?: Object,
    ...rest: Array<Object>
  ): Object;
}
