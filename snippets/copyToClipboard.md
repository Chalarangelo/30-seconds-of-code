---
title: copyToClipboard
tags: browser,string,advanced
---

Copy a string to the clipboard.
Only works when the document is focused.

```js
const copyToClipboard = async str => {
  await navigator.clipboard.writeText(str);
};
```

```js
copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.
```
