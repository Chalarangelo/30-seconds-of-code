---
title: Copy to clipboard async
type: snippet
tags: [browser,string,promise]
cover: typing
dateModified: 2022-01-11T05:00:00-04:00
---

Copies a string to the clipboard, returning a promise that resolves when the clipboard's contents have been updated.

- Check if the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) is available. Use an `if` statement to ensure `Navigator`, `Navigator.clipboard` and `Navigator.clipboard.writeText` are truthy.
- Use `Clipboard.writeText()` to write the given value, `str`, to the clipboard.
- Return the result of `Clipboard.writeText()`, which is a promise that resolves when the clipboard's contents have been updated.
- In case that the Clipboard API is not available, use `Promise.reject()` to reject with an appropriate message.
- **Note:** If you need to support older browsers, you might want to use `Document.execCommand()` instead. You can find out more about it in the [copyToClipboard snippet](/js/s/copy-to-clipboard).

```js
const copyToClipboardAsync = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};
```

```js
copyToClipboardAsync('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.
```
