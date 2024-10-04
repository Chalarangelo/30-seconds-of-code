---
title: How can I get all ancestors, parents, siblings, and children of an element?
shortTitle: Get element ancestors, parents, siblings, and children
language: javascript
tags: [browser]
cover: flowering-hills
excerpt: Learn how to traverse the DOM and find all elements related to a given element.
listed: true
dateModified: 2024-08-21
---

DOM traversal is a very useful skill to have if you're working with JavaScript and the browser. It allows you to navigate the DOM tree and find elements that are related to a given element. Let's explore how to use it to our advantage.

> [!NOTE]
>
> All the examples in this article make use of the `Node` interface, which is the base class for all nodes in the DOM, including elements, text nodes, and comments. Additionally, the functions return **arrays of elements**, not `NodeList` objects, to make them easier to work with.


## Get an element's children

Oddly enough, there are two ways to get an element's children: `Node.childNodes` and `Node.children`. The difference between the two is that `Node.childNodes` returns **all child nodes**, including text nodes, while `Node.children` returns **only element nodes**.

Depending on our needs, we can use either of these properties to get an element's children, so let's use an argument to decide which one to return.

```js
const getChildren = (el, includeTextNodes = false) =>
  includeTextNodes ? [...el.childNodes] : [...el.children];

getChildren(document.querySelector('ul'));
// [li, li, li]

getChildren(document.querySelector('ul'), true);
// [li, #text, li, #text, li, #text]
```

## Get an element's siblings

To get an element's **siblings**, we can use the `Node.parentNode` property to access the parent node and then use `Node.childNodes` to get all the children of the parent.

We can then convert the `NodeList` to an array using the spread operator (`...`). Finally, we can **filter out the element itself** from the list of children to get the siblings using `Array.prototype.filter()`.

```js
const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

getSiblings(document.querySelector('head'));
// ['body']
```

## Get an element's ancestors

To get all the **ancestors** of an element, we can use a `while` loop and the `Node.parentNode` property to **move up the ancestor tree** of the element. We can then use `Array.prototype.unshift()` to add each new ancestor to the start of the array.

```js
const getAncestors = el => {
  let ancestors = [];

  while (el) {
    ancestors.unshift(el);
    el = el.parentNode;
  }

  return ancestors;
};

getAncestors(document.querySelector('nav'));
// [document, html, body, header, nav]
```

## Matching related nodes

Building on top of the previous examples, we can create functions to **match related nodes** based on a given condition. For example, we can find all the ancestors of an element up until the element matched by a specified selector, or find the closest anchor element to a given node.

### Check if an element contains another element

To check if an element contains another element, we can simply use the `Node.contains()` method.

```js
const elementContains = (parent, child) =>
  parent !== child && parent.contains(child);

elementContains(
  document.querySelector('head'),
  document.querySelector('title')
);
// true

elementContains(
  document.querySelector('body'),
  document.querySelector('body')
);
// false
```

### Find closest matching node

Finding the closest matching node starting at the given `node` is often useful for event handling. We can use a `for` loop and `Node.parentNode` to **traverse the node tree upwards** from the given `node`. We then use `Element.matches()` to check if any given element node matches the provided `selector`.

```js
const findClosestMatchingNode = (node, selector) => {
  for (let n = node; n.parentNode; n = n.parentNode)
    if (n.matches && n.matches(selector)) return n;

  return null;
};

findClosestMatchingNode(
  document.querySelector('a'), 'body'
);
// body
```

### Get parents until element matches selector

To find all the ancestors of an element up until the element matched by the specified selector, we can use a `while` loop and `Node.parentNode` to **move up the ancestor tree** of the element. We can then use `Array.prototype.unshift()` to add each new ancestor to the start of the array and `Element.matches()` to check if the current element matches the specified `selector`.

```js
const getParentsUntil = (el, selector) => {
  let parents = [], _el = el.parentNode;

  while (_el && typeof _el.matches === 'function') {
    parents.unshift(_el);

    if (_el.matches(selector)) return parents;
    else _el = _el.parentNode;
  }

  return [];
};

getParentsUntil(document.querySelector('#home-link'), 'header');
// [header, nav, ul, li]
```
