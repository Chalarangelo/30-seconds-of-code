---
title: What are CSS pseudo-classes?
type: question
tags: css,webdev
authors: chalarangelo
cover: blog_images/orange-flower.jpg
excerpt: Learn how to use CSS pseudo-classes to style an element based on changes to its state.
---

CSS pseudo-classes provide a way to style elements, based on changes to their state. For example, `:hover` can be used to apply additional styles to an element when the user's pointer hovers over it.

Pseudo-classes let you apply styles to elements in relation to the content of the document tree (e.g. `:first-child`), external factors such as the history of the navigator (e.g. `:visited`), the status of their content (e.g. `:checked`) or the position of the mouse (e.g. `:hover`).

### Commonly used pseudo-classes

Below is a list of the top 5 most commonly used pseudo-classes and their usage. This list is by no means complete; you should always refer to relevant documentation from authoritative sources, such as [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) for more information.

- `:hover`, `:focus` and `:active` are used to provide feedback for user interaction (e.g. changing a button's color on hover)
- `:link` and `:visited` are useful for styling links based on navigation history (e.g. changing the color of visited links)
- `:first-child`, `:last-child`, `:nth-child()` and `nth-last-child()` are useful when working with collections of elements
- `:not()` is used to match everything except the given selector and can be useful in styling hard to select elements
- `:lang()` allows you to apply special styles based on the language of the document and is useful for multilingual websites

**Image credit:** [Tj Holowaychuk](https://unsplash.com/@tjholowaychuk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
