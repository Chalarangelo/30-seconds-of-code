---
title: How can I check for a blank value in JavaScript?
shortTitle: Value is blank
type: question
tags: javascript,type
author: chalarangelo
cover: blog_images/workspace-with-speaker.jpg
excerpt: JavaScript doesn't have a built-in way to check if a value is blank, but it's easy to create one.
firstSeen: 2022-09-25T05:00:00-04:00
---

JavaScript doesn't have a built-in way to check if a value is blank, but it's easy to create one. Before we do, however, we should define the behavior of such a method. The inspiration for this comes from Rails' `blank?` method, but modified to fit JavaScript's needs.

First of all, any falsy values should be considered blank. These include `null`, `undefined`, `0`, `false`, `''`, and `NaN`.

```js
const isFalsy = value => !value;

isFalsy(null); // true
isFalsy(undefined); // true
isFalsy(0); // true
isFalsy(false); // true
isFalsy(''); // true
isFalsy(NaN); // true
```

Secondly, empty arrays and objects should also be considered blank. This can be easily checked by using `Object.keys()` for both types of values.

```js
const isEmptyCollection = value =>
  (Array.isArray(value) || value === Object(value)) &&
  !Object.keys(value).length;

isEmptyCollection([]); // true
isEmptyCollection({}); // true
```

In addition to the empty string (`''`), whitespace-only strings should be considered blank, too. A regular expression can be used to check for this.

```js
const isWhitespaceString = value =>
  typeof value === 'string' && /^\s*$/.test(value);

isWhitespaceString(' '); // true
isWhitespaceString('\t\n\r'); // true
```

Finally, we can check for some commonly-used built-in objects. Invalid `Date` instances, as well as empty `Set` and `Map` instances should all be considered blank.

```js
const isInvalidDate = value =>
  value instanceof Date && Number.isNaN(value.getTime());
const isEmptySet = value => value instanceof Set && value.size === 0;
const isEmptyMap = value => value instanceof Map && value.size === 0;

isInvalidDate(new Date('hello')); // true
isEmptySet(new Set()); // true
isEmptyMap(new Map()); // true
```

Putting everything together, we can finally set up our `isBlank` method.

```js
const isFalsy = value => !value;
const isWhitespaceString = value =>
  typeof value === 'string' && /^\s*$/.test(value);
const isEmptyCollection = value =>
  (Array.isArray(value) || value === Object(value)) &&
  !Object.keys(value).length;
const isInvalidDate = value =>
  value instanceof Date && Number.isNaN(value.getTime());
const isEmptySet = value => value instanceof Set && value.size === 0;
const isEmptyMap = value => value instanceof Map && value.size === 0;

const isBlank = value => {
  if (isFalsy(value)) return true;
  if (isWhitespaceString(value)) return true;
  if (isEmptyCollection(value)) return true;
  if (isInvalidDate(value)) return true;
  if (isEmptySet(value)) return true;
  if (isEmptyMap(value)) return true;
  return false;
};

isBlank(null); // true
isBlank(undefined); // true
isBlank(0); // true
isBlank(false); // true
isBlank(''); // true
isBlank(' \r\n '); // true
isBlank(NaN); // true
isBlank([]); // true
isBlank({}); // true
isBlank(new Date('hello')); // true
isBlank(new Set()); // true
isBlank(new Map()); // true
```
