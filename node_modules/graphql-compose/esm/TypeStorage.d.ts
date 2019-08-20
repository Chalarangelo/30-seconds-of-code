import { GraphQLNamedType, GraphQLScalarType } from 'graphql';
import { ObjectTypeComposer } from './ObjectTypeComposer';
import { InputTypeComposer } from './InputTypeComposer';
import { ScalarTypeComposer } from './ScalarTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import { InterfaceTypeComposer } from './InterfaceTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';

export class TypeStorage<K, V> {
  public types: Map<K, V>;
  public readonly size: number;

  public constructor();

  public clear(): void;

  public delete(key: K): boolean;

  public entries(): Iterator<[K, V]>;

  public forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => any, thisArg?: any): void;

  public get(key: K): V;

  public has(key: K): boolean;

  public keys(): Iterator<K>;

  public set(key: K, value: V): this;

  public values(): Iterator<V>;

  public add(value: V): string | null;

  public hasInstance(key: K, ClassObj: any): boolean;

  public getOrSet(key: K, typeOrThunk: V | (() => V)): V;
}
