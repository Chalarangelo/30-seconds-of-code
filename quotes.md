### Quotes

With more sophisticated CSS you can greatly enhance your website’s typography, an aspect that lots of people overlook. For instance, did you know that the quotation marks you are writing in your code are actually “primes” which are used for measurements and coordinates? When using “q” tags in HTML for quotations, you can automatically insert proper quotation marks (so-called smart quotes) before and after the quotation.

#### HTML

```html
<q> CSS is awesome! </q>
```

#### CSS

```css
q {
    quotes: "“" "”";
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__sinppet-quotes">
    <q> CSS is amazing! </q>
  </div>
</div>

<style>
q {
  quotes: "“" "”";
}
</style>

#### Explanation

1. `quotes: "“" "”";` quotes CSS property indicates how user agents should render quotation marks.

#### Browser support

<span class="snippet__support-note">94.5%<</span>

* http://smartquotesforsmartpeople.com/

<!-- tags: animation -->
