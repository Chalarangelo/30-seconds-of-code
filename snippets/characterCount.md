---
title: characterCount
tags: string,intermediate
---

Accumulates the number of occurrences of a character in a string.

- Use the spread operator (`...`) to convert the string into an array of characters.
- Use `Array.prototype.reduce()` to map the characters into a `Map<string, number>` keyed by the character along with the quantity of occurance as the value.

```js
const characterCount = str =>
  [...str].reduce((map, char) => map.set(char, (map.get(char) || 0) + 1), new Map());
```

```js
characterCount('foo'); // 'Map(2) {"f" => 1, "o" => 2}'
```