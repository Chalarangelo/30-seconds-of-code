---
title: oncontextmenu
tags: event attribute, dom, browser, beginner
firstSeen: 2021-06-13T05:00:00-04:00
---

This event enables or disables the browser's contextmenu to appear when you press `right click` in browser.

- Create a `<body>` element , add `oncontextmenu` event in the opening tag.
- Use `oncontextmenu = "return false" ` to disable the browser's context menu.
- Use `document.oncontextmenu` to write a function that `return false`.
- Finally, test it in your browser, you might see it works.

```js
document.oncontextmenu = function(e) {
         return false;
} // 'disable' contextmenu
```

- If you want it to enable to appear, then you can simply change `return true` instead of `return false`.

```js
document.oncontextmenu = function(e) {
         return true;
} // 'enable' contextmenu
```

- You can use `addEventListener` event to disable `contextmenu` in content.
- Use `DOM` like `document.getElementById()` method to select `element` content.
- In the event listener, use `event.preventDefault()` method to `disable` the default action that belongs to the event.

```js
const noContext = document.getElementById('noContextMenu');
      noContext.addEventListener('contextmenu', e => {
      e.preventDefault();
}); // 'disable' contextmenu on selected element
```
