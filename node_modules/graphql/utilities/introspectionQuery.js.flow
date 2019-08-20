// @flow strict

import { type DirectiveLocationEnum } from '../language/directiveLocation';

export type IntrospectionOptions = {|
  // Whether to include descriptions in the introspection result.
  // Default: true
  descriptions: boolean,
|};

export function getIntrospectionQuery(options?: IntrospectionOptions): string {
  const descriptions = !(options && options.descriptions === false);
  return `
    query IntrospectionQuery {
      __schema {
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
          ...FullType
        }
        directives {
          name
          ${descriptions ? 'description' : ''}
          locations
          args {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      ${descriptions ? 'description' : ''}
      fields(includeDeprecated: true) {
        name
        ${descriptions ? 'description' : ''}
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        ${descriptions ? 'description' : ''}
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      ${descriptions ? 'description' : ''}
      type { ...TypeRef }
      defaultValue
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}

/**
 * Deprecated, call getIntrospectionQuery directly.
 *
 * This function will be removed in v15
 */
export const introspectionQuery = getIntrospectionQuery();

export type IntrospectionQuery = {|
  +__schema: IntrospectionSchema,
|};

export type IntrospectionSchema = {|
  +queryType: IntrospectionNamedTypeRef<IntrospectionObjectType>,
  +mutationType: ?IntrospectionNamedTypeRef<IntrospectionObjectType>,
  +subscriptionType: ?IntrospectionNamedTypeRef<IntrospectionObjectType>,
  +types: $ReadOnlyArray<IntrospectionType>,
  +directives: $ReadOnlyArray<IntrospectionDirective>,
|};

export type IntrospectionType =
  | IntrospectionScalarType
  | IntrospectionObjectType
  | IntrospectionInterfaceType
  | IntrospectionUnionType
  | IntrospectionEnumType
  | IntrospectionInputObjectType;

export type IntrospectionOutputType =
  | IntrospectionScalarType
  | IntrospectionObjectType
  | IntrospectionInterfaceType
  | IntrospectionUnionType
  | IntrospectionEnumType;

export type IntrospectionInputType =
  | IntrospectionScalarType
  | IntrospectionEnumType
  | IntrospectionInputObjectType;

export type IntrospectionScalarType = {
  +kind: 'SCALAR',
  +name: string,
  +description?: ?string,
  ...
};

export type IntrospectionObjectType = {
  +kind: 'OBJECT',
  +name: string,
  +description?: ?string,
  +fields: $ReadOnlyArray<IntrospectionField>,
  +interfaces: $ReadOnlyArray<
    IntrospectionNamedTypeRef<IntrospectionInterfaceType>,
  >,
  ...
};

export type IntrospectionInterfaceType = {
  +kind: 'INTERFACE',
  +name: string,
  +description?: ?string,
  +fields: $ReadOnlyArray<IntrospectionField>,
  +possibleTypes: $ReadOnlyArray<
    IntrospectionNamedTypeRef<IntrospectionObjectType>,
  >,
  ...
};

export type IntrospectionUnionType = {
  +kind: 'UNION',
  +name: string,
  +description?: ?string,
  +possibleTypes: $ReadOnlyArray<
    IntrospectionNamedTypeRef<IntrospectionObjectType>,
  >,
  ...
};

export type IntrospectionEnumType = {
  +kind: 'ENUM',
  +name: string,
  +description?: ?string,
  +enumValues: $ReadOnlyArray<IntrospectionEnumValue>,
  ...
};

export type IntrospectionInputObjectType = {
  +kind: 'INPUT_OBJECT',
  +name: string,
  +description?: ?string,
  +inputFields: $ReadOnlyArray<IntrospectionInputValue>,
  ...
};

export type IntrospectionListTypeRef<
  T: IntrospectionTypeRef = IntrospectionTypeRef,
> = {
  +kind: 'LIST',
  +ofType: T,
  ...
};

export type IntrospectionNonNullTypeRef<
  T: IntrospectionTypeRef = IntrospectionTypeRef,
> = {
  +kind: 'NON_NULL',
  +ofType: T,
  ...
};

export type IntrospectionTypeRef =
  | IntrospectionNamedTypeRef<IntrospectionType>
  | IntrospectionListTypeRef<IntrospectionTypeRef>
  | IntrospectionNonNullTypeRef<
      | IntrospectionNamedTypeRef<IntrospectionType>
      | IntrospectionListTypeRef<IntrospectionTypeRef>,
    >;

export type IntrospectionOutputTypeRef =
  | IntrospectionNamedTypeRef<IntrospectionOutputType>
  | IntrospectionListTypeRef<IntrospectionOutputTypeRef>
  | IntrospectionNonNullTypeRef<
      | IntrospectionNamedTypeRef<IntrospectionOutputType>
      | IntrospectionListTypeRef<IntrospectionOutputTypeRef>,
    >;

export type IntrospectionInputTypeRef =
  | IntrospectionNamedTypeRef<IntrospectionInputType>
  | IntrospectionListTypeRef<IntrospectionInputTypeRef>
  | IntrospectionNonNullTypeRef<
      | IntrospectionNamedTypeRef<IntrospectionInputType>
      | IntrospectionListTypeRef<IntrospectionInputTypeRef>,
    >;

export type IntrospectionNamedTypeRef<
  T: IntrospectionType = IntrospectionType,
> = {
  +kind: $PropertyType<T, 'kind'>,
  +name: string,
  ...
};

export type IntrospectionField = {|
  +name: string,
  +description?: ?string,
  +args: $ReadOnlyArray<IntrospectionInputValue>,
  +type: IntrospectionOutputTypeRef,
  +isDeprecated: boolean,
  +deprecationReason: ?string,
|};

export type IntrospectionInputValue = {|
  +name: string,
  +description?: ?string,
  +type: IntrospectionInputTypeRef,
  +defaultValue: ?string,
|};

export type IntrospectionEnumValue = {|
  +name: string,
  +description?: ?string,
  +isDeprecated: boolean,
  +deprecationReason: ?string,
|};

export type IntrospectionDirective = {|
  +name: string,
  +description?: ?string,
  +locations: $ReadOnlyArray<DirectiveLocationEnum>,
  +args: $ReadOnlyArray<IntrospectionInputValue>,
|};
