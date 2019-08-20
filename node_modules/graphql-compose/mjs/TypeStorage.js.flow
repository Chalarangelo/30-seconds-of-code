/* @flow strict */

import { isFunction } from './utils/is';
import { inspect } from './utils/misc';

// TypeStorage has all methods from Map class
export class TypeStorage<K, V> {
  types: Map<K | string, V>;

  constructor(): TypeStorage<K, V> {
    this.types = new Map();

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  get size(): number {
    return this.types.size;
  }

  clear(): void {
    this.types.clear();
  }

  delete(typeName: K): boolean {
    return this.types.delete(typeName);
  }

  entries(): Iterator<[K | string, V]> {
    return this.types.entries();
  }

  forEach(
    callbackfn: (value: V, index: K | string, map: Map<K | string, V>) => mixed,
    thisArg?: any
  ): void {
    return this.types.forEach(callbackfn, thisArg);
  }

  get(typeName: K): V {
    const v = this.types.get(typeName);
    if (!v) {
      throw new Error(`Type with name ${inspect(typeName)} does not exists`);
    }
    return v;
  }

  has(typeName: K): boolean {
    return this.types.has(typeName);
  }

  keys(): Iterator<K | string> {
    return this.types.keys();
  }

  set(typeName: K | string, value: V): TypeStorage<K, V> {
    this.types.set(typeName, value);
    return this;
  }

  values(): Iterator<V> {
    return this.types.values();
  }

  add(value: V): ?string {
    if (value) {
      let typeName: ?string;
      if (value.getTypeName && value.getTypeName.call) {
        // $FlowFixMe
        typeName = (value.getTypeName(): any);
      } else if (value.name) {
        typeName = (value.name: any);
      }

      if (typeName) {
        this.set(typeName, value);
        return typeName;
      }
    }
    return null;
  }

  hasInstance(typeName: K, ClassObj: any): boolean {
    if (!this.has(typeName)) return false;
    const existedType = this.get(typeName);
    if (existedType && existedType instanceof ClassObj) {
      return true;
    }
    return false;
  }

  getOrSet(typeName: K, typeOrThunk: V | (() => V)): V {
    const existedType = (this.types.get(typeName): any);
    if (existedType) {
      return existedType;
    }

    const gqType: any = isFunction(typeOrThunk) ? (typeOrThunk: any)() : typeOrThunk;
    if (gqType) {
      this.set(typeName, gqType);
    }

    return gqType;
  }
}
