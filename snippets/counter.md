### Counter

Counters are, in essence, variables maintained by CSS whose values may be incremented by CSS rules to track how many times they're used.

#### HTML

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

#### CSS

```css
ul {
  counter-reset: counter;
}

li::before {
  counter-increment: counter;
  content: counters(counter, '.') ' ';
}
```

#### Demo

#### Explanation

You can create a ordered list using any type of HTML.

1. `counter-reset` Initializes a counter, the value is the name of the counter. By default, the counter starts at 0. This property can also be used to change its value to any specific number.

2. `counter-increment` Used in element that will be countable. Once `counter-reset` initialized, a counter's value can be increased or decreased.

3. `counter(name, style)` Displays the value of a section counter. Generally used in a `content` property. This function can receive two parameters, the first as the name of the counter and the second one can be `decimal` or `upper-roman` (`decimal` by default).

4. `counters(counter, string, style)` Displays the value of a section counter. Generally used in a `content` property. This function can receive three parameters, the first as the name of the counter, the second one you can include a string which comes after the counter and the third one can be `decimal` or `upper-roman` (`decimal` by default).

5. A CSS counter can be especially useful for making outlined lists, because a new instance of the counter is automatically created in child elements. Using the `counters()` function, separating text can be inserted between different levels of nested counters.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=css-counters

<!-- tags: visual, other -->
