---
title: How can I get the currently selected text in the browser?
shortTitle: Get selected text
language: javascript
tags: [browser]
cover: white-tablet-2
excerpt: Learn how to get the currently selected text in the browser using JavaScript.
listed: true
dateModified: 2024-07-16
---

When working with text in the browser, you may need to **get the currently selected text** to perform various operations. This can be useful for implementing features like copy-paste functionality, text highlighting, or custom context menus.

As usual, JavaScript provides a way to achieve this using `Window.getSelection()`, which returns a `Selection` object representing the text currently selected in the document. You can then use `Selection.toString()` to get the actual text content.

```js
const getSelectedText = () => window.getSelection().toString();

getSelectedText(); // 'Lorem ipsum'
```

> [!NOTE]
>
> A more **advanced use case** of this functionality can be found in [the copy text to clipboard article](/js/s/copy-text-to-clipboard#using-document-exec-command-copy), used to select and copy text to the clipboard.
