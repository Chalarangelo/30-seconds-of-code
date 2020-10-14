---
title: getVisibleChildNodes
tags: javascript,browser
---

Returns an array of child nodes that are visible in the browser

- Pass in an element
- Get an array of all visible child nodes (e.g. text) and elements
- Strips out invisible nodes (e.g. comments and all-whitespace text)

```js
const getVisibleChildNodes = el =>
  {
    if (!el instanceof Node) {
      return false;
    } else {
      return Array.from(el.childNodes)
        .filter(node => node.nodeName != '#comment')
        .filter(node => {
          if (node.nodeName != '#text'){
            return node;
          } else if (node.wholeText.replace(/\s*/g,"") != "") {
            return node;
          }
        });
    }
  };
```

```js
functionName(document.querySelector('p')); // 'sampleOutput'
```
