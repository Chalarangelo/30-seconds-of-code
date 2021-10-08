---
title: reverse
tags: reverse,string
firstSeen: 2021-10-08T13:13:05+03:00
lastUpdated: 2021-10-08T13:13:44+02:00
---

Flips a given string.

- Use `String.prototype.split()` divides a String into an ordered list of substrings.
- Use `Array.prototype.reverse()` reverses the array in place.
- Use `Array.prototype.join` returns a new string by concatenating all of the elements in front of array.

```js
const reverse = str => str.split('').reverse().join('')
```

```js
reverse('hello world'); // 'dlrow olleh'
reverse('coding'); // 'gnidoc'
```
