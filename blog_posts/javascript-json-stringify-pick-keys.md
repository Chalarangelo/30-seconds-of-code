---
title: "Tip: Serialize specific properties from a JSON object"
shortTitle: Selective property serialization
type: tip
tags: javascript,object,json
author: chalarangelo
cover: blog_images/coffee-drip.jpg
excerpt: Have you ever wanted to serialize an object but only include certain keys? Turns out JavaScript provides an easy way to do this!
firstSeen: 2021-07-06T05:00:00-04:00
---

The default behavior for `JSON.stringify()` is to pull all serializable properties from the given object. However, there are many scenarios where you might want to pick a specific subset of keys from an object. This problem is handled by the second argument of `JSON.stringify()` by passing it either an array of keys or a replacer function.

### Array of keys

An array of keys allows you to pick specific keys to be included in the stringified version of the object. This is particularly useful when you know the exact shape of the serialized object you want.

```js
const user = {
  id: 1234,
  username: 'johnsmith',
  name: 'John Smith',
  age: 39
};

JSON.stringify(user, ['username', 'name']);
// '{ "username": "johnsmith", "name": "John Smith" }'
```

### Replacer function

A replacer function is more versatile than an array of keys and takes both the key and value as its arguments. Apart from using it to include or exclude keys, it can also be useful in altering the value of each key in the stringified representation of the object. In order for a key to be included in the output, the replacer function must return a serializable value (string, number, boolean, null or object).

```js
class Point {
  constructor (x, y) {
    this.x = x;
    this. y = y;
  }
}

const target = {
  id: 1234,
  location: new Point(10, 20),
  name: 'Delivery point',
};

JSON.stringify(target, (key, value) => {
  // Exclude id
  if (key === 'id') return undefined;
  // Convert location to an array of coordinates
  if (value instanceof Point) return [value.x, value.y];
  // Return other properties (i.e. name) without modification
  return value;
});
// '{ "location": [10, 20], "name": "Delivery point" }'
```
