---
title: Check if a string contains a substring in JavaScript
shortTitle: String contains substring
type: story
tags: javascript,string
author: chalarangelo
cover: blog_images/sea-view-2.jpg
excerpt: Let's have a look at how to check if a string contains a substring in JavaScript.
firstSeen: 2022-07-27T05:00:00-04:00
---

### String.prototype.includes()

The most straightforward substring search option is `String.prototype.includes()`, introduced in ES6. It's a simple method that returns a boolean value depending on whether the string contains the substring or not.

```js
const str = 'Hello world';
str.includes('world'); // true
str.includes('foo'); // false
```

### String.prototype.indexOf()

Another option is `String.prototype.indexOf()`, which can be preferable if you need to support legacy browsers. As this methods returns the index of the first occurrence of the substring, you need to compare it to `-1` to know if the substring was found or not.

```js
const str = 'Hello world';
str.indexOf('world') !== -1; // true
str.indexOf('foo') !== -1; // false
```

### Case-insensitive substring search

Both methods presented so far are case-sensitive. If you need to search for a substring that is case-insensitive, you can use `String.prototype.toLowerCase()` to convert both strings to lowercase. Then you can compare them, using any of the previous methods.

```js
const str = 'Hello world';
const token = 'WORLD';
str.toLowerCase().includes(token.toLowerCase()); // true
```
