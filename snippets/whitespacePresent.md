---
title: whitespacePresent
tags: array,intermediate
---

Checks if a String has a whitespace in it.
Function returns boolean specifying if the input String has a whitespace character in it.

```js
function hasWhiteSpace(sampleString) {
  return /\s/g.test(sampleString);
}
```
EXAMPLES:

```js
console.log(hasWhiteSpace("abcd"))
```
`$ false`


```js
console.log(hasWhiteSpace("abcd efgh"))
```
`$ true`

This also holds true for `tabs`