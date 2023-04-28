---
title: How can I copy text to clipboard with JavaScript?
shortTitle: Copy text to clipboard
type: question
tags: [javascript,browser]
author: chalarangelo
cover: typing
excerpt: Learn how to programmatically copy text to clipboard with a few lines of JavaScript and level up your web development skills.
dateModified: 2022-01-11T09:47:54+03:00
---

### Asynchronous Clipboard API

A very common need when building websites is the ability to copy text to clipboard with a single button click. If you only need to support modern browsers, it's highly recommended to use the asynchronous [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). It's supported in all modern browsers and provides an easy and secure way to update the clipboard's contents.

All you have to do is ensure `Navigator`, `Navigator.clipboard` and `Navigator.clipboard.writeText` are truthy and then call `Clipboard.writeText()` to copy the value to clipboard. In case anything goes wrong, you can use `Promise.reject()` to return a promise that rejects immediately and keep the return type consistent.

```js
const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};
```

This is pretty much how the [copyToClipboardAsync snippet](/js/s/copy-to-clipboard-async) is implemented and should work across all modern browsers.

### Document.execCommand('copy')

While support for the Clipboard API is pretty high across the board, you might need a fallback if you have to support older browsers. If that's the case, you can use `Document.execCommand('copy')` to do so. Here's a quick step-by-step guide:

1. Create a` <textarea>` element to be appended to the document. Set its value to the string you want to copy to the clipboard.
2. Append the `<textarea>` element to the current HTML document and use CSS to hide it to prevent flashing.
3. Use `HTMLInputElement.select()` to select the contents of the `<textarea>` element.
4. Use `Document.execCommand('copy')` to copy the contents of the `<textarea>` to the clipboard.
5. Remove the `<textarea>` element from the document.

```js
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
```

Bear in mind that this method will not work everywhere, but only as a result of a user action (e.g. inside a `click` event listener), due to the way `Document.execCommand()` works.

There are a couple of other considerations, such as restoring the user's previous selection on the document, which can be easily handled with modern JavaScript. You can find the final code with these improvements implemented in the [copyToClipboard snippet](/js/s/copy-to-clipboard/).
