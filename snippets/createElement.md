### createElement

Creates an element from a string.

Use `document.createElement()` to create a new element. Set its `innerHTML`
to the string supplied as the argument. Use `ParentNode.firstElementChild` to
return the element version of the string.

```js
const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
};
```

```js
const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className); // 'container'
```
