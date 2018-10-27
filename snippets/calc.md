### Calc()

The function calc() allows to define CSS values with the use of mathematical expressions, the value adopted for the property is the result of a mathematical expression.

#### HTML

```html
<div class="box-example"></div>
```

#### CSS

```css
.box-example {
  height: 280px;
  background: #222 url('https://image.ibb.co/fUL9nS/wolf.png') no-repeat;
  background-position: calc(100% - 20px) calc(100% - 20px);
}
```

#### Demo

If you want to align a background-image from right and bottom wasn't possible with just straight length values.
So now it's possible using calc():

<div class="snippet-demo">
  <div class="snippet-demo__calc">Background-image in the right/bottom</div>
</div>

<style>
.snippet-demo__calc {
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #222 url('https://image.ibb.co/fUL9nS/wolf.png') no-repeat;
  background-position: calc(100% - 20px) calc(100% - 40px);
}
</style>

#### Explanation

1. It allows addition, subtraction, multiplication and division.
2. Can use different units (pixel and percent together, for example) for each value in your expression.
3. It is permitted to nest calc() functions.
4. It can be used in any property that `<length>`, `<frequency>`, `<angle>`, `<time>`, `<number>`, `<color>`, or `<integer>` is allowed, like width, height, font-size, top, left, etc.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=calc

<!-- tags: other -->
