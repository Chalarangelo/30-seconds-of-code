---
title: limitText
tags: string,beginner
---

If the text is longer than the `limit`, the text will be cut off and added ellipsis to the end if `ellipsis` is `true`.


```js
const limitText = (text, limit, ellipsis = true) => {
  const stringText = text.toString();

  if (stringText.length > limit) {
    return `${stringText.slice(0, limit)}${ellipsis && '...'}`;
  }

  return text;
}
```

```js
limitText("This text will be truncated at some point", 35, true); //"This text will be truncated at some..."
```
