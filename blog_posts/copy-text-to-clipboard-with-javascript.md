---
title: How can I copy text to clipboard with JavaScript?
type: question
tags: javascript,browser
authors: chalarangelo
cover: blog_images/copy-text-to-clipboard-with-javascript.jpg
excerpt: Learn how to programmatically copy text to clipboard with a few lines of JavaScript and level up your web development skills.
---

### Core functionality

A very common need when building websites is the ability to copy text to clipboard with a single button click. Javascript can easily do this in five short steps:hout the user selecting it or hitting the appropriate key combination on their keyboard. Javascript can easily do this in five short steps:

1. Create a` <textarea>` element to be appended to the document. Set its value to the string that we want to copy to the clipboard.
2. Append said `<textarea>` element to the current HTML document.
3. Use `HTMLInputElement.select()` to select the contents of the `<textarea>` element.
4. Use `Document.execCommand('copy')` to copy the contents of the `<textarea>` to the clipboard.
5. Remove the `<textarea>` element from the document.

The simplest version of this method looks something like this:

```js
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
```

Bear in mind that this method will not work everywhere, but only as a result of a user action (e.g. inside a `click` event listener), due to the way `Document.execCommand()` works.

### Hide the appended element

The above method, while functional, might have some issues such as flashing when appending and removing the `<textarea>`, a problem that is even more apparent when considering accessibility. A major improvement to this method comes from adding some CSS to make the element invisible and restrict editing by users:

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

### Save and restore the original document's selection

The final consideration before wrapping this up is respecting the user's previous interaction with the website, like having already selected some content. Luckily, we can now use some modern Javascript methods and properties like `DocumentOrShadowRoot.getSelection()`, `Selection.rangeCount`, `Selection.getRangeAt()`, `Selection.removeAllRanges()` and `Selection.addRange()` to save and restore the original document selection. You can find the final code with these improvements implemented in the [copyToClipboard snippet](/js/s/copy-to-clipboard/).

**Image credit:** [Kaitlyn Baker](https://unsplash.com/@kaitlynbaker?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
