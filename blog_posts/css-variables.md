---
title: What are CSS variables and where can I use them?
type: question
tags: css,visual,layout
authors: chalarangelo
cover: blog_images/css-variables.jpg
excerpt: Learn how CSS custom properties (CSS variables) work and what you can use them for in your code and designs.
---

CSS variables (officially called CSS custom properties) behave much like variables in other languages, allowing you to define named variables that contain specific values to be reused within the CSS document. They are defined using the custom property notation, which always start with two dashes (e.g. `--my-color: black;`) and are accessed using the `var()` function (e.g. `color: var(--my-color);`). Custom properties are exceptionally useful for sharing styles between different elements and components (e.g. vertical rhythm, typography variables, color palettes etc.).

One of the most common examples of CSS variable usage is theming and dark mode, where CSS variables are used to create a shared palette across the whole website, then easily swap it out for a different one by applying a class to a common ancestor (e.g. the `<body>` element or a top-level container). This example helps demonstrate global variables defined in the `:root` element and cascading, as the top-level ancestor inherits values from the `:root` element:

```css
/* Global variables are defined in the :root element. */
:root {
  --bg-color: #fff;
  --main-color: #000;
  --secondary-color: #222;
}
/* Elements inherit variables from their parents. */
body {
  background-color: var(--bg-color);
  color: var(--main-color);
}
small {
  color: var(--secondary-color);
}
/* Elements can define their own values and variables, overriding inherited ones.*/
body.dark {
  --bg-color: #080808;
  --main-color: #fff;
  --secondary-color: #ccc;
}
```

Another rather useful example is defining shared customized styles for certain variants of an element, allowing the customization of whole trees of components without having to repeat styles over and over. This example demonstrates cascading even better than the previous one and also introduces the idea of sharing styles between different elements:

```css
.btn {
  --bg-color: #002299;
  --text-color: #fff;
  --highlight-color: #669900;

  background-color: var(--bg-color);
  color: var(--text-color);
}
/* --highlight-color is also available to the children of .btn */
.btn .highlight {
  color: var(--highlight-color);
}
/* .btn.danger .highlight will use the --highlight-color defined in .btn-danger */
.btn-danger {
  --bg-color: #dd4a68;
  --text-color: #000;
  --highlight-color: #990055;
}
```

Finally, keep in mind the following useful tips for working with CSS variables:

- You can define fallback values, by providing a second argument to the `var()` function (e.g. `var(--text-color, black);` will default to `black` if `--text-color` is not defined).
- CSS variables are case sensitive, so mind your capitalization. They can also be inlined in HTML like any other style (e.g. `<div style="--text-color: red">`).
- You can nest `var()` calls, using another variable as fallback (e.g. `var(--main-color, var(--other-color))`), pass them to other functions such as `calc()` or even assign one variable to another (e.g. `--text-color: var(--main-color);`).
