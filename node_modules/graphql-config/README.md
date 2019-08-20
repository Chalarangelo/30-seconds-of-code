# graphql-config

[![Build Status](https://travis-ci.org/prisma/graphql-config.svg?branch=master)](https://travis-ci.org/prisma/graphql-config) [![npm version](https://badge.fury.io/js/graphql-config.svg)](https://badge.fury.io/js/graphql-config)

> The README reflects the new [graphql-config protocol](specification.md).
> Old graphql-config-parser documentation [can be found here](https://github.com/graphcool/graphql-config/tree/graphql-config-parser)

The easiest way to configure your development environment with your GraphQL schema (supported by most tools, editors &amp; IDEs)

## Supported by...

### Language Services
* [graphql-language-service](https://github.com/graphql/graphql-language-service) - An interface for building GraphQL language services for IDEs (_pending_)

### Editors
* [js-graphql-intellij-plugin](https://github.com/jimkyndemeyer/js-graphql-intellij-plugin) - GraphQL language support for IntelliJ IDEA and WebStorm, including Relay.QL tagged templates in JavaScript and TypeScript (_pending_)
* [atom-language-graphql](https://github.com/rmosolgo/language-graphql) - GraphQL support for Atom text editor (_pending_)
* [vscode-graphql](https://github.com/stephen/vscode-graphql) - GraphQL support for VSCode text editor

### Tools

* [babel-plugin-react-relay](https://github.com/graphcool/babel-plugin-react-relay) - Babel compile step to process your `Relay.QL` queries (_pending_)
* [babel-plugin-transform-relay-hot](https://github.com/nodkz/babel-plugin-transform-relay-hot) - Wrapper under BabelRelayPlugin with hot reload (_pending_)
* [eslint-plugin-graphql](https://github.com/apollostack/eslint-plugin-graphql) - An ESLint plugin that checks tagged template strings against a GraphQL schema (_pending_)
* [webpack-plugin-graphql-schema-hot](https://github.com/nodkz/webpack-plugin-graphql-schema-hot) - Webpack plugin which tracks changes in your schema and generates its introspection in `json` and `txt` formats (_pending_)

> Did we forget a tool/editor? Please [add it here](https://github.com/graphcool/graphql-config/issues/new).

**[Go to `graphql-config` library docs](#graphql-config-api)**

## Usage

**tl;dr**

Install [`graphql-cli`](https://github.com/graphcool/graphql-cli) and run `graphql init`. Answer a few simple questions and you are set up!

You can either configure your GraphQL endpoint via a configuration file `.graphqlconfig`
(or `.graphqlconfig.yaml`) which should be put into the root of your project

### Simplest use case

The simplest config specifies only `schemaPath` which is path to the file with introspection
results or corresponding SDL document

```json
{
  "schemaPath": "schema.graphql"
}
```

or

```json
{
  "schemaPath": "schema.json"
}
```

### Specifying includes/excludes files

You can specify which files are included/excluded using the corresponding options:

```json
{
  "schemaPath": "schema.graphql",
  "includes": ["*.graphql"],
  "excludes": ["temp/**"]
}
```

> Note: `excludes` and `includes` fields are globs that should match filename.
> So, just `temp` or `temp/` won't match all files inside the directory.
> That's why the example uses `temp/**`

#### Specifying endpoint info

You may specify your endpoints info in `.graphqlconfig` which may be used by some tools.
The simplest case:

```json
{
  "schemaPath": "schema.graphql",
  "extensions": {
    "endpoints": {
      "dev": "https://example.com/graphql"
    }
  }
}
```

In case you need provide additional information, for example headers to authenticate your GraphQL endpoint or
an endpoint for subscription, you can use expanded version:

```json
{
  "schemaPath": "schema.graphql",
  "extensions": {
    "endpoints": {
      "dev": {
        "url": "https://example.com/graphql",
        "headers": {
          "Authorization": "Bearer ${env:AUTH_TOKEN_ENV}"
        },
        "subscription": {
          "url": "ws://example.com/graphql",
          "connectionParams": {
            "Token": "${env:YOUR_APP_TOKEN}"
          }
        }
      }
    }
  }
}
```

> Note: do not save secure information in .graphqlconfig file. Use [Environment variables](specification.md#referencing-environment-variables) for that like in the example above.

In case if you have multiple endpoints use the following syntax:

```json
{
  "schemaPath": "schema.graphql",
  "extensions": {
    "endpoints": {
      "prod": {
        "url": "https://your-app.com/graphql",
        "subscription": {
          "url": "wss://subscriptions.graph.cool/v1/instagram"
        }
      },
      "dev": {
        "url": "http://localhost:3000/graphql",
        "subscription": {
          "url": "ws://localhost:3001"
        }
      }
    }
  }
}
```

### Multi-project configuration (advanced)
> TBD

__Refer to [specification use-cases](specification.md#use-cases) for details__

## How it works

This project aims to be provide a unifying configuration file format to configure your GraphQL schema in your development environment.

Additional to the format specification, it provides the [`graphql-config`](#graphql-config-api) library, which is used by [all supported tools and editor plugins](#supported-by). The library reads your provided configuration and passes the actual GraphQL schema along to the tool which called it.


## `graphql-config` API

Here are very basic examples of how to use `graphql-config` library.

You can find **[the detailed documentation here](docs/)**

### getGraphQLProjectConfig

**NOTE:** if your tool works on per-file basis (e.g. editor plugin, linter, etc) use
[`getGraphQLConfig`](#getGraphQLConfig) function

`getGraphQLProjectConfig` should be used by tools that do not work on per-file basis

```js
import { getGraphQLProjectConfig } from 'graphql-config'

const config = getGraphQLProjectConfig('./optionalProjectDir', 'optionalProjectName')
const schema = config.getSchema()
// use schema for your tool/plugin
```

### getGraphQLConfig

`getGraphQLConfig` should be used by tools that work on per-file basis (editor plugins,
linters, etc.)

```js
import { getGraphQLConfig } from 'graphql-config'

const config = getGraphQLConfig('./optionalProjectDir')
const schema = config.getConfigForFile(filename).getSchema()
// use schema for your tool/plugin
```

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
