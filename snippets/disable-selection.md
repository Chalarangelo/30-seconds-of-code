### Disable Selection

Makes the content unselectable.

#### HTML

```html
<div>
  <p class="unselectable"> You can't select me! </p>
  <p> You can select me!! </p>
</div>
```

#### CSS

```css
.unselectable {
  user-select: none;
}
```

#### Demo

<!-- You must create a `snippet-demo` parent block and use it as a namespace with BEM syntax. -->

<div class="snippet-demo">
  <p class="snippet-demo__disable-selection">You can't select me!</p>
  <p>You can select me!!</p>
</div>

<!-- Add your style rules here. -->

<style>
.snippet-demo__disable-selection{
  user-select: none;
}
</style>

#### Explanation
`user-select: none` defines that the text cannot be selected. 
#### Browser support

<!-- Use the checkmark or the warning emoji, see the existing snippets. -->

<span class="snippet__support-note">⚠️ Requires prefixes for full support and is not actually in any specification.</span>

<!-- Whenever possible, link a `caniuse` feature which allows the browser support percentage to be displayed.
If no link is provided, it defaults to 99+%. -->

* https://caniuse.com/#search=user-select
