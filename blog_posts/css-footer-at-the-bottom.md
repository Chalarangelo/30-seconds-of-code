---
title: How can I ensure the footer is always at the bottom of the page?
shortTitle: Footer at the bottom
type: question
tags: css,layout
expertise: beginner
author: chalarangelo
cover: blog_images/flower-shape-sunset.jpg
excerpt: Make sure the footer stays at the bottom of the page, instead of floating up when the content is too short.
firstSeen: 2022-10-30T05:00:00-04:00
---

Preventing the footer from floating up the page is important when trying to create a polished website. Pages with **short content** can run into this issue, but it's easy to fix with a few lines of CSS. Assuming your HTML looks something like the snippet below, here are two modern ways to ensure the footer is always at the bottom of the page:

```html
<body>
  <main><!-- Main content --></main>
  <footer><!-- Footer content --></footer>
</body>
```

### Using Flexbox

You can use flexbox to ensure that the footer is always at the bottom of the page. This is done by setting the giving the `body` element `min-height: 100vh`, `display: flex` and `flex-direction: column`. Then, give the `footer` element a `margin-top: auto` to make its margin fill the remaining space between it and its previous sibling. Note that this technique will not stretch the previous sibling, but rather **push the footer to the bottom of the page**.


```css
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

footer {
  margin-top: auto;
}
```

### Using Grid

You can also use grid in a very similar fashion. Simply swap `display: flex` for `display: grid` and `flex-direction: column` for `grid-template-rows: 1fr auto` in the `body` element. No additional attributes are needed for the `footer` element. In this case, the `fr` unit is leveraged to stretch the `main` element to **fill the remaining space**.

```css
body {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
}
```

### Notes

As you can see, both techniques are straightforward to implement. Depending on your needs one might be more suitable than the other. Generally speaking, grid is more flexible in most cases and can help if you have more complex layouts, which can include a header or sidebar.
