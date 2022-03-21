---
title: "Tip: Create your own query selector shorthand"
shortTitle: Query selector shorthand
type: tip
tags: javascript,browser
expertise: intermediate
author: chalarangelo
cover: blog_images/pineapple-at-work.jpg
excerpt: Ever wanted to create your own jquery-like query selector shorthand? Here's how!
firstSeen: 2021-02-08T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Most of us are familiar with jquery and probably quite a few of us are familiar with the Chrome console's `$` and `$$` shorthands for query selectors. I recently figured out a way to replicate these shorthands in my code, using `Document.querySelector()`, `Document.querySelectorAll()` and `Function.prototype.bind()`. Here's how to do it, just make sure you don't mix them up with jquery if you are still using it:

```js
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const mainContent = $('.main-content');
const externalLinks = $$('a[target="_blank"]');
```
