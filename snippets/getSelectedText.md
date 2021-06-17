---
title: getSelectedText
tags: browser,beginner
firstSeen: 2020-08-07T15:34:53+03:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Gets the currently selected text.

- Use `Window.getSelection()` and `Selection.toString()` to get the currently selected text.

```js
const getSelectedText = () => window.getSelection().toString();
```

```js
getSelectedText(); // 'Lorem ipsum'
```
