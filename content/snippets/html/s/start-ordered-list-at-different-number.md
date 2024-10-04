---
title: Start your ordered HTML lists at a different number
shortTitle: Ordered lists starting number
language: html
tags: [content]
cover: neon-desk-1
excerpt: Did you know you can customize the starting number of your ordered lists? Learn how with this quick tip.
listed: true
dateModified: 2024-05-10
---

Ordered lists in HTML start at the number `1` by default. But did you know you can customize the starting number of your ordered lists? This might feel like an uncommon need, yet I'm sure I've had a use for it at some point in the past.

A lesser-known attribute of the `<ol>` tag is the `start` attribute. This attribute allows you to specify the **number at which the list should start**.

```html
<ol start="4">
  <li>Lorem</li>
  <li>Ipsum</li>
  <li>
    <ol start="12">
      <li>Dolor</li>
      <li>Sit</li>
    </ol>
  </li>
  <li>Amet</li>
  <li>Consectetur</li>
</ol>
```

```css
ol ol {
  list-style-type: lower-roman;
}
```

https://codepen.io/chalarangelo/pen/GRaRqmZ

As you can see, you can use it for ordered lists, as well as **nested order lists**. It even works with every `list-style-type` you can think of, including **Roman numerals** and **alphabetic characters**.
