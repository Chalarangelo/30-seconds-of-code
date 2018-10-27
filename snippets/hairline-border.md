### Hairline border

Gives an element a border equal to 1 native device pixel in width, which can look
very sharp and crisp.

#### HTML

```html
<div class="hairline-border">text</div>
```

#### CSS

```css
.hairline-border {
  box-shadow: 0 0 0 1px;
}

@media (min-resolution: 2dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.5px;
  }
}

@media (min-resolution: 3dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.33333333px;
  }
}

@media (min-resolution: 4dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.25px;
  }
}
```

#### Demo

#### Explanation

1. `box-shadow`, when only using spread, adds a pseudo-border which can use subpixels\*.
2. Use `@media (min-resolution: ...)` to check the device pixel ratio (`1dppx` equals 96 DPI),
   setting the spread of the `box-shadow` equal to `1 / dppx`.

#### Browser Support

<span class="snippet__support-note">⚠️ Needs alternate syntax and JavaScript user agent checking for full support.</span>

- https://caniuse.com/#feat=css-boxshadow
- https://caniuse.com/#feat=css-media-resolution

<hr>

\*Chrome does not support subpixel values on `border`. Safari does not support subpixel values on `box-shadow`. Firefox supports subpixel values on both.

<!-- tags: visual -->
