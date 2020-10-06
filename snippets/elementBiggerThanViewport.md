---
title: elementBiggerThanViewport
tags: beginner
---

Get elements in html bigger than the viewport width, useful when you're looking for what is causing the horizontal scroll

- Returns all elements that are bigger than the viewport 

```js
const getElementsBiggerThanViewport = () =>
  let docWidth = document.documentElement.offsetWidth;

  [].forEach.call(
    document.querySelectorAll('*'),
    (el) => {
      if (el.offsetWidth > docWidth) console.log('el', el);
    }
  );
  
```

```js
getElementsBiggerThanViewport(); // <section id="about">...</section>
```


