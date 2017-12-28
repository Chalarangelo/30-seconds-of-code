### setStyle

Sets the value of a CSS rule for the specified element.

Use `element.style` to set the value of the CSS rule for the specified element to `value`.

```js
const setStyle = (el, ruleName, value) => el.style[ruleName] = value;
```

```js
setStyle(document.querySelector('p'), 'font-size', '20px') // The first <p> element on the page will have a font-size of 20px
```
