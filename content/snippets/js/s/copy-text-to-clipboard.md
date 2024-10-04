---
title: How can I copy text to clipboard with JavaScript?
shortTitle: Copy text to clipboard
language: javascript
tags: [browser]
cover: typing
excerpt: Learn how to programmatically copy text to clipboard with a few lines of JavaScript and level up your web development skills.
listed: true
dateModified: 2024-01-13
---

A very common need when building websites is the ability to **copy text to clipboard** with a single button click. Doing this programmatically with JavaScript is quite easy in modern browsers, using the asynchronous [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). If, however, you need to support older browsers, there is an alternative option, but it's a little more complicated.

## The Asynchronous Clipboard API

Full support for the Clipboard API still isn't here at the time of writing (January, 2024), but you can at least use it to write to the clipboard. Thankfully, that's all you really need. Despite support caveats, this is the **recommended** way to copy text to clipboard, as it provides an **easy and secure** solution.

All you have to do is ensure `Navigator`, `Navigator.clipboard` and `Navigator.clipboard.writeText` are truthy and then call `Clipboard.writeText()` to copy the value to clipboard. In case anything goes wrong, you can use `Promise.reject()` to return a promise that rejects immediately and keep the return type consistent.

```js
const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};
```

If you're concerned about browser support, you can use `Promise.prototype.catch()` to handle the error and **provide a fallback**. The fallback could even be using the legacy method, which we'll cover next.

## Using `Document.execCommand('copy')`

While support for the Clipboard API is pretty high across the board, you might need a fallback if you have to **support older browsers**. If that's the case, you can use [`Document.execCommand('copy')`](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) to do so. Here's a quick step-by-step guide:

1. Create a `<textarea>` element to be appended to the document. Set its value to the string you want to copy to the clipboard.
2. Append the `<textarea>` element to the current HTML document and use CSS to hide it to prevent flashing.
3. Use `Selection.getRangeAt()`to store the selected range (if any).
4. Use `HTMLInputElement.select()` to select the contents of the `<textarea>` element.
5. Use `Document.execCommand('copy')` to copy the contents of the `<textarea>` to the clipboard.
6. Remove the `<textarea>` element from the document and restore the user's previous selection, if any.

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

> [!CAUTION]
>
> This method will not work everywhere, but only as a **result of a user action** (e.g. inside a `click` event listener). This is a security measure to prevent malicious websites from copying sensitive data to the clipboard without the user's consent.
