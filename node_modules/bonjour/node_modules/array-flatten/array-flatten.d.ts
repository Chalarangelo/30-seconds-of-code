declare function flatten <T> (array: flatten.NestedArray<T>): T[];

declare namespace flatten {
  export interface NestedArray <T> extends ReadonlyArray<T | NestedArray<T>> {}

  export interface NestedList <T> {
    [index: number]: T | NestedList<T>;
    length: number;
  }

  export function from <T> (array: NestedList<T>): T[];
  export function depth <T> (array: NestedArray<T>, depth: number): NestedArray<T>;
  export function depthFrom <T> (array: NestedList<T>, depth: number): NestedArray<T>;
}

export = flatten;
