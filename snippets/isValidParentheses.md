---
title: isValidParentheses
tags: string,array,intermediate
firstSeen: 2021-09-11T21:23:46+02:00
lastUpdated: 2021-09-11T21:23:46+02:00
---

Checks if the provided value is a valid parentheses.

- `Array` is used a stack data structure.
- Check for each character of `string` to determine if it valid parentheses.

```js
const isValidParentheses = s => {
  let stack = [];
  let map = new Map();
  map.set("{", "}");
  map.set("(", ")");
  map.set("[", "]");
  for (let c of s) {
    if (map.has(c))
      stack.push(c)
    else {
      if (stack.length === 0) return false;
      let pop = stack.pop();
      if (!map.has(pop) || map.get(pop) !== c) return false;
    }
  }
   if (stack.length !== 0) return false;
  return true
};
```

```js
isValidParentheses("({[]})"); // true
isValidParentheses("[()]{}{[()()]()}"); // true
isValidParentheses("[(])"); // false
isValidParentheses("()"); // true
isValidParentheses("()[]{}"); // true
isValidParentheses("([)]"); // false
```
