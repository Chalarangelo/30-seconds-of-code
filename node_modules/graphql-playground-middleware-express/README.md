# graphql-playground-middleware-express

> Express middleware to expose an endpoint for the GraphQL Playground IDE

## Installation

Using yarn:

```console
yarn add graphql-playground-middleware-express
```

Or npm:

```console
npm install graphql-playground-middleware-express --save
```

## Usage

See full example in [examples/basic](https://github.com/prisma/graphql-playground/tree/master/packages/graphql-playground-middleware-express/examples/basic).

```js
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express()

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
```
