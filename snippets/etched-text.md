### Etched text

Creates an effect where text appears to be "etched" or engraved into the background.

#### HTML

```html
<p class="etched-text">I appear etched into the background.</p>
```

#### CSS

```css
.etched-text {
  text-shadow: 0 2px white;
  font-size: 1.5rem;
  font-weight: bold;
  color: #b8bec5;
}
```

#### Demo

#### Explanation

`text-shadow: 0 2px white` creates a white shadow offset `0px` horizontally and `2px` vertically
from the origin position.

The background must be darker than the shadow for the effect to work.

The text color should be slightly faded to make it look like it's engraved/carved out
of the background.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=css-textshadow

<!-- tags: visual -->
