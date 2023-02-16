---
title: The case for trailing commas in JavaScript
shortTitle: Trailing commas in JavaScript
type: story
tags: javascript,webdev
author: chalarangelo
cover: contemporary-desk
excerpt: Trailing commas are not without controversy. Here's why I think you should use them.
firstSeen: 2023-03-12T05:00:00-04:00
---

JavaScript's syntactic features are notorious for sparking debates among developers, with semicolons and tabs vs. spaces being the most common examples. However, trailing commas are a feature that isn't discussed as much, even though I believe there's merit to using them.

JavaScript has allowed trailing commas in array and object literals since the **ES5 specification**. Adding a trailing comma is completely valid and will not cause any errors or alter the code in any way. For example, the two statements below are exactly the same:

```js
[1, 2, 3]; // [1, 2, 3]
[1, 2, 3,]; // [1, 2, 3]
```

This example might look strange, and indeed it's not necessarily the prettiest sight. Where trailing commas start to feel more useful is when working with multiline arrays or objects. For example, consider the following object:

```js
const obj = {
  a: 1,
  b: 2,
  c: 3
};
```

There's nothing wrong with this code snippet, except if we want to make a change to the object. In that case, we will have to add a comma to the last line, before adding a new property. A similar issue arises if we reorder the properties. In that case, a comma might end up missing from the line that was previously last. Finally, if we want consistency, removing the last property will also require the removal of the comma from the line before it.

None of these scenarios are uncommon, as you are well aware. Even more so, these start becoming a little more annoying when you factor in **version control**. A single property addition will require two lines to be altered. This can make diffs harder to read and review, and can also cause merge conflicts more often than you think.

I think it's clear by now that trailing commas can improve **code readability** and increase **diff clarity**. This is not a new idea and has been suggested by popular style guides for years, especially in multiline array and object literals.

As with most things, ESLint has a rule for this. The `comma-dangle` rule can be used to enforce trailing commas in both single-line and multiline situations. You can even go further and customize it for different types of literals, such as arrays, objects, functions, and imports/exports. My personal recommendation is to **enforce trailing commas only for multiline literals**:

```js
{
  "rules": {
    // Other rules ...
    "comma-dangle": ["error", "always-multiline"]
  }
}
```

This way you get all the benefits of trailing commas, without having to look at the potentially confusing trailing commas in single-line literals. As a final note, bear in mind that style decisions should always be discussed with your team and agreed upon.
