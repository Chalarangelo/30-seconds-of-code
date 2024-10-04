---
title: Flatten or unflatten a JavaScript object
shortTitle: Flatten or unflatten object
language: javascript
tags: [object,recursion]
cover: lighthouse
excerpt: Learn how to manipulate JavaScript objects by flattening or unflattening them.
listed: true
dateModified: 2024-01-03
---

Data representations often differ from one another, as do requirements for data structures. Sometimes, you need to **convert a nested object into a flat object** or vice versa. This is a non-trivial task, but it can be solved using a recursive strategy.

## Flatten an object

Given an object, you can flatten it by **converting every leaf node to a flattened path node**. As this might be hard to grasp, here's an example:

```js
const fileSizes = {
  package: 256,
  src: {
    index: 1024,
    styles: {
      main: 128,
      colors: 16
    },
  },
  assets: {
    images: {
      logo: 512,
      background: 512
    },
    fonts: {
      serif: 64
    }
  }
};

const flattenedFileSizes = {
  'package': 256,
  'src.index': 1024,
  'src.styles.main': 128,
  'src.styles.colors': 16,
  'assets.images.logo': 512,
  'assets.images.background': 512,
  'assets.fonts.serif': 64
};
```

> [!NOTE]
>
> The **order of the resulting keys** may not match the order of the original keys, as JavaScript **objects are unordered**. All examples in this article preserve the original order for easier understanding.

In order to build a **recursive solution**, we need to define the **base case**. In this situation, that would be **keys whose values are not objects**. In that case, we can simply **add the key-value pair to the result**.

For **keys whose values are objects**, we need to call the function recursively, adding the **current key as a prefix**. Applying this for deeper levels, we have to **prepend any previous prefixes** to the current key. Using this algorithm, we can build the flattened object.

_Ok, so how do we do this in JavaScript?_ We can use `Object.keys()` to get the keys of an object and `Array.prototype.reduce()` to convert every leaf node to a flattened path node. If the value of a key is an object, we call the function recursively with the appropriate prefix to create the path using `Object.assign()`. Otherwise, we add the appropriate prefixed key-value pair to the accumulator object.

In the previous example, we used a **delimiter** of `.` to separate the keys, but this can be customized, using an additional argument. Finally, the last argument is used for the recursive calls and should always be omitted unless you want every key to have a prefix.

```js
const flattenObject = (obj, delimiter = '.', prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], delimiter, pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

// Assuming the previous object, `fileSizes`
flattenObject(fileSizes, '/');
/* {
  'package': 256,
  'src/index': 1024,
  'src/styles/main': 128,
  'src/styles/colors': 16,
  'assets/images/logo': 512,
  'assets/images/background': 512,
  'assets/fonts/serif': 64
} */
```

## Unflatten an object

Reversing the process is a little bit different. Given a key in the flattened object, you need to **split the path at the delimiter** and use the resulting array to **create nested objects**.

In order to do this, we can use `String.prototype.split()` to split the key at the delimiter and `Array.prototype.reduce()` to add objects against the keys. If the current accumulator already contains a value against a particular key, we return its value as the next accumulator. Otherwise, we add the appropriate key-value pair to the accumulator object and return the value as the accumulator. Finally, we can use `Object.keys()` and `Array.prototype.reduce()` to apply this to every key in the flattened object.

```js
const unflattenObject = (obj, delimiter = '.') =>
  Object.keys(obj).reduce((res, k) => {
    k.split(delimiter).reduce(
      (acc, e, i, keys) =>
        acc[e] ||
        (acc[e] = isNaN(Number(keys[i + 1]))
          ? keys.length - 1 === i
            ? obj[k]
            : {}
          : []),
      res
    );
    return res;
  }, {});

// Assuming the previous object, `flattenedFileSizes`
unflattenObject(flattenedFileSizes);
/* {
  package: 256,
  src: {
    index: 1024,
    styles: {
      main: 128,
      colors: 16
    },
  },
  assets: {
    images: {
      logo: 512,
      background: 512
    },
    fonts: {
      serif: 64
    }
  }
} */
```

> [!WARNING]
>
> Flattening and unflattening objects might result in **data loss**, especially if the keys contain the delimiter. Always be careful about handling and transforming data.
