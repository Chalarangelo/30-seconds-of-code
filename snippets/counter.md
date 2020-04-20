---
title: Counter
tags: visual,advanced
---

Counters are, in essence, variables maintained by CSS whose values may be incremented by CSS rules to track how many times they're used.

```html
<ul>
  <li>List item</li>
  <li>List item</li>
  <li>
    List item
    <ul>
      <li>List item</li>
      <li>List item</li>
      <li>List item</li>
    </ul>
  </li>
</ul>
```

```css
ul {
  counter-reset: counter;
}

li:before {
  counter-increment: counter;
  content: counters(counter, '.') ' ';
}
```

#### Explanation

You can create a ordered list using any type of HTML.

1. `counter-reset` is used to initialize a counter, the name of which is the value of the attribute. By default, the counter starts at `0`. This property can also be used to change its value to any specific number.
2. `counter-increment` is used for an element that will be countable. Once `counter-reset` is initialized, a counter's value can be increased or decreased.
3. `counter(name, style)` displays the value of a section counter. Generally used with the `content` property. This function can receive two parameters, the first being the name of the counter and the second one either `decimal` or `upper-roman` (`decimal` by default).
4. `counters(counter, string, style)` displays the value of a section counter. Generally used with the `content` property. This function can receive three parameters, the first as the name of the counter, the second one you can include a string which comes after the counter and the third one can be `decimal` or `upper-roman` (`decimal` by default).
5. A CSS counter can be especially useful for making outlined lists, because a new instance of the counter is automatically created in child elements. Using the `counters()` function, separating text can be inserted between different levels of nested counters.

#### Browser support
