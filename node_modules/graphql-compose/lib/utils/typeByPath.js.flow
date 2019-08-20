/* @flow strict */
/* eslint-disable no-use-before-define */

import { ObjectTypeComposer, type ComposeOutputType } from '../ObjectTypeComposer';
import { InputTypeComposer, type ComposeInputType } from '../InputTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { Resolver } from '../Resolver';
import type { SchemaComposer, AnyComposeType } from '../SchemaComposer';
import { GraphQLNonNull, GraphQLList } from '../graphql';

type TypeInPath<TContext> = AnyComposeType<TContext> | Resolver<any, TContext, any>;

/**
 * fieldName
 * @argName
 * #resolver
 */
export function typeByPath<TContext>(
  src: TypeInPath<TContext>,
  path: string | Array<string>
): TypeInPath<TContext> | void {
  const parts = Array.isArray(path) ? path : String(path).split('.');

  if (parts.length === 0) {
    return src;
  }

  if (src instanceof ObjectTypeComposer) {
    return typeByPathTC(src, parts);
  } else if (src instanceof InputTypeComposer) {
    return typeByPathITC(src, parts);
  } else if (src instanceof Resolver) {
    return typeByPathRSV(src, parts);
  } else if (src instanceof InterfaceTypeComposer) {
    return typeByPathIFTC(src, parts);
  }

  return src;
}

export function typeByPathTC<TContext>(
  tc: ObjectTypeComposer<any, TContext>,
  parts: Array<string>
): TypeInPath<TContext> | void {
  if (!tc) return undefined;
  if (parts.length === 0) return tc;

  const name = parts[0];
  if (!name) return undefined;
  const nextName = parts[1];

  if (name.startsWith('$')) {
    const restParts = parts.slice(1);
    const resolver = tc.getResolver(name.substring(1));
    if (resolver) {
      if (restParts.length > 0) {
        return typeByPathRSV(resolver, restParts);
      }
      return resolver;
    }
    return undefined;
  }

  if (nextName && nextName.startsWith('@')) {
    const argType = tc.getFieldArgType(name, nextName.substring(1));
    return processType(argType, parts.slice(2), tc.schemaComposer);
  }

  const fieldType = tc.getFieldType(name);
  return processType(fieldType, parts.slice(1), tc.schemaComposer);
}

export function typeByPathITC<TContext>(
  itc: InputTypeComposer<TContext>,
  parts: Array<string>
): TypeInPath<TContext> | void {
  if (!itc) return undefined;
  if (parts.length === 0) return itc;

  const fieldType = itc.getFieldType(parts[0]);
  return processType(fieldType, parts.slice(1), itc.schemaComposer);
}

function typeByPathRSV<TContext>(
  rsv: Resolver<any, TContext, any>,
  parts: Array<string>
): TypeInPath<TContext> | Resolver<any, TContext, any> | void {
  if (!rsv) return undefined;
  if (parts.length === 0) return rsv;
  const name = parts[0];
  if (!name) return undefined;

  if (name.startsWith('@')) {
    const argName = name.substring(1);
    const arg = rsv.getArg(argName);
    if (!arg) return undefined;
    return processType(rsv.getArgType(argName), parts.slice(1), rsv.schemaComposer);
  }

  return processType(rsv.getType(), parts, rsv.schemaComposer);
}

export function typeByPathIFTC<TContext>(
  tc: InterfaceTypeComposer<any, TContext>,
  parts: Array<string>
): TypeInPath<TContext> | void {
  if (!tc) return undefined;
  if (parts.length === 0) return tc;

  const name = parts[0];
  if (!name) return undefined;
  const nextName = parts[1];

  if (name.startsWith('$')) {
    // Interface does not have resolvers
    return undefined;
  }

  if (nextName && nextName.startsWith('@')) {
    const argType = tc.getFieldArgType(name, nextName.substring(1));
    return processType(argType, parts.slice(2), tc.schemaComposer);
  }

  const fieldType = tc.getFieldType(name);
  return processType(fieldType, parts.slice(1), tc.schemaComposer);
}

export function processType<TContext>(
  type: ComposeOutputType<any, TContext> | ComposeInputType | void | null,
  restParts: Array<string>,
  schema: SchemaComposer<TContext>
): TypeInPath<TContext> | void {
  if (!type) return undefined;

  let unwrappedType = type;
  while (Array.isArray(unwrappedType)) {
    unwrappedType = unwrappedType[0];
  }
  while (unwrappedType instanceof GraphQLList || unwrappedType instanceof GraphQLNonNull) {
    unwrappedType = unwrappedType.ofType;
  }

  let tc;
  if (typeof unwrappedType === 'string') {
    tc = schema.createTempTC(unwrappedType);
  } else {
    tc = schema.getAnyTC((unwrappedType: any));
  }

  if (tc instanceof ObjectTypeComposer) {
    if (restParts.length > 0) {
      return typeByPathTC(tc, restParts);
    }
    return tc;
  } else if (tc instanceof InputTypeComposer) {
    if (restParts.length > 0) {
      return typeByPathITC(tc, restParts);
    }
    return tc;
  }

  if (restParts.length > 0) {
    return undefined;
  }
  return tc;
}
