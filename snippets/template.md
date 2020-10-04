---
title: template
tags: js,template,beginner
---

Create a template function.

  ```js
  const templateLiteral = (value) => `hello ${value.user}`;
  let result = templateLiteral({ 'user': 'fred' });
  console.log(result);
  // output: 'hello fred'
  ```
