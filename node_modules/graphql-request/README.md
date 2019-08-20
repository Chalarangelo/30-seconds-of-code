# graphql-request

[![CircleCI](https://circleci.com/gh/prismagraphql/graphql-request.svg?style=shield)](https://circleci.com/gh/prismagraphql/graphql-request) [![npm version](https://badge.fury.io/js/graphql-request.svg)](https://badge.fury.io/js/graphql-request)

📡 Minimal GraphQL client supporting Node and browsers for scripts or simple apps

## Features

* Most **simple and lightweight** GraphQL client
* Promise-based API (works with `async` / `await`)
* Typescript support (Flow coming soon)


## Install

```sh
npm install graphql-request
```

## Quickstart

Send a GraphQL query with a single line of code. ▶️ [Try it out](https://runkit.com/593130bdfad7120012472003/593130bdfad7120012472004).

```js
import { request } from 'graphql-request'

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`

request('https://api.graph.cool/simple/v1/movies', query).then(data => console.log(data))
```

## Usage

```js
import { request, GraphQLClient } from 'graphql-request'

// Run GraphQL queries/mutations using a static function
request(endpoint, query, variables).then(data => console.log(data))

// ... or create a GraphQL client instance to send requests
const client = new GraphQLClient(endpoint, { headers: {} })
client.request(query, variables).then(data => console.log(data))
```

## Examples

### Authentication via HTTP header

```js
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('my-endpoint', {
  headers: {
    Authorization: 'Bearer my-jwt-token',
  },
})

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`

client.request(query).then(data => console.log(data))
```

### Passing more options to fetch

```js
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('my-endpoint', {
 credentials: 'include',
 mode: 'cors'
})

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`

client.request(query).then(data => console.log(data))
```

### Using variables

```js
import { request } from 'graphql-request'

const query = `query getMovie($title: String!) {
  Movie(title: $title) {
    releaseDate
    actors {
      name
    }
  }
}`

const variables = {
  title: 'Inception',
}

request('my-endpoint', query, variables).then(data => console.log(data))
```

### Error handling

```js
import { request } from 'graphql-request'

const wrongQuery = `{
  some random stuff
}`

request('my-endpoint', query)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err.response.errors) // GraphQL response errors
    console.log(err.response.data) // Response data if available
  })
```

### Using `require` instead of `import`

```js
const { request } = require('graphql-request')

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`

request('my-endpoint', query).then(data => console.log(data))
```

### Cookie support for `node`

```sh
npm install fetch-cookie/node-fetch
```

```js
import { GraphQLClient } from 'graphql-request'

// use this instead for cookie support
global['fetch'] = require('fetch-cookie/node-fetch')(require('node-fetch'))

const client = new GraphQLClient('my-endpoint')

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`

client.request(query).then(data => console.log(data))
```

### Receiving a raw response

The `request` method will return the `data` or `errors` key from the response.
If you need to access the `extensions` key you can use the `rawRequest` method:

```js
import { rawRequest } from 'graphql-request'

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`

rawRequest('my-endpoint', query).then(({data, extensions}) => console.log(data, extensions))
```

### More examples coming soon...

* Fragments
* Using [`graphql-tag`](https://github.com/apollographql/graphql-tag)
* Typed Typescript return values

## FAQ

### What's the difference between `graphql-request`, Apollo and Relay?

`graphql-request` is the most minimal and simplest to use GraphQL client. It's perfect for small scripts or simple apps.

Compared to GraphQL clients like Apollo or Relay, `graphql-request` doesn't have a built-in cache and has no integrations for frontend frameworks. The goal is to keep the package and API as minimal as possible.

### So what about Lokka?

Lokka is great but it still requires [a lot of setup code](https://github.com/kadirahq/lokka-transport-http) to be able to send a simple GraphQL query. `graphql-request` does less work compared to Lokka but is a lot simpler to use.


## Help & Community [![Slack Status](https://slack.prisma.io/badge.svg)](https://slack.prisma.io)

Join our [Slack community](http://slack.prisma.io/) if you run into issues or have questions. We love talking to you!

<p align="center"><a href="https://oss.prisma.io"><img src="https://imgur.com/IMU2ERq.png" alt="Prisma" height="170px"></a></p>
