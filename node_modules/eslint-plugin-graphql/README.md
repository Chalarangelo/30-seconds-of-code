# eslint-plugin-graphql
[![npm version](https://badge.fury.io/js/eslint-plugin-graphql.svg)](https://badge.fury.io/js/eslint-plugin-graphql)
[![Build Status](https://travis-ci.org/apollographql/eslint-plugin-graphql.svg?branch=master)](https://travis-ci.org/apollographql/eslint-plugin-graphql)
[![Get on Slack](https://img.shields.io/badge/slack-join-orange.svg)](http://www.apollostack.com/#slack)

An ESLint plugin that checks tagged query strings inside JavaScript, or queries inside `.graphql` files, against a GraphQL schema.

```
npm install eslint-plugin-graphql
```

![Screenshot from Atom](https://github.com/apollostack/eslint-plugin-graphql/raw/master/screenshot.png)

`eslint-plugin-graphql` has built-in settings for three GraphQL clients out of the box:

1. [Apollo client](http://docs.apollostack.com/apollo-client/index.html)
2. [Relay](https://facebook.github.io/relay/)
3. [Lokka](https://github.com/kadirahq/lokka)
3. [FraQL](https://github.com/smooth-code/fraql)

If you want to lint your GraphQL schema, rather than queries, check out [cjoudrey/graphql-schema-linter](https://github.com/cjoudrey/graphql-schema-linter).

### Importing schema JSON

You'll need to import your [introspection query result](https://github.com/graphql/graphql-js/blob/master/src/utilities/introspectionQuery.js) or the schema as a string in the Schema Language format. This can be done if you define your ESLint config in a JS file.

### Retrieving a remote GraphQL schema

[graphql-cli](https://github.com/graphcool/graphql-cli) provides a `get-schema` command (in conjunction with a `.graphqlconfig` file) that makes retrieving remote schemas very simple.

[apollo-codegen](https://github.com/apollographql/apollo-codegen) also provides an [introspect-schema](https://github.com/apollographql/apollo-codegen#introspect-schema) command that can get your remote schemas as well

### Common options

All of the rules provided by this plugin have a few options in common. There are examples of how to use these with Apollo, Relay, Lokka, FraQL and literal files further down.

- `env`: Import default settings for your GraphQL client. Supported values: `'apollo'`, `'relay'`, `'lokka'`, `'fraql'` `'literal'`. Defaults to `'apollo'`. This is used for the slight parsing differences in the GraphQL syntax between Apollo, Relay, Lokka and FraQL as well as giving nice defaults to some other options.

- `tagName`: The name of the template literal tag that this plugin should look for when searching for GraphQL queries. It has different defaults depending on the `env` option:

  - `'relay'`: `'Relay.QL'`
  - `'internal'`: Special automatic value
  - others: `'gql'`, `'graphql'`

You also have to specify a schema. You can either do it using _one_ of these options:

- `schemaJson`: Your schema as JSON.
- `schemaJsonFilepath`: The absolute path to your schema as a .json file. (Warning: this variant is incompatible with `eslint --cache`.)
- `schemaString`: Your schema in the Schema Language format as a string.

Alternatively, you can use a [.graphqlconfig](https://github.com/graphcool/graphql-config) file instead of the above three options. If you do there's one more option to know about:

- `projectName`: In case you specify multiple schemas in your `.graphqlconfig` file, choose which one to use by providing the project name here as a string.

There's an example on how to use a `.graphqlconfig` file further down.

### Identity template literal tag

This plugin relies on GraphQL queries being prefixed with a special tag. In Relay and Apollo, this is always done, but other clients often take query strings without a tag. In this case, you can define an identity tag that doesn't do anything except for tell the linter this is a GraphQL query:

```js
global.gql = (literals, ...substitutions) => {
    let result = "";

    // run the loop only for the substitution count
    for (let i = 0; i < substitutions.length; i++) {
        result += literals[i];
        result += substitutions[i];
    }

    // add the last literal
    result += literals[literals.length - 1];

    return result;
}
```

Code snippet taken from:  <https://leanpub.com/understandinges6/read#leanpub-auto-multiline-strings>

Note: The linter rule could be extended to identify calls to various specific APIs to eliminate the need for a template literal tag, but this might just make the implementation a lot more complex for little benefit.

### GraphQL literal files

This plugin also lints GraphQL literal files ending on `.gql` or `.graphql`.
In order to do so set `env` to `'literal'` in your `.eslintrc.js` and tell eslint to check these files as well.

```bash
eslint . --ext .js --ext .gql --ext .graphql
```

### Example config for Apollo

```js
// In a file called .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
      env: 'apollo',

      // Import your schema JSON here
      schemaJson: require('./schema.json'),

      // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

      // OR provide the schema in the Schema Language format
      // schemaString: printSchema(schema),

      // tagName is gql by default
    }]
  },
  plugins: [
    'graphql'
  ]
}
```

### Example config for Relay

```js
// In a file called .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
      env: 'relay',

      // Import your schema JSON here
      schemaJson: require('./schema.json'),

      // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

      // OR provide the schema in the Schema Language format
      // schemaString: printSchema(schema),

      // tagName is set for you to Relay.QL
    }]
  },
  plugins: [
    'graphql'
  ]
}
```

### Example config for Lokka

```js
// In a file called .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
      env: 'lokka',

      // Import your schema JSON here
      schemaJson: require('./schema.json'),

      // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

      // OR provide the schema in the Schema Language format
      // schemaString: printSchema(schema),

      // Optional, the name of the template tag, defaults to 'gql'
      tagName: 'gql'
    }]
  },
  plugins: [
    'graphql'
  ]
}
```

### Example config for FraQL

```js
// In a file called .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
      env: 'fraql',

      // Import your schema JSON here
      schemaJson: require('./schema.json'),

      // OR provide absolute path to your schema JSON
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

      // OR provide the schema in the Schema Language format
      // schemaString: printSchema(schema),

      // Optional, the name of the template tag, defaults to 'gql'
      tagName: 'gql'
    }]
  },
  plugins: [
    'graphql'
  ]
}
```

### Example config for literal graphql files

```js
// In a file called .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
      env: 'literal',

      // Import your schema JSON here
      schemaJson: require('./schema.json'),

      // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

      // OR provide the schema in the Schema Language format
      // schemaString: printSchema(schema),

      // tagName is set automatically
    }]
  },
  plugins: [
    'graphql'
  ]
}
```

### Additional Schemas or Tags

This plugin can be used to validate against multiple schemas by identifying them with different tags. This is useful for applications interacting with multiple GraphQL systems. Additional schemas can simply be appended to the options list:

```js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      env: 'apollo',
      tagName: 'FirstGQL',
      schemaJson: require('./schema-first.json')
    }, {
      env: 'relay',
      tagName: 'SecondGQL',
      schemaJson: require('./schema-second.json')
    }]
  },
  plugins: [
    'graphql'
  ]
}
```

### Example config when using [.graphqlconfig](https://github.com/graphcool/graphql-config)

If you have `.graphqlconfig` file in the root of your repo you can omit schema-related
properties (`schemaJson`, `schemaJsonFilepath` and `schemaString`) from rule config.

```js
// In a file called .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
      env: 'literal'
      // no need to specify schema here, it will be automatically determined using .graphqlconfig
    }]
  },
  plugins: [
    'graphql'
  ]
}
```

In case you use additional schemas, specify `projectName` from `.graphqlconfig` for each `tagName`:
```js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      env: 'apollo',
      tagName: 'FirstGQL',
      projectName: 'FirstGQLProject'
    }, {
      env: 'relay',
      tagName: 'SecondGQL',
      projectName: 'SecondGQLProject'
    }]
  },
  plugins: [
    'graphql'
  ]
}
```

### Selecting Validation Rules

GraphQL validation rules can be configured in the eslint rule configuration using the `validators` option. The default selection depends on the `env` setting. If no `env` is specified, all rules are enabled by default.

The `validators` setting can be set either to a list of specific validator names or to the special value `"all"`.

```js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      env: 'apollo',
      validators: 'all',
      tagName: 'FirstGQL',
      schemaJson: require('./schema-first.json')
    }, {
      validators: ['FieldsOnCorrectType'],
      tagName: 'SecondGQL',
      schemaJson: require('./schema-second.json')
    }]
  },
  plugins: [
    'graphql'
  ]
}
```

The full list of available validators is:
  - `ExecutableDefinitions`
  - `FieldsOnCorrectType`
  - `FragmentsOnCompositeTypes`
  - `KnownArgumentNames`
  - `KnownDirectives` (*disabled by default in `relay`*)
  - `KnownFragmentNames` (*disabled by default in all envs*)
  - `KnownTypeNames`
  - `LoneAnonymousOperation`
  - `NoFragmentCycles`
  - `NoUndefinedVariables` (*disabled by default in `relay`*)
  - `NoUnusedFragments` (*disabled by default in all envs*)
  - `NoUnusedVariables`
  - `OverlappingFieldsCanBeMerged`
  - `PossibleFragmentSpreads`
  - `ProvidedRequiredArguments` (*disabled by default in `relay`*)
  - `ScalarLeafs` (*disabled by default in `relay`*)
  - `SingleFieldSubscriptions`
  - `UniqueArgumentNames`
  - `UniqueDirectivesPerLocation`
  - `UniqueFragmentNames`
  - `UniqueInputFieldNames`
  - `UniqueOperationNames`
  - `UniqueVariableNames`
  - `ValuesOfCorrectType`
  - `VariablesAreInputTypes`
  - `VariablesDefaultValueAllowed`
  - `VariablesInAllowedPosition`

### Named Operations Validation Rule

The Named Operation rule validates that all operations are named. Naming operations is valuable for including in server-side logs and debugging.

**Pass**
```
query FetchUsername {
  viewer {
    name
  }
}
```

**Fail**
```
query {
  viewer {
    name
  }
}
```

The rule is defined as `graphql/named-operations`.

```js
// In a file called .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      env: 'apollo',
      schemaJson: require('./schema.json'),
    }],
    "graphql/named-operations": ['warn', {
      schemaJson: require('./schema.json'),
    }],
  },
  plugins: [
    'graphql'
  ]
}
```
### Required Fields Validation Rule

The Required Fields rule validates that any specified required field is part of the query, but only if that field is available in schema. This is useful to ensure that query results are cached properly in the client.

**Pass**
```
// 'uuid' required and present in the schema

schema {
  query {
    viewer {
      name
      uuid
    }
  }
}

query ViewerName {
  viewer {
    name
    uuid
  }
}
```

**Pass**
```
// 'uuid' usually required but not present in the schema here

schema {
  query {
    viewer {
      name
    }
  }
}

query ViewerName {
  viewer {
    name
  }
}
```

**Fail**
```
// 'uuid' required and present in the schema

schema {
  query {
    viewer {
      uuid
      name
    }
  }
}

query ViewerName {
  viewer {
    name
  }
}
```

The rule is defined as `graphql/required-fields` and requires the `requiredFields` option.

```js
// In a file called .eslintrc.js
module.exports = {
  rules: {
    'graphql/required-fields': [
      'error',
      {
        env: 'apollo',
        schemaJsonFilepath: path.resolve(__dirname, './schema.json'),
        requiredFields: ['uuid'],
      },
    ],
  },
  plugins: [
    'graphql'
  ]
}
```

### Capitalization of a first letter of a Type name

This rule enforces that first letter of types is capitalized

**Pass**
```
query {
  someUnion {
    ... on SomeType {
      someField
    }
  }
}
```

**Fail**
```
query {
  someUnion {
    ... on someType {
      someField
    }
  }
}
```

The rule is defined as `graphql/capitalized-type-name`.

```js
// In a file called .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      env: 'apollo',
      schemaJson: require('./schema.json'),
    }],
    "graphql/capitalized-type-name": ['warn', {
      schemaJson: require('./schema.json'),
    }],
  },
  plugins: [
    'graphql'
  ]
}
```

### No Deprecated Fields Validation Rule

The No Deprecated Fields rule validates that no deprecated fields are part of the query. This is useful to discover fields that have been marked as deprecated and shouldn't be used.

**Fail**
```
// 'id' requested and marked as deprecated in the schema

schema {
  query {
    viewer {
      id: Int @deprecated(reason: "Use the 'uuid' field instead")
      uuid: String
    }
  }
}

query ViewerName {
  viewer {
    id
  }
}
```

The rule is defined as `graphql/no-deprecated-fields`.

```js
// In a file called .eslintrc.js
module.exports = {
  rules: {
    'graphql/no-deprecated-fields': [
      'error',
      {
        env: 'relay',
        schemaJson: require('./schema.json')
      },
    ],
  },
  plugins: [
    'graphql'
  ]
}
```
