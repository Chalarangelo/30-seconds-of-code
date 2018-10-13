### Drop cap

Makes the first letter in the first paragraph bigger than the rest of the text,
and below the first line of said first paragraph. Often used to signify the
beginning of a new section.

#### HTML

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo
  ligula quis tincidunt cursus. Integer consectetur tempor ex eget hendrerit.
  Cras facilisis sodales odio nec maximus. Pellentesque lacinia convallis libero,
  rhoncus tincidunt ante dictum at. Nullam facilisis lectus tellus, sit amet
  congue erat sodales commodo. Donec magna erat, imperdiet non odio sed, sodales
  tempus magna. Integer vitae orci lectus. Nullam consectetur orci at pellentesque
  efficitur.
</p>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo
  ligula quis tincidunt cursus. Integer consectetur tempor ex eget hendrerit.
  Cras facilisis sodales odio nec maximus. Pellentesque lacinia convallis libero,
  rhoncus tincidunt ante dictum at.
</p>
```

#### CSS

```css
p:first-child::first-letter {
  color: blue;
  float: left;
  margin: 0 12px 3px 0;
  font-size: 4rem;
  font-weight: bold;
  line-height: 1;
}
```

#### Demo

#### Explanation

1. The `::first-letter` pseudo selector selects the first "letter" of text
   within an element (in this case, the `<p>` element). Coupled with the use of
   `:first-child` selector before `::first-letter` ensures that we only affect
   the very first paragraph instead of all paragraphs.

2. `float: left` is applied so that it appears "dropped" within the paragraph.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=first-letter

<!-- tags: visual -->
