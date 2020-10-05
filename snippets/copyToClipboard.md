---
title: copyToClipboard
tags: array,intermediate
---

Copies any given text to clipboard.

- The system clipboard is exposed through the global `Navigator.clipboard` property.
- All of the Clipboard API methods operate asynchronously; they return a Promise which is resolved once the clipboard access has been completed.
- The promise is rejected if clipboard access is denied.
- `writeText()` method writes text to the system clipboard, returning a Promise which is resolved once the text is fully copied into the clipboard.

```js
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied!");
  } catch (err) {
    console.log("Copy failed", err);
  }
};

```

```js
copyToClipboard('Lorem Ipsum'); // 'Copied!'
```
