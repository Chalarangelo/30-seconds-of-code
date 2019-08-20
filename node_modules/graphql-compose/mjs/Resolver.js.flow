/* @flow strict */
/* eslint-disable no-use-before-define, no-restricted-syntax */

import objectPath from 'object-path';
import util from 'util';
import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLObjectType,
  isInputType,
  getNamedType,
} from './graphql';
import type {
  GraphQLFieldConfigArgumentMap,
  GraphQLArgumentConfig,
  GraphQLOutputType,
  GraphQLFieldConfig,
  GraphQLInputType,
  GraphQLResolveInfo,
} from './graphql';
import { ObjectTypeComposer } from './ObjectTypeComposer';
import type {
  ComposeOutputType,
  ComposeArgumentConfig,
  ComposeFieldConfigArgumentMap,
  ComposeArgumentConfigAsObject,
  ComposeArgumentType,
  ArgsMap, // eslint-disable-line
} from './ObjectTypeComposer';
import {
  InputTypeComposer,
  isComposeInputType,
  type ComposeInputFieldConfig,
} from './InputTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import { SchemaComposer } from './SchemaComposer';
import deepmerge from './utils/deepmerge';
import {
  resolveArgConfigMapAsThunk,
  resolveOutputConfigAsThunk,
  resolveArgConfigAsThunk,
} from './utils/configAsThunk';
import { only, clearName, inspect } from './utils/misc';
import { isFunction, isString } from './utils/is';
import { filterByDotPaths } from './utils/filterByDotPaths';
import { getProjectionFromAST } from './utils/projection';
import type { ProjectionType } from './utils/projection';
import { typeByPath } from './utils/typeByPath';
import type { Extensions } from './utils/definitions';
import GraphQLJSON from './type/json';

export type ResolveParams<TSource, TContext, TArgs = ArgsMap> = {
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
  projection: $Shape<ProjectionType>,
  [opt: string]: any,
};
export type ResolverKinds = 'query' | 'mutation' | 'subscription';

export type ResolverFilterArgFn<TSource, TContext, TArgs = ArgsMap> = (
  query: any,
  value: any,
  resolveParams: ResolveParams<TSource, TContext, TArgs>
) => any;

export type ResolverFilterArgConfig<TSource, TContext, TArgs = ArgsMap> = {
  +name: string,
  +type: ComposeArgumentType,
  +description?: ?string,
  +query?: ResolverFilterArgFn<TSource, TContext, TArgs>,
  +filterTypeNameFallback?: string,
  +defaultValue?: any,
};

export type ResolverSortArgFn<TSource, TContext, TArgs = ArgsMap> = (
  resolveParams: ResolveParams<TSource, TContext, TArgs>
) => mixed;

export type ResolverSortArgConfig<TSource, TContext, TArgs = ArgsMap> = {
  name: string,
  sortTypeNameFallback?: string,
  // value also can be an `Object`, but flow does not understande union with object and function
  // see https://github.com/facebook/flow/issues/1948
  value:
    | { [key: string]: any }
    | ResolverSortArgFn<TSource, TContext, TArgs>
    | string
    | number
    | boolean
    | any[],
  deprecationReason?: string | null,
  description?: string | null,
};

export type ResolverOpts<TSource, TContext, TArgs = ArgsMap, TReturn = any> = {|
  type?: ComposeOutputType<TReturn, TContext>,
  resolve?: ResolverRpCb<TSource, TContext, TArgs>,
  args?: ComposeFieldConfigArgumentMap<TArgs>,
  name?: string,
  displayName?: string,
  kind?: ResolverKinds,
  description?: string,
  parent?: Resolver<any, TContext, any>,
  extensions?: Extensions,
|};

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
  showHidden?: boolean,
  depth?: number,
  colors?: boolean,
};

export type ResolverMiddleware<TSource, TContext, TArgs = ArgsMap> = (
  resolve: (source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any,
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => any;

export class Resolver<TSource, TContext, TArgs = ArgsMap, TReturn = any> {
  schemaComposer: SchemaComposer<TContext>;
  type: ComposeOutputType<TReturn, TContext>;
  args: ComposeFieldConfigArgumentMap<any>;
  resolve: (resolveParams: $Shape<ResolveParams<TSource, TContext, TArgs>>) => Promise<any> | any;
  name: string;
  displayName: string | void;
  kind: ResolverKinds | void;
  description: string | void;
  parent: Resolver<TSource, TContext, any> | void;
  extensions: Extensions | void;

  constructor(
    opts: ResolverOpts<TSource, TContext, TArgs>,
    schemaComposer: SchemaComposer<TContext>
  ): Resolver<TSource, TContext, TArgs> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new Resolver(opts, SchemaComposer)`'
      );
    }
    this.schemaComposer = schemaComposer;

    if (!opts.name) {
      throw new Error('For Resolver constructor the `opts.name` is required option.');
    }
    this.name = opts.name;
    this.displayName = opts.displayName;
    this.parent = opts.parent;
    this.kind = opts.kind;
    this.description = opts.description || '';
    this.extensions = opts.extensions;

    if (opts.type) {
      this.setType(opts.type);
    }

    this.args = opts.args || {};

    if (opts.resolve) {
      this.resolve = opts.resolve;
    }

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  // -----------------------------------------------
  // Output type methods
  // -----------------------------------------------

  getType(): GraphQLOutputType {
    if (!this.type) {
      return GraphQLJSON;
    }

    const fc = resolveOutputConfigAsThunk(this.schemaComposer, this.type, this.name, 'Resolver');

    return fc.type;
  }

  getTypeComposer(): ObjectTypeComposer<TSource, TContext> {
    const outputType = getNamedType(this.getType());
    if (!(outputType instanceof GraphQLObjectType)) {
      throw new Error(
        `Resolver ${this.name} cannot return its output type as ObjectTypeComposer instance. ` +
          `Cause '${this.type.toString()}' does not instance of GraphQLObjectType.`
      );
    }
    return new ObjectTypeComposer(outputType, this.schemaComposer);
  }

  setType<TNewReturn>(
    composeType: ComposeOutputType<TNewReturn, TContext>
  ): Resolver<TSource, TContext, TArgs, TNewReturn> {
    // check that `composeType` has correct data
    this.schemaComposer.typeMapper.convertOutputFieldConfig(composeType, 'setType', 'Resolver');

    this.type = (composeType: any);
    return (this: any);
  }

  // -----------------------------------------------
  // Args methods
  // -----------------------------------------------

  hasArg(argName: string): boolean {
    return !!this.args[argName];
  }

  getArg(argName: string): ComposeArgumentConfigAsObject {
    if (!this.hasArg(argName)) {
      throw new Error(
        `Cannot get arg '${argName}' for resolver ${this.name}. Argument does not exist.`
      );
    }

    let arg = this.args[argName];

    if (isFunction(arg)) arg = arg();

    if (typeof arg === 'string' || isComposeInputType(arg) || Array.isArray(arg)) {
      return { type: (arg: any) };
    }

    return (arg: any);
  }

  getArgConfig(argName: string): GraphQLArgumentConfig {
    const arg = this.getArg(argName);
    return resolveArgConfigAsThunk(this.schemaComposer, arg, argName, this.name, 'Resolver');
  }

  getArgType(argName: string): GraphQLInputType {
    const ac = this.getArgConfig(argName);
    return ac.type;
  }

  getArgTC(argName: string): InputTypeComposer<TContext> {
    const argType = getNamedType(this.getArgType(argName));
    if (!(argType instanceof GraphQLInputObjectType)) {
      throw new Error(
        `Cannot get InputTypeComposer for arg '${argName}' in resolver ${this.getNestedName()}. ` +
          `This argument should be InputObjectType, but it has type '${argType.constructor.name}'`
      );
    }
    return new InputTypeComposer(argType, this.schemaComposer);
  }

  getArgs(): ComposeFieldConfigArgumentMap<TArgs> {
    return this.args;
  }

  getArgNames(): string[] {
    return Object.keys(this.args);
  }

  setArgs<TNewArgs>(
    args: ComposeFieldConfigArgumentMap<TNewArgs>
  ): Resolver<TSource, TContext, TNewArgs> {
    this.args = args;
    return (this: any);
  }

  setArg(argName: string, argConfig: ComposeArgumentConfig): Resolver<TSource, TContext, TArgs> {
    this.args[argName] = argConfig;
    return this;
  }

  extendArg(
    argName: string,
    partialArgConfig: $Shape<ComposeArgumentConfigAsObject>
  ): Resolver<TSource, TContext, TArgs> {
    let prevArgConfig;
    try {
      prevArgConfig = this.getArgConfig(argName);
    } catch (e) {
      throw new Error(
        `Cannot extend arg '${argName}' in Resolver '${this.name}'. Argument does not exist.`
      );
    }

    this.setArg(argName, {
      ...prevArgConfig,
      ...partialArgConfig,
    });

    return this;
  }

  addArgs(newArgs: ComposeFieldConfigArgumentMap<ArgsMap>): Resolver<TSource, TContext, TArgs> {
    this.setArgs({ ...this.getArgs(), ...newArgs });
    return this;
  }

  removeArg(argNameOrArray: string | string[]): Resolver<TSource, TContext, TArgs> {
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach(argName => {
      delete this.args[argName];
    });
    return this;
  }

  removeOtherArgs(argNameOrArray: string | string[]): Resolver<TSource, TContext, TArgs> {
    const keepArgNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    Object.keys(this.args).forEach(argName => {
      if (keepArgNames.indexOf(argName) === -1) {
        delete this.args[argName];
      }
    });
    return this;
  }

  reorderArgs(names: string[]): Resolver<TSource, TContext, TArgs> {
    const orderedArgs = {};
    names.forEach(name => {
      if (this.args[name]) {
        orderedArgs[name] = this.args[name];
        delete this.args[name];
      }
    });
    this.args = { ...orderedArgs, ...this.args };
    return this;
  }

  cloneArg(argName: string, newTypeName: string): Resolver<TSource, TContext, TArgs> {
    if (!{}.hasOwnProperty.call(this.args, argName)) {
      throw new Error(
        `Can not clone arg ${argName} for resolver ${this.name}. Argument does not exist.`
      );
    }

    let originalType = this.getArgType(argName);
    let isUnwrapped = false;
    if (originalType instanceof GraphQLNonNull) {
      originalType = originalType.ofType;
      isUnwrapped = true;
    }

    if (!(originalType instanceof GraphQLInputObjectType)) {
      throw new Error(
        `Can not clone arg ${argName} for resolver ${this.name}.` +
          'Argument should be GraphQLInputObjectType (complex input type).'
      );
    }
    if (!newTypeName || newTypeName !== clearName(newTypeName)) {
      throw new Error('You should provide new type name as second argument');
    }
    if (newTypeName === originalType.name) {
      throw new Error('You should provide new type name. It is equal to current name.');
    }

    let clonedType = InputTypeComposer.createTemp(originalType, this.schemaComposer)
      .clone(newTypeName)
      .getType();
    if (isUnwrapped) {
      clonedType = new GraphQLNonNull(clonedType);
    }

    this.extendArg(argName, { type: clonedType });
    return this;
  }

  isRequired(argName: string): boolean {
    return this.getArgType(argName) instanceof GraphQLNonNull;
  }

  makeRequired(argNameOrArray: string | string[]): Resolver<TSource, TContext, TArgs> {
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach(argName => {
      if (this.hasArg(argName)) {
        const argType = this.getArgType(argName);
        if (!isInputType(argType)) {
          throw new Error(
            `Cannot make argument ${argName} required. It should be InputType: ${JSON.stringify(
              argType
            )}`
          );
        }
        if (!(argType instanceof GraphQLNonNull)) {
          this.extendArg(argName, { type: new GraphQLNonNull(argType) });
        }
      }
    });
    return this;
  }

  makeOptional(argNameOrArray: string | string[]): Resolver<TSource, TContext, TArgs> {
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach(argName => {
      if (this.hasArg(argName)) {
        const argType = this.getArgType(argName);
        if (argType instanceof GraphQLNonNull) {
          this.extendArg(argName, { type: argType.ofType });
        }
      }
    });
    return this;
  }

  addFilterArg(
    opts: ResolverFilterArgConfig<TSource, TContext, TArgs>
  ): Resolver<TSource, TContext, TArgs> {
    if (!opts.name) {
      throw new Error('For Resolver.addFilterArg the arg name `opts.name` is required.');
    }

    if (!opts.type) {
      throw new Error('For Resolver.addFilterArg the arg type `opts.type` is required.');
    }

    const resolver = this.wrap(null, { name: 'addFilterArg' });

    // get filterTC or create new one argument
    const filter = resolver.hasArg('filter') ? resolver.getArgConfig('filter') : undefined;
    let filterITC;
    if (filter && filter.type instanceof GraphQLInputObjectType) {
      filterITC = new InputTypeComposer(filter.type, this.schemaComposer);
    } else {
      if (!opts.filterTypeNameFallback || !isString(opts.filterTypeNameFallback)) {
        throw new Error(
          'For Resolver.addFilterArg needs to provide `opts.filterTypeNameFallback: string`. ' +
            'This string will be used as unique name for `filter` type of input argument. ' +
            'Eg. FilterXXXXXInput'
        );
      }
      filterITC = InputTypeComposer.createTemp(opts.filterTypeNameFallback, this.schemaComposer);
    }

    let defaultValue: any;
    if (filter && filter.defaultValue) {
      defaultValue = filter.defaultValue;
    }
    if (opts.defaultValue) {
      if (!defaultValue) {
        defaultValue = {};
      }
      defaultValue[opts.name] = opts.defaultValue;
    }

    resolver.setArg('filter', {
      type: filterITC.getType(),
      description: (filter && filter.description) || undefined,
      defaultValue,
    });

    filterITC.setField(
      opts.name,
      (({
        ...only(opts, ['name', 'type', 'defaultValue', 'description']),
      }: any): ComposeInputFieldConfig)
    );

    const resolveNext = resolver.getResolve();
    const query = opts.query;
    if (query && isFunction(query)) {
      resolver.setResolve(async resolveParams => {
        const value = objectPath.get(resolveParams, ['args', 'filter', opts.name]);
        if (value !== null && value !== undefined) {
          if (!resolveParams.rawQuery) {
            resolveParams.rawQuery = {}; // eslint-disable-line
          }
          await query(resolveParams.rawQuery, value, resolveParams);
        }
        return resolveNext(resolveParams);
      });
    }

    return resolver;
  }

  addSortArg(
    opts: ResolverSortArgConfig<TSource, TContext, TArgs>
  ): Resolver<TSource, TContext, TArgs> {
    if (!opts.name) {
      throw new Error('For Resolver.addSortArg the `opts.name` is required.');
    }

    if (!opts.value) {
      throw new Error('For Resolver.addSortArg the `opts.value` is required.');
    }

    const resolver = this.wrap(null, { name: 'addSortArg' });

    // get sortETC or create new one
    let sortETC: EnumTypeComposer<TContext>;
    if (resolver.hasArg('sort')) {
      const sortConfig = resolver.getArgConfig('sort');
      if (sortConfig.type instanceof GraphQLEnumType) {
        sortETC = EnumTypeComposer.createTemp(sortConfig.type, this.schemaComposer);
      } else {
        throw new Error(
          'Resolver must have `sort` arg with type GraphQLEnumType. ' +
            `But got: ${util.inspect(sortConfig.type, { depth: 2 })} `
        );
      }
    } else {
      if (!opts.sortTypeNameFallback || !isString(opts.sortTypeNameFallback)) {
        throw new Error(
          'For Resolver.addSortArg needs to provide `opts.sortTypeNameFallback: string`. ' +
            'This string will be used as unique name for `sort` type of input argument. ' +
            'Eg. SortXXXXXEnum'
        );
      }
      sortETC = EnumTypeComposer.createTemp(
        {
          name: opts.sortTypeNameFallback,
          values: {
            [opts.name]: {},
          },
        },
        this.schemaComposer
      );
      resolver.setArg('sort', sortETC);
    }

    // extend sortETC with new sorting value
    sortETC.setField(opts.name, {
      description: opts.description,
      deprecationReason: opts.deprecationReason,
      value: isFunction(opts.value) ? opts.name : opts.value,
    });

    // If sort value is evaluable (function), then wrap resolve method
    const resolveNext = resolver.getResolve();
    if (isFunction(opts.value)) {
      const getValue: Function = opts.value;
      resolver.setResolve(resolveParams => {
        const value = objectPath.get(resolveParams, ['args', 'sort']);
        if (value === opts.name) {
          const newSortValue = getValue(resolveParams);
          (resolveParams.args: any).sort = newSortValue; // eslint-disable-line
        }
        return resolveNext(resolveParams);
      });
    }

    return resolver;
  }

  // -----------------------------------------------
  // Resolve methods
  // -----------------------------------------------

  /*
   * This method should be overriden via constructor
   */
  /* eslint-disable */
  resolve(
    resolveParams:
      | ResolveParams<TSource, TContext, TArgs>
      | $Shape<ResolveParams<TSource, TContext, TArgs>>
  ): Promise<mixed> {
    return Promise.resolve();
  }
  /* eslint-enable */

  getResolve(): ResolverRpCb<TSource, TContext, TArgs> {
    return this.resolve;
  }

  setResolve(resolve: ResolverRpCb<TSource, TContext, TArgs>): Resolver<TSource, TContext, TArgs> {
    this.resolve = resolve;
    return this;
  }

  // -----------------------------------------------
  // Wrap methods
  // -----------------------------------------------

  withMiddlewares(
    middlewares: Array<ResolverMiddleware<TSource, TContext, TArgs>>
  ): Resolver<TSource, TContext, TArgs> {
    if (!Array.isArray(middlewares)) {
      throw new Error(
        `You should provide array of middlewares '(resolve, source, args, context, info) => any', but provided ${inspect(
          middlewares
        )}.`
      );
    }

    let resolver = this;
    middlewares.reverse().forEach(mw => {
      let name;
      if (mw.name) {
        name = mw.name;
      } else if (mw.constructor && mw.constructor.name) {
        name = mw.constructor.name;
      } else {
        name = 'middleware';
      }
      const newResolver = this.clone({ name, parent: resolver });
      const resolve = resolver.getResolve();
      newResolver.setResolve(rp =>
        mw(
          (source, args, context, info) => {
            return resolve({ ...rp, source, args, context, info });
          },
          rp.source,
          rp.args,
          rp.context,
          rp.info
        )
      );
      resolver = newResolver;
    });

    return resolver;
  }

  wrap<TNewSource, TNewArgs>(
    cb: ?ResolverWrapCb<TNewSource, TSource, TContext, TNewArgs, TArgs>,
    newResolverOpts: ?$Shape<ResolverOpts<TNewSource, TContext, TNewArgs>> = {}
  ): Resolver<TNewSource, TContext, TNewArgs> {
    const prevResolver: Resolver<TSource, TContext, TArgs> = this;
    const newResolver = this.clone(
      ({
        name: 'wrap',
        parent: prevResolver,
        ...newResolverOpts,
      }: any)
    );

    if (isFunction(cb)) {
      const resolver = cb(newResolver, prevResolver);
      if (resolver) return resolver;
    }

    return newResolver;
  }

  wrapResolve(
    cb: ResolverNextRpCb<TSource, TContext, TArgs>,
    wrapperName?: string = 'wrapResolve'
  ): Resolver<TSource, TContext, TArgs> {
    return this.wrap(
      (newResolver, prevResolver) => {
        const newResolve = cb(prevResolver.getResolve());
        newResolver.setResolve(newResolve);
        return newResolver;
      },
      { name: wrapperName }
    );
  }

  wrapArgs<TNewArgs>(
    cb: ResolverWrapArgsCb<TNewArgs>,
    wrapperName?: string = 'wrapArgs'
  ): Resolver<TSource, TContext, TNewArgs> {
    return this.wrap(
      (newResolver, prevResolver) => {
        // clone prevArgs, to avoid changing args in callback
        const prevArgs = { ...prevResolver.getArgs() };
        const newArgs = cb(prevArgs);
        newResolver.setArgs(newArgs);
        return newResolver;
      },
      { name: wrapperName }
    );
  }

  wrapCloneArg(argName: string, newTypeName: string): Resolver<TSource, TContext, TArgs> {
    return this.wrap(newResolver => newResolver.cloneArg(argName, newTypeName), {
      name: 'cloneFilterArg',
    });
  }

  wrapType(
    cb: ResolverWrapTypeCb<TContext>,
    wrapperName?: string = 'wrapType'
  ): Resolver<TSource, TContext, TArgs> {
    return this.wrap(
      (newResolver, prevResolver) => {
        const prevType = prevResolver.getType();
        const newType = cb(prevType);
        newResolver.setType(newType);
        return newResolver;
      },
      { name: wrapperName }
    );
  }

  // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------

  getFieldConfig(
    opts: {
      projection?: ProjectionType,
    } = {}
  ): GraphQLFieldConfig<TSource, TContext, TArgs> {
    const resolve = this.getResolve();
    return {
      type: this.getType(),
      args: resolveArgConfigMapAsThunk(this.schemaComposer, this.getArgs(), this.name, 'Resolver'),
      description: this.description,
      resolve: (source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => {
        let projection = getProjectionFromAST(info);
        if (opts.projection) {
          projection = ((deepmerge(projection, opts.projection): any): ProjectionType);
        }
        return resolve({ source, args, context, info, projection });
      },
    };
  }

  getKind(): ResolverKinds | void {
    return this.kind;
  }

  setKind(kind: string): Resolver<TSource, TContext, TArgs> {
    if (kind !== 'query' && kind !== 'mutation' && kind !== 'subscription') {
      throw new Error(
        `You provide incorrect value '${kind}' for Resolver.setKind method. ` +
          'Valid values are: query | mutation | subscription'
      );
    }
    this.kind = kind;
    return this;
  }

  getDescription(): ?string {
    return this.description;
  }

  setDescription(description: string | void): Resolver<TSource, TContext, TArgs> {
    this.description = description;
    return this;
  }

  get(path: string | string[]): any {
    return typeByPath(this, path);
  }

  clone<TNewSource, TNewArgs>(
    opts: $Shape<ResolverOpts<TNewSource, TContext, TNewArgs>> = {}
  ): Resolver<TNewSource, TContext, TNewArgs> {
    const oldOpts = {};

    const self: Resolver<TSource, TContext, TArgs> = this;
    for (const key in self) {
      if (self.hasOwnProperty(key)) {
        // $FlowFixMe
        oldOpts[key] = self[key];
      }
    }
    oldOpts.displayName = undefined;
    oldOpts.args = ({ ...this.args }: GraphQLFieldConfigArgumentMap);
    return new Resolver(
      (({ ...oldOpts, ...opts }: any): ResolverOpts<TNewSource, TContext, TNewArgs>),
      this.schemaComposer
    );
  }

  // -----------------------------------------------
  // Debug methods
  // -----------------------------------------------

  getNestedName(): string {
    const name = this.displayName || this.name;
    if (this.parent) {
      return `${name}(${this.parent.getNestedName()})`;
    }
    return name;
  }

  toString(colors: boolean = true): string {
    return util.inspect(this.toDebugStructure(false), { depth: 20, colors }).replace(/\\n/g, '\n');
  }

  setDisplayName(name: string): Resolver<TSource, TContext, TArgs> {
    this.displayName = name;
    return this;
  }

  toDebugStructure(colors: boolean = true): Object {
    const info: any = {
      name: this.name,
      displayName: this.displayName,
      type: util.inspect(this.type, { depth: 2, colors }),
      args: this.args,
      resolve: this.resolve ? this.resolve.toString() : this.resolve,
    };
    if (this.parent) {
      info.resolve = [info.resolve, { 'Parent resolver': this.parent.toDebugStructure(colors) }];
    }
    return info;
  }

  debugExecTime(): Resolver<TSource, TContext, TArgs> {
    /* eslint-disable no-console */
    return this.wrapResolve(
      next => async rp => {
        const name = `Execution time for ${this.getNestedName()}`;
        console.time(name);
        const res = await next(rp);
        console.timeEnd(name);
        return res;
      },
      'debugExecTime'
    );
    /* eslint-enable no-console */
  }

  debugParams(
    filterPaths: ?(string | string[]),
    opts?: ResolveDebugOpts = { colors: true, depth: 5 }
  ): Resolver<TSource, TContext, TArgs> {
    /* eslint-disable no-console */
    return this.wrapResolve(
      next => rp => {
        console.log(`ResolveParams for ${this.getNestedName()}:`);
        const data = filterByDotPaths(rp, filterPaths, {
          // is hidden (use debugParams(["info"])) or debug({ params: ["info"]})
          // `is hidden (use debugParams(["context.*"])) or debug({ params: ["context.*"]})`,
          hideFields:
            rp && rp.context && rp.context.res && rp.context.params && rp.context.headers
              ? {
                  // looks like context is express request, colapse it
                  info: '[[hidden]]',
                  context: '[[hidden]]',
                }
              : {
                  info: '[[hidden]]',
                  'context.*': '[[hidden]]',
                },
          hideFieldsNote:
            'Some data was [[hidden]] to display this fields use debugParams("%fieldNames%")',
        });
        console.dir(data, opts);
        return next(rp);
      },
      'debugParams'
    );
    /* eslint-enable no-console */
  }

  debugPayload(
    filterPaths: ?(string | string[]),
    opts?: ResolveDebugOpts = { colors: true, depth: 5 }
  ): Resolver<TSource, TContext, TArgs> {
    /* eslint-disable no-console */
    return this.wrapResolve(
      next => async rp => {
        try {
          const res = await next(rp);
          console.log(`Resolved Payload for ${this.getNestedName()}:`);
          if (Array.isArray(res) && res.length > 3 && !filterPaths) {
            console.dir(
              [
                filterPaths ? filterByDotPaths(res[0], filterPaths) : res[0],
                `[debug note]: Other ${res.length - 1} records was [[hidden]]. ` +
                  'Use debugPayload("0 1 2 3 4") or debug({ payload: "0 1 2 3 4" }) for display this records',
              ],
              opts
            );
          } else {
            console.dir(filterPaths ? filterByDotPaths(res, filterPaths) : res, opts);
          }
          return res;
        } catch (e) {
          console.log(`Rejected Payload for ${this.getNestedName()}:`);
          console.log(e);
          throw e;
        }
      },
      'debugPayload'
    );
    /* eslint-enable no-console */
  }

  debug(
    filterDotPaths?: {
      params?: ?(string | string[]),
      payload?: ?(string | string[]),
    },
    opts?: ResolveDebugOpts = { colors: true, depth: 2 }
  ): Resolver<TSource, TContext, TArgs> {
    return this.debugExecTime()
      .debugParams(filterDotPaths ? filterDotPaths.params : null, opts)
      .debugPayload(filterDotPaths ? filterDotPaths.payload : null, opts);
  }
}
