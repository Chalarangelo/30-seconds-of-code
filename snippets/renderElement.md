---
title: renderElement
tags: browser,recursion,advanced
---

Renders the given DOM tree in the specified DOM element.

- Destructure the first argument into `type` and `props`, use `type` to determine if the given element is a text element.
- Based on the element's `type`, use either `Document.createTextNode()` or `Document.createElement()` to create the DOM element.
- Use `Object.keys(props`, adding attributes to the DOM element and setting event listeners, as necessary.
- Use recursion to render `props.children`, if any.
- Finally, use `Node.appendChild()` to append the DOM element to the specified `container`.

```js
const renderElement = ({ type, props = {} }, container) => {
  const isTextElement = !type;
  const element = isTextElement
    ? document.createTextNode('')
    : document.createElement(type);

  const isListener = p => p.startsWith('on');
  const isAttribute = p => !isListener(p) && p !== 'children';

  Object.keys(props).forEach(p => {
    if(isAttribute(p)) element[p] = props[p];
    if(!isTextElement && isListener(p))
      element.addEventListener(p.toLowerCase().slice(2), props[p]);
  });

  if(!isTextElement && props.children && props.children.length)
    props.children.forEach(childElement => renderElement(childElement, element));

  container.appendChild(element);
}
```

```js
const myElement = {
  type: 'button',
  props: {
    type: 'button',
    className: 'btn',
    onClick: () => alert('Clicked'),
    children: [
      { props: { nodeValue: 'Click me' } }
    ]
  }
};

renderElement(
  myElement,
  document.body
);
```
