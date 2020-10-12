---
title: pageTransition
tags: browser, transition, beginner
---

Adds a delay in navigation links, to load the transition

- When clicked on a link, apply transition effect.
- After the transition is done, navigate to the respective href.


```js
const pageTransition = (anchorLinks, delay, callback)=>{
  anchorLinks.forEach(link=>link.addEventListener("click", e=>{
    e.preventDefault();
    callback();
    setTimeout(()=>window.location.href=e.target.href, delay);
  }));
};
```

```js
const anchorLinks = document.querySelectorAll(".applyTransition"); // select all anchor tags with "applyTransition" class
const callback = ()=>{console.log("I will add transition styles")}; // probably add some CSS styles as the transition effect
const delay = 2000;

pageTransition(anchorLinks, delay, callback); // runs the callback and waits for "delay" miliseconds before actually routing to the href.
```
