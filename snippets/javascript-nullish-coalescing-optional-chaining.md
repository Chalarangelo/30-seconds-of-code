---
title: How can I use optional chaining and nullish coalescing in my JavaScript project?
shortTitle: Optional chaining and nullish coalescing
type: question
tags: [javascript,type]
author: chalarangelo
cover: purple-leaves
excerpt: JavaScript ES2020 introduced optional chaining and nullish coalescing among other features. Learn everything you need to know with this quick guide.
dateModified: 2021-06-12T19:30:41+03:00
---

JavaScript ES2020 introduced some new features that help us write cleaner code. Let's take a quick look at two of them that aim to make working with objects and variables a lot easier.

### Optional chaining

The [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) (`?.`) allows us to access deeply nested object properties without having to validate each reference in the nesting chain. In case of a reference being nullish (`null` or `undefined`) the optional chaining operator will short-circuit, returning `undefined`. The optional chaining operator can also be used with function calls, returning `undefined` if the given function does not exist.

The resulting code is shorter and simpler, as you can see below:

```js
const data = getDataFromMyAPI();

// Without optional chaining
const userName = data && data.user && data.user.name;
const userType = data && data.user && data.user.type;
data && data.showNotifications && data.showNotifications();

// With optional chaining
const userName = data?.user?.name;
const userType = data?.user?.type;
data.showNotifications?.();
```

### Nullish coalescing

In the same spirit, the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (`??`) is a logical operator that allows us to check for nullish (`null` or `undefined`) values, returning the right-hand side operand when the value is non-nullish, otherwise returning the left-hand side operand.

Apart from cleaner code, this operator might spare us some headaches related to falsy values:

```js
const config = getServerConfig();

// Without nullish coalescing
const port = config.server.port || 8888;
// Oops! This will be true even if we pass it false
const wrongkeepAlive = config.server.keepAlive || true;
// We'll have to explicitly check for nullish values
const keepAlive =
  (config.server.keepAlive !== null & config.server.keepAlive !== undefined)
  ? config.server.keepAlive : true;

// With nullish coalescing
const port = config.server.port ?? 8888;
// This works correctly
const keepAlive = config.server.keepAlive ?? true;
```

**Note:** Keep in mind that both features are quite new, so their support might not be great just yet (around 80% at the time of writing [[1]](https://caniuse.com/#feat=mdn-javascript_operators_optional_chaining)[[2]](https://caniuse.com/#feat=mdn-javascript_operators_nullish_coalescing)).
