---
title: Extract emails from string
tags: string,email,intermediate,javascript
firstSeen: 2021-07-08T00:37:20Z
---

Extracts all the emails from a given text string.

- Use email regex to extract all the matching result from the string

```js
const extractEmail = (text) => {
    const email_regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    return text.match(email_regex);
}
```

```js
// example string string
let foo = "Hello, this is one email rahat@yahoo.com. This is another email dipto@hotmail.org"


extractEmail(foo) // [ 'rahat@yahoo.com.', 'dipto@hotmail.org' ]
```