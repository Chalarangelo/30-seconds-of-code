---
title: Lobotomized Owl Selector  
tags: layout,beginner  
---

Sets an automatically inherited margin for all elements that follow other elements in the document.

```html
<div>
  <div>Parent 01</div>
  <div>Parent 02
    <div>Child 01</div>
    <div>Child 02</div>
  </div>
  <div>Parent 03</div>
</div>
```

```css
* + * {
  margin-top: 1.5em;
}
```

#### Explanation

- In this example, all elements in the flow of the document that follow other elements will receive `margin-top: 1.5em`.
- This example assumes that the paragraphs' `font-size` is 1em and its `line-height` is 1.5.
_Note: You can read [this article](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/_) for a more detailed explanation._

#### Browser support
