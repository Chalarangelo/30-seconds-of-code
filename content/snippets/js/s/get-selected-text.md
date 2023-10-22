---
title: Get selected text
type: snippet
language: javascript
tags: [browser]
cover: white-tablet-2
dateModified: 2020-10-19
---

Gets the currently selected text.

- Use `Window.getSelection()` and `Selection.toString()` to get the currently selected text.

```js
const getSelectedText = () => window.getSelection().toString();
```

```js
getSelectedText(); // 'Lorem ipsum'
```
