---
title: addListAria
tags: accessibility,intermediate
---

Changing css `display` values can remove the semantic meaning of lists and list
items. This function re-adds the default roles for better accessibility

- Provide a `ul` or `ol` to add roles back to
- Optionally set `recursive` to false to limit this function to the list
provided and its first-level children

```js
const addListAria = (list, recursive = true) =>
  {
    if (!list.nodeName === 'UL' && !list.nodeName === 'OL') {
      return;
    }

    list.setAttribute('role', 'list');
    list.querySelectorAll('li, ul, ol').forEach(item => {
      if (item.closest('ul, ol') === list || recursive) {
        if (item.nodeName === 'LI') {
          item.setAttribute('role', 'listitem');
        } else {
          item.setAttribute('role', 'list');
        }
      }
    });
  }
```

```js
addListAria(document.querySelector('ul'));
```
