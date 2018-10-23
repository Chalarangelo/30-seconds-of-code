### Focus Within

The psuedo class `:focus-within` applies styles to a parent element if any child element gets focused. For example, an `input` element inside a `form` element.

#### HTML

```html
  <form>
    <label for="given_name">Given Name:</label>
    <input id="given_name" type="text">
    <br>
    <label for="family_name">Family Name:</label>
    <input id="family_name" type="text">
  </form>

```

#### CSS

```css
form {
  border: 3px solid #2d98da;
  color:  #000000;
  padding: 4px;
}

form:focus-within {
  background: #f7b731;
  color: #000000;
}

```

#### Demo

<!-- Leave this blank, the build script will generate the demo for you. -->

#### Explanation

<!-- Use a step-by-step (ordered) list if possible. Keep it concise. -->

#### Browser support

<span class="snippet__support-note">⚠️ Not supported in IE11 or the current version of Edge.</span>

<!-- Whenever possible, link a `caniuse` feature which allows the browser support percentage to be displayed.
If no link is provided, it defaults to 99+%. -->

- https://caniuse.com/#feat=css-focus-within

<!-- tags: (separate each by a comma) -->
