---
title: Creating HTML elements in JavaScript
type: story
tags: javascript,browser
expertise: beginner
author: chalarangelo
cover: blog_images/body-of-water.jpg
excerpt: Learn how to create HTML elements in JavaScript, by abstracting the creation logic into a function.
firstSeen: 2022-05-29T05:00:00-04:00
---

JavaScript's `Document.createElement()` method is used to create new HTML elements. Here's what that looks like in action:

```js
const root = document.body;

const newElement = document.createElement('div');
newElement.textContent = 'Hello World';

root.append(newElement);
```

As you can see, creating an element is easy. The tiresome part is having to set all of its attributes and then add it to the DOM. Worse even, creating multiple elements with the same set of attributes requires a lot of repetitive code.

Luckily, we can abstract element creation into a function. In fact, we can use objects to pass attributes to the element. Using `Object.entries()` we can iterate over the object and set the attributes. Here's what that looks like:

```js
const root = document.body;

const createElement = (el, parent, prepend = false) => {
  const { nodeName = 'div', ...attrs } = el;
  const element = document.createElement(nodeName);
  Object.entries(attrs).forEach(([attr, value]) => {
    element[attr] = value;
  });
  if (prepend) parent.prepend(element);
  else parent.append(element);
};

createElement(
  {
    nodeName: 'div',
    textContent: 'Hello world',
  },
  root
);

createElement(
  {
    nodeName: 'p',
    textContent: 'Hi',
  },
  root,
  true
);
```

That's pretty useful, but what happens if we have an HTML string we want to create an element from, instead? We have a [createElement snippet](/js/s/create-element) that does something along those lines. The only part that's missing is appending it to the parent element.
