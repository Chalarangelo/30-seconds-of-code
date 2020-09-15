---
title: getSelectedText
tags: browser,beginner
---

Get the currently selected text.

- Use `window.getSelection()` and `Selection.prototype.toString()` to get the currently selected text.

```js
const getSelectedText = () => window.getSelection().toString();
```

```js
getSelectedText(); // 'Lorem ipsum'
```
