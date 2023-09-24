---
title: Copy to clipboard
type: snippet
language: javascript
tags: [browser,string,event]
cover: overgrown
dateModified: 2022-01-11
---

Copies a string to the clipboard.
Only works as a result of user action (i.e. inside a `click` event listener).

- Create a new `<textarea>` element, fill it with the supplied data and add it to the HTML document.
- Use `Selection.getRangeAt()`to store the selected range (if any).
- Use `Document.execCommand()` to copy to the clipboard.
- Remove the `<textarea>` element from the HTML document.
- Finally, use `Selection.addRange()` to recover the original selected range (if any).
- **Note:** You can use the asynchronous [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) in most current browsers. You can find out more about it in the [copyToClipboardAsync snippet](/js/s/copy-to-clipboard-async).

```js
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
```

```js
copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.
```
