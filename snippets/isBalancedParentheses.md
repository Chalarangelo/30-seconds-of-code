---
title: isBalancedParentheses
tags: string,function,beginner
---

Define if each open paranthesis has its closed pair.

- `"()"` or `"(())"` or `"()()"` - balanced.
- `"("` or `"(()"` or `")())"` - not balanced.


```js
const isBalancedParentheses = (str) => {
  let counter = 0;

  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === '(') {
      counter += 1;
    } else if (str[i] === ')') {
      counter -= 1;
    }
  }

  if (counter != 0) {
    return false;
  } else {
    return true
  }
}
```

```js
isBalancedParentheses("(()))"); // false
isBalancedParentheses("()()"); // true

```