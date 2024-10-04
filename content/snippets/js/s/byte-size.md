---
title: Calculate the byte size of a JavaScript string
shortTitle: Byte size of string
language: javascript
tags: [string]
cover: mountain-lake-cottage-2
excerpt: Figure out the exact number of bytes in a JavaScript string, including Unicode characters.
listed: true
dateModified: 2024-03-09
---

Calculating the byte size of a string is surprisingly tricky, especially when dealing with Unicode characters. The **length of a string** in JavaScript is the number of 16-bit code units in the string, which is not the same as the **number of bytes**. This is especially important when working with non-ASCII characters, which can be represented by multiple bytes.

In order to correctly handle all cases, we can convert the string into a `Blob` object, and then use the `Blob.size` property to get the byte size of the string.

```js
const byteSize = str => new Blob([str]).size;

const helloWorldString = 'Hello World';
helloWorldString.length; // 11
byteSize(helloWorldString); // 11

const emojisString = '😀';
emojiString.length; // 2
byteSize(emojisString); // 4
```
