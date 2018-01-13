### observeMutations

Runs the provided callback for each mutation on the specified element.

Use a [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to observe mutations on the given element.
Use `Array.forEach()` to run the callback for each mutation that is observed.
Omit the third argument, `options`, to use the default [options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit) (all `true`).

```js
const observeMutations = (element, callback, options) => new MutationObserver(mutations => mutations.forEach(m => callback(m))).observe(element, Object.assign(
  {
    childList: true,
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    subtree: true
  }, options));
```

```js
observeMutations(document, console.log); // Logs all mutations that happen on the page
```
