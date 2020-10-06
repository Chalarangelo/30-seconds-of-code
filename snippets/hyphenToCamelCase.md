---
title: hyphenToCamelCase
tags: string,beginner
---

Function turns hyphen-styled text into camelcase text.

- Function uses regex to match all lowercase letters after hyphens and turns them into uppercase.

```js
const hyphenToCamelCase = (str) => str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
```

```js
hyphenToCamelCase('this-is-test-string'); // 'thisIsTestString'
```
