---
title: Render DOM elements with JavaScript
shortTitle: Render DOM elements
language: javascript
tags: [browser,recursion]
cover: standing-stones
excerpt: Ever wondered how React's rendering works? Here's a simple JavaScript function that renders a DOM tree in a specified container.
listed: true
dateModified: 2024-07-06
---

Have you ever wondered how React's rendering works under the hood? How about implementing a **simple version** of it in vanilla JavaScript yourself? Luckily, this is not as complicated as it might sound. Let's dive in!

> [!CAUTION]
>
> This implementation is for **demonstration purposes only** and lacks many features and optimizations present in React or Preact. If you only need a simple way to render a DOM tree, you might want to look into a full-fledged package.

## Representing a DOM tree

In order to render a **DOM tree** in a specified container, you can create a function that takes an object representing the DOM tree and the container element. This function will **recursively** create and append DOM elements based on the given tree. But before we get to that, we need to define how we'll represent the DOM tree.

React's virtual DOM **representation** is similar to the object structure we'll be using. Each element is an object with a `type` property representing the element's **tag name**, and a `props` object containing the element's **attributes, event listeners, and children**.

```js
const myElement = {
  type: 'button',
  props: {
    type: 'button',
    className: 'btn',
    onClick: () => alert('Clicked'),
    children: [{ props: { nodeValue: 'Click me' } }]
  }
};
// Equivalent to:
//  <button
//    type="button"
//    class="btn"
//    onClick="alert('Clicked')"
//  >
//    Click me
//  </button>
```

The special case of **text elements** is represented by an object without a `type` property, only containing a `props` object with a `nodeValue` property.

Additionally, some special prop rules apply to props named a certain way. For example, **event listeners** are prefixed with `'on'`, and **children** are stored in an array under the `'children'` key. As we're using the `Element` conventions, other attributes might have different names than in HTML (e.g., `className` instead of `class`).

## Rendering the DOM tree

Having a robust representation of the DOM tree, we can now create the function that renders the given tree in the specified container. The function will destructure the first argument into `type` and `props`, and use `type` to determine if the given element is a text element.

Based on the element's `type`, it will create the DOM element using either `Document.createTextNode()` or `Document.createElement()`. The difference between text and element nodes is that text nodes don't have a `type` property.

In order to process the rest of the `props`, we'll need two **helper functions**: one to check if a property is an event listener and another to check if it's an attribute. Using simple heuristics, we can determine listeners by checking if the property starts with `'on'` and attributes by checking if the property is not a listener or `'children'`.

Having set up these rules, we can then iterate over `props`, using `Object.keys()`, to add attributes to the DOM element and set event listeners as necessary. If the element has children, we'll use **recursion** to render them. Finally, we'll append the DOM element to the specified `container` using `Node.appendChild()`.


```js
const renderElement = ({ type, props = {} }, container) => {
  const isTextElement = !type;
  const element = isTextElement
    ? document.createTextNode('')
    : document.createElement(type);

  const isListener = p => p.startsWith('on');
  const isAttribute = p => !isListener(p) && p !== 'children';

  Object.keys(props).forEach(p => {
    if (isAttribute(p)) element[p] = props[p];
    if (!isTextElement && isListener(p))
      element.addEventListener(p.toLowerCase().slice(2), props[p]);
  });

  if (!isTextElement && props.children && props.children.length)
    props.children.forEach(childElement =>
      renderElement(childElement, element)
    );

  container.appendChild(element);
};

const myElement = {
  type: 'button',
  props: {
    type: 'button',
    className: 'btn',
    onClick: () => alert('Clicked'),
    children: [{ props: { nodeValue: 'Click me' } }]
  }
};

renderElement(myElement, document.body);
// Renders our <button> element in the body of the document
```

And that's it! You've just created a simple function that renders a DOM tree in a specified container. This is a great exercise to understand how React's rendering works under the hood and to get a better grasp of how to manipulate the DOM with JavaScript. You can now experiment with different elements and attributes to see how they render in the browser, or extend the function with additional features to suit your needs. Enjoy!
