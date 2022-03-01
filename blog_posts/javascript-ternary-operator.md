---
title: What is the ternary operator and how do I use it?
type: question
tags: javascript,condition
expertise: intermediate
author: maciv
cover: blog_images/red-succulent.jpg
excerpt: Learn everything you need to know about the conditional (ternary) operator and how to use it in JavaScript.
firstSeen: 2020-09-01T01:53:34+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

JavaScript's ternary operator (`?:`), also called the conditional operator, is used to replace a conditional statement, most commonly an assignment. For example:

```js
// Code using if...else
let x;
if (someCondition) {
  x = 10;
} else {
  x = 20;
}

// Same result using the ternary operator
const x = someCondition ? 10 : 20;
```

As you can tell from the above example, the ternary operator is shorter than using an `if...else` statement and allows us to assign the resulting value to a variable, provided the condition is pretty much a one-liner. A useful result of this is that we can use the ternary operator for arrow functions with implicit returns:

```js
// Code using if...else
const conditionalX = (condition, x) => {
  if (condition) return x;
  else return x + 5;
}

// Same result using the ternary operator
const conditionalX = (condition, x) => condition ? x : x + 5;
```

Note, however, that nesting ternary expressions is usually discouraged with ESLint even going as far as having a [dedicated rule](https://eslint.org/docs/rules/no-nested-ternary) for this kind of situation. Additionally, the ternary operator is a favorite of React developers, as it allows for easy conditional rendering in JSX code:

```jsx
const ItemListTitle = (count) => (
  <h3>Item list{ count ? (<span> - {count} items</span>) : '(Empty)'}<h3>
);
```

Finally, you might be wondering why it's called the "ternary" operator. The word "ternary" is based on the [n-ary word setup](https://en.wikipedia.org/wiki/Arity) and means an operator with three operands (condition, expression to execute if truthy, expression to execute if falsy).
