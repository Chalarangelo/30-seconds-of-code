# graphql-type-json [![Travis][build-badge]][build] [![npm][npm-badge]][npm]

JSON scalar type for [GraphQL.js](https://github.com/graphql/graphql-js).

[![Codecov][codecov-badge]][codecov]

## Usage

This package exports a JSON scalar GraphQL.js type:

```js
import GraphQLJSON from 'graphql-type-json';
```

### Programmatically-constructed schemas

You can use this in a programmatically-constructed schema as with any other scalar type:

```js
import { GraphQLObjectType } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

export default new GraphQLObjectType({
  name: 'MyType',

  fields: {
    myField: { type: GraphQLJSON },
  },
});
```

### SDL with [GraphQL-tools](https://github.com/apollographql/graphql-tools)

When using the SDL with GraphQL-tools, define `GraphQLJSON` as the resolver for the appropriate scalar type in your schema:

```js
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';

const typeDefs = `
scalar JSON

type MyType {
  myField: JSON
}

# ...
`;

const resolvers = {
  JSON: GraphQLJSON,
};

export default makeExecutableSchema({ typeDefs, resolvers });
```

[build-badge]: https://img.shields.io/travis/taion/graphql-type-json/master.svg
[build]: https://travis-ci.org/taion/graphql-type-json

[npm-badge]: https://img.shields.io/npm/v/graphql-type-json.svg
[npm]: https://www.npmjs.com/package/graphql-type-json

[codecov-badge]: https://img.shields.io/codecov/c/github/taion/graphql-type-json/master.svg
[codecov]: https://codecov.io/gh/taion/graphql-type-json
