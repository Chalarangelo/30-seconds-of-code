### Calc()

The function calc() allows to define CSS values with the use of mathematical expressions, the value adopted for the property is the result of a mathematical expression.

#### HTML

```html
<div class="box-example"></div>
```

#### CSS

```css
.box-example {
  width: calc(100% - 60px);
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__calc">Box Example</div>
</div>

<style>
.snippet-demo__calc {
  width: calc(100% - 60px);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #666;
  color: #fff;
}
</style>

#### Explanation

1. It allows addition, subtraction, multiplication and division.
2. Can use different units (pixel and percent together, for example) for each value in your expression.
3. It is permitted to nest calc() functions.
4. It can be used in any property that `<length>`, `<frequency>`, `<angle>`, `<time>`, `<number>`, `<color>`, or `<integer>` is allowed, like width, height, font-size, top, left, etc.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

* https://caniuse.com/#feat=calc

<!-- tags: other -->
