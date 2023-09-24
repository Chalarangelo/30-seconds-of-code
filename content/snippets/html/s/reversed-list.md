---
title: "Tip: Create a descending list of numbered items"
shortTitle: Descending list
type: tip
language: html
tags: [content]
author: chalarangelo
cover: ancient-greek-building
excerpt: Did you know there's an easy way to create a descending list of numbered items with pure HTML? Learn how with this handy tip.
dateModified: 2021-06-22
---

Did you know there's an easy way to create a descending list of numbered items with pure HTML? The only thing you'll need is the `reversed` attribute. This boolean attribute is specific to `ol` elements and specifies that the list's elements are in reverse order (i.e. numbered from high to low).

```html
<ol reversed>
  <li>My third favorite</li>
  <li>My second favorite</li>
  <li>My absolute favorite</li>
</ol>
<!--
  3. My third favorite
  2. My second favorite
  1. My absolute favorite
-->
```

Additionally, you can combine `reversed` with the `start` attribute which is an integer specifying the initial value of the list counter. For example, if you wanted to display the numbers 6 through 4 in a reversed 3-item list, you would simply add `start="6"`.
