---
title: intersectionObserverFactory
tags: browser,advanced
---

Creates a new `IntersectionObserver` instance for observing single or multiple elements with custom callback and options object.

- Define a callback that will run for each entry in the element array using `Array.prototype.map()` when threshold is crossed.
- Create an [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) instance by calling its constructor and return function that will initialize it.
- Omit the second argument `options` to use the default empty object.

```js
const intersectionHandler = (entries, observer) => {
  entries.forEach( entry => {
    if (entry.isIntersecting) {
      // handle the intersection here
      observer.unobserve(entry.target);
    }
  });
};

const createObserver = (callback, options = {}) => {
  const observer = new IntersectionObserver(callback, options);
  return (elements) => [...elements].forEach(element => observer.observe(element));
};
```

```js
const headerObserver = createObserver(intersectionHandler, {});
// create and store observer with empty options object in header variable
const buttonObserver = createObserver(intersectionHandler, {
  root: null,
  rootMargin: '10px',
  threshold: 0.5
});
// create new instance of observer with custom options object in button variable

headerObserver(headerElements);
buttonObserver(buttonElements);
//call the begin observing function passing in a single element or array of elements
```