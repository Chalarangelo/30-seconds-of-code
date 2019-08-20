[![Build Status](https://travis-ci.org/css-modules/icss-utils.svg)](https://travis-ci.org/css-modules/icss-utils)

# ICSS Utils 

## replaceSymbols

Governs the way tokens are searched & replaced during the linking stage of ICSS loading.

This is broken into its own module in case the behaviour needs to be replicated in other PostCSS plugins
(i.e. [CSS Modules Values](https://github.com/css-modules/postcss-modules-values))

```js
import { replaceSymbols, replaceValueSymbols } from "icss-utils"
replaceSymbols(css, replacements)
replaceValueSymbols(string, replacements)
```

Where:

- `css` is the PostCSS tree you're working with
- `replacements` is an JS object of `symbol: "replacement"` pairs, where all occurrences of `symbol` are replaced with `replacement`.

A symbol is a string of alphanumeric, `-` or `_` characters. A replacement can be any string. They are replaced in the following places:

- In the value of a declaration, i.e. `color: my_symbol;` or `box-shadow: 0 0 blur spread shadow-color`
- In a media expression i.e. `@media small {}` or `@media screen and not-large {}`

## extractICSS(css, removeRules = true)

Extracts and remove (if removeRules is equal true) from PostCSS tree `:import` and `:export` statements.

```js
import postcss from 'postcss';
import { extractICSS } from 'icss-utils'

const css = postcss.parse(`
  :import(colors) {
    a: b;
  }
  :export {
    c: d;
  }
`)

extractICSS(css)
/*
  {
    icssImports: {
      colors: {
        a: 'b'
      }
    },
    icssExports: {
      c: 'd'
    }
  }
*/
```

## createICSSRules(icssImports, icssExports)

Converts icss imports and exports definitions to postcss ast

```js
createICSSRules({
  colors: {
    a: 'b'
  }
}, {
  c: 'd'
})
```

## License

ISC

---
Glen Maddern and Bogdan Chadkin, 2015.
