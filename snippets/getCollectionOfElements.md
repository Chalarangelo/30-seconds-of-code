---
title: getCollectionOfElements
tags: array,beginner
---

Manipulate each `div` child inside element with specified ID.

- Gets parent element by ID.
- If ID exists each `div` child is added to array `divElements`.
- Iterates through the array giving you edit access to each one sequentially.

```js
var obj = document.getElementbyId('id');
if (obj) {
  var divElements = obj.getElementsByTagName('div');
  if (divElements.length > 0) {
    for (var i = 0; i < divElements.length; i += 1) {
      // do stuff with divElements[i] etc
    }
  }
}
```
