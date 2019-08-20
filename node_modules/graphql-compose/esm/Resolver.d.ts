import {
  GraphQLArgumentConfig,
  GraphQLFieldConfig,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLResolveInfo,
  GraphQLFieldConfigArgumentMap,
} from 'graphql';
import * as graphql from './graphql';
import { InputTypeComposer } from './InputTypeComposer';
import { SchemaComposer } from './SchemaComposer';
import {
  ComposeArgumentConfig,
  ComposeArgumentType,
  ComposeArgumentConfigAsObject,
  ComposeFieldConfigArgumentMap,
  ComposeOutputType,
  ObjectTypeComposer,
  ArgsMap,
} from './ObjectTypeComposer';
import { ProjectionType } from './utils/projection';
import { Extensions } from './utils/definitions';

export type ResolveParams<TSource, TContext, TArgs = ArgsMap> = {
  source: TSource;
  args: TArgs;
  context: TContext;
  info: GraphQLResolveInfo;
  projection: Partial<ProjectionType>;
  [opt: string]: any;
};

export type ResolverKinds = 'query' | 'mutation' | 'subscription';

export type ResolverFilterArgFn<TSource, TContext, TArgs = ArgsMap> = (
  query: any,
  value: any,
  resolveParams: ResolveParams<TSource, TContext, TArgs>
) => any;

export type ResolverFilterArgConfig<TSource, TContext, TArgs = ArgsMap> = {
  name: string;
  type: ComposeArgumentType;
  description?: string;
  query?: ResolverFilterArgFn<TSource, TContext, TArgs>;
  filterTypeNameFallback?: string;
  defaultValue?: any;
};

export type ResolverSortArgFn<TSource, TContext, TArgs = ArgsMap> = (
  resolveParams: ResolveParams<TSource, TContext, TArgs>
) => any;

export type ResolverSortArgConfig<TSource, TContext, TArgs = ArgsMap> = {
  name: string;
  sortTypeNameFallback?: string;
  value:
    | { [key: string]: any }
    | ResolverSortArgFn<TSource, TContext, TArgs>
    | string
    | number
    | boolean
    | any[];
  deprecationReason?: string | null;
  description?: string | null;
};

export type ResolverOpts<TSource, TContext, TArgs = ArgsMap, TReturn = any> = {
  type?: ComposeOutputType<TReturn, TContext>;
  resolve?: ResolverRpCb<TSource, TContext, TArgs>;
  args?: ComposeFieldConfigArgumentMap<TArgs>;
  name?: string;
  displayName?: string;
  kind?: ResolverKinds;
  description?: string;
  parent?: Resolver<any, TContext, any>;
  extensions?: Extensions;
};

export type ResolverWrapCb<
  TNewSource,
  TPrevSource,
  TContext,
  TNewArgs = ArgsMap,
  TPrevArgs = ArgsMap
> = (
  newResolver: Resolver<TNewSource, TContext, TNewArgs>,
  prevResolver: Resolver<TPrevSource, TContext, TPrevArgs>
) => Resolver<TNewSource, TContext, TNewArgs>;

export type ResolverRpCb<TSource, TContext, TArgs = ArgsMap> = (
  resolveParams: ResolveParams<TSource, TContext, TArgs>
) => Promise<any> | any;
export type ResolverNextRpCb<TSource, TContext, TArgs = ArgsMap> = (
  next: ResolverRpCb<TSource, TContext, TArgs>
) => ResolverRpCb<TSource, TContext, TArgs>;

export type ResolverWrapArgsCb<TArgs = ArgsMap> = (
  prevArgs: GraphQLFieldConfigArgumentMap
) => ComposeFieldConfigArgumentMap<TArgs>;

export type ResolverWrapTypeCb<TContext, TReturn = any> = (
  prevType: GraphQLOutputType
) => ComposeOutputType<TReturn, TContext>;

export type ResolveDebugOpts = {
  showHidden?: boolean;
  depth?: number;
  colors?: boolean;
};

export type ResolverMiddleware<TSource, TContext, TArgs = ArgsMap> = (
  resolve: (source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any,
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => any;

/**
 * The most interesting class in `graphql-compose`. The main goal of `Resolver` is to keep available resolve methods for Type and use them for building relation with other types.
 */
export class Resolver<TSource = any, TContext = any, TArgs = ArgsMap, TReturn = any> {
  public schemaComposer: SchemaComposer<TContext>;
  public type: ComposeOutputType<TReturn, TContext>;
  public args: ComposeFieldConfigArgumentMap<any>;
  public resolve: (
    resolveParams: Partial<ResolveParams<TSource, TContext, TArgs>>
  ) => Promise<any> | any;
  public name: string;
  public displayName: string | void;
  public kind: ResolverKinds | void;
  public description: string | void;
  public parent: Resolver<TSource, TContext, any> | void;
  public extensions?: Extensions;

  constructor(
    opts: ResolverOpts<TSource, TContext, TArgs>,
    schemaComposer: SchemaComposer<TContext>
  );

  /**
   * -----------------------------------------------
   * Output type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLOutputType;

  public getTypeComposer(): ObjectTypeComposer<TSource, TContext>;

  public setType<TNewReturn>(
    gqType: ComposeOutputType<TNewReturn, TContext>
  ): Resolver<TSource, TContext, TArgs, TNewReturn>;

  /**
   *  -----------------------------------------------
   * Args methods
   * -----------------------------------------------
   */

  public hasArg(argName: string): boolean;

  public getArg(argName: string): ComposeArgumentConfigAsObject;

  public getArgConfig(argName: string): GraphQLArgumentConfig;

  public getArgType(argName: string): GraphQLInputType;

  public getArgTC(argName: string): InputTypeComposer<TContext>;

  public getArgs(): ComposeFieldConfigArgumentMap<TArgs>;

  public getArgNames(): string[];

  public setArgs<TNewArgs>(
    args: ComposeFieldConfigArgumentMap<TNewArgs>
  ): Resolver<TSource, TContext, TNewArgs>;

  public setArg(argName: string, argConfig: ComposeArgumentConfig): this;

  public extendArg(argName: string, partialArgConfig: Partial<ComposeArgumentConfigAsObject>): this;

  public addArgs(newArgs: ComposeFieldConfigArgumentMap<TArgs>): this;

  public removeArg(argNameOrArray: string | string[]): this;

  public removeOtherArgs(argNameOrArray: string | string[]): this;

  public reorderArgs(names: string[]): this;

  public cloneArg(argName: string, newTypeName: string): this;

  public isRequired(argName: string): boolean;

  public makeRequired(argNameOrArray: string | string[]): this;

  public makeOptional(argNameOrArray: string | string[]): this;

  public addFilterArg(
    opts: ResolverFilterArgConfig<TSource, TContext, TArgs>
  ): Resolver<TSource, TContext, TArgs>;

  public addSortArg(
    opts: ResolverSortArgConfig<TSource, TContext, TArgs>
  ): Resolver<TSource, TContext, TArgs>;

  /**
   *  -----------------------------------------------
   * Resolve methods
   * -----------------------------------------------
   */

  public getResolve(): ResolverRpCb<TSource, TContext, TArgs>;

  public setResolve(
    resolve: ResolverRpCb<TSource, TContext, TArgs>
  ): Resolver<TSource, TContext, TArgs>;

  /**
   * -----------------------------------------------
   * Wrap methods
   * -----------------------------------------------
   */

  /**
   * You may construct a new resolver with wrapped logic:
   *
   * @example
   *     const log = [];
   *
   *     const mw1 = async (resolve, source, args, context, info) => {
   *       log.push('m1.before');
   *       const res = await resolve(source, args, context, info);
   *       log.push('m1.after');
   *       return res;
   *     };
   *
   *     const mw2 = async (resolve, source, args, context, info) => {
   *       log.push('m2.before');
   *       const res = await resolve(source, args, context, info);
   *       log.push('m2.after');
   *       return res;
   *     };
   *
   *     const newResolver = Resolver.withMiddlewares([mw1, mw2]);
   *     await newResolver.resolve({});
   *
   *     expect(log).toEqual([
   *       'm1.before',
   *       'm2.before',
   *       'call resolve',
   *       'm2.after',
   *       'm1.after'
   *     ]);
   */
  public withMiddlewares(
    middlewares: Array<ResolverMiddleware<TSource, TContext, TArgs>>
  ): Resolver<TSource, TContext, TArgs>;

  public wrap<TNewSource = TSource, TNewArgs = TArgs>(
    cb?: ResolverWrapCb<TNewSource, TSource, TContext, TNewArgs, TArgs>,
    newResolverOpts?: ResolverOpts<TNewSource, TContext, TArgs>
  ): Resolver<TNewSource, TContext, TNewArgs>;

  public wrapResolve<TCSource = TSource, TCArgs = TArgs>(
    cb: ResolverNextRpCb<TCSource, TContext, TCArgs>,
    wrapperName?: string
  ): Resolver<TCSource, TContext, TCArgs>;

  public wrapArgs<TCArgs = TArgs>(
    cb: ResolverWrapArgsCb<TCArgs>,
    wrapperName?: string
  ): Resolver<TSource, TContext, TCArgs>;

  public wrapCloneArg<TCArgs = TArgs>(
    argName: string,
    newTypeName: string
  ): Resolver<TSource, TContext, TCArgs>;

  public wrapType(
    cb: ResolverWrapTypeCb<TContext>,
    wrapperName?: string
  ): Resolver<TSource, TContext, TArgs>;

  /**
   *  -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  public getFieldConfig(opts?: {
    projection?: ProjectionType;
  }): GraphQLFieldConfig<TSource, TContext, TArgs>;

  public getKind(): ResolverKinds | void;

  public setKind(kind: string): this;

  public getDescription(): string | null;

  public setDescription(description: string | void): this;

  public get(path: string | string[]): any;

  public clone<TNewSource = TSource, TNewArgs = TArgs>(
    opts?: ResolverOpts<TNewSource, TContext, TNewArgs>
  ): Resolver<TNewSource, TContext, TNewArgs>;

  /**
   * -----------------------------------------------
   * Debug methods
   * -----------------------------------------------
   */

  public getNestedName(): string;

  public toString(colors?: boolean): string;

  public setDisplayName(name: string): this;

  public toDebugStructure(colors?: boolean): object;

  public debugExecTime(): Resolver<TSource, TContext, TArgs>;

  public debugParams(
    filterPaths: (string | string[]) | null,
    opts?: ResolveDebugOpts
  ): Resolver<TSource, TContext, TArgs>;

  public debugPayload(
    filterPaths: (string | string[]) | null,
    opts?: ResolveDebugOpts
  ): Resolver<TSource, TContext, TArgs>;

  public debug(
    filterDotPaths?: {
      params?: string | string[];
      payload?: string | string[];
    },
    opts?: ResolveDebugOpts
  ): Resolver<TSource, TContext, TArgs>;
}
