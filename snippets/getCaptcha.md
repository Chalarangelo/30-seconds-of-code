---
title: getCaptha
tags: string, captcha
---

To get the string like CAPTCHA - Completely Automated Public Turing test to tell Computers and Humans Apart.

- Use `Math.random()` to generate random floating point value.
- Convert floating point value to base 36 to get some alphanumeric string.
- Then taking substring from base 36 string to have only alphanumeric.
- We can see the CAPTCHA based string as the result.

```js
const getCaptcha = () => Math.random().toString(36).substring(2, 8);
```

```js
getCaptcha(); // qa89fh
getCaptcha(); // c23j5t
getCaptcha(); // axrko3
getCaptcha(); // 03d91g
```
