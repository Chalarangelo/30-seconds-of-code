Mini SVG `data:` URI
====================

This tool converts SVGs into the most compact, compressible `data:` URI that SVG-supporting browsers tolerate. The results look like this (169 bytes):

```url
data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'
%3e%3cpath d='M22 38V51L32 32l19-19v12C44 26 43 10 38 0 52 15 49 39 22 38z'/%3e
%3c/svg%3e
```

Compare to the Base64 version (210 bytes):

```url
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH
ZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZD0iTTIyIDM4VjUxTDMyIDMybDE5LTE5djEyQzQ0IDI2ID
QzIDEwIDM4IDAgNTIgMTUgNDkgMzkgMjIgMzh6Ii8+PC9zdmc+
```

Or the URL-encoded version other tools produce (256 bytes):

```url
data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%
2F2000%2Fsvg%22%20viewBox%3D%220%200%2050%2050%22%3E%3Cpath%20d%3D%22M22%2038V51
L32%2032l19-19v12C44%2026%2043%2010%2038%200%2052%2015%2049%2039%2022%2038z%22%2
F%3E%3C%2Fsvg%3E
```

For a more realistic example, I inlined the icons from the [Open Iconic](https://useiconic.com/open) project into CSS files with the 3 above methods:

| Compression | Base64    | Basic %-encoding | `mini-svg-data-uri` |
|-------------|----------:|-----------------:|--------------------:|
| None        | 96.459 kB | 103.268 kB       | 76.583 kB           |
| `gzip -9`   | 17.902 kB | 13.780 kB        | 12.974 kB           |
| `brotli -Z` | 15.797 kB | 11.693 kB        | 10.976 kB           |

Roughly 6% smaller compressed, but don't write off the ≈20% uncompressed savings either. [Some browser caches decompress before store](https://blogs.msdn.microsoft.com/ieinternals/2014/10/21/compressing-the-web/), and parsing time/memory usage scale linearly with uncompressed filesize.


Usage
-----

```js
var svgToMiniDataURI = require('mini-svg-data-uri');

var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M22 38V51L32 32l19-19v12C44 26 43 10 38 0 52 15 49 39 22 38z"/></svg>';

var optimizedSVGDataURI = svgToMiniDataURI(svg);
// "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3e%3cpath d='M22 38V51L32 32l19-19v12C44 26 43 10 38 0 52 15 49 39 22 38z'/%3e%3c/svg%3e"
```

You can also [try it in your browser at RunKit](https://npm.runkit.com/mini-svg-data-uri).

### Warning

* This **does not optimize the SVG source file**. You’ll want [svgo](https://github.com/svg/svgo) or its brother [SVGOMG](https://jakearchibald.github.io/svgomg/) for that.

* The default output **does not work inside `srcset` attributes**. Use the `.toSrcset` method for that:

  ```js
  var srcsetExample = html`
  <picture>
    <source srcset="${svgToMiniDataURI.toSrcset(svg)}">
    <img src="${svgToMiniDataURI(svg)}">
  </picture>`;
  ```

* The resulting Data URI should be wrapped with double quotes: `url("…")`, `<img src="…">`, etc.

* This might change or break SVGs that use `"` in character data, like inside `<text>` or `aria-label` or something. Try curly quotes (`“”`)  or `&quot;` instead.


FAQ
---

### Don’t you need a `charset` in the MIME Type?

`charset` does nothing for Data URIs. The URI can only be the encoding of its parent file — it’s included in it!

### Why lowercase the URL-encoded hex pairs?

It compresses slightly better. No, really. Using the same files from earlier:

| Compression | Uppercase (`%AF`) | Lowercase (`%af`) |
|-------------|------------------:|------------------:|
| `gzip -9`   | 12.978 kB         | 12.974 kB         |
| `brotli -Z` | 10.988 kB         | 10.976 kB         |

I did say *slightly*.


Browser support
---------------

* Internet Explorer 9 and up, including Edge
* Firefox, Safari, Chrome, whatever else uses their engines
* Android WebKit 3+
* Opera Mini’s server-side Presto
