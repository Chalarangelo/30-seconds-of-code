---
title: newCSSRule
tags: dom,html,begginer
---

Creates a new CSS rule.

- Creates new style element.
- Appends the created style element to head.
- Defines the type of element and appends CSS rules to it.

```js
const newCSSRule = rule => {
  let css = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(css);
  css.type = 'text/css';
  css.appendChild(document.createTextNode(rule));
}
```

```js
newCSSRule('body { background-color: #000 }'); // <style type="text/css">body { background-color: #000 }</style>
```
