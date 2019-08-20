[![Build Status](https://img.shields.io/travis/css-modules/icss-replace-symbols/master.svg?style=flat-square)]()

# ICSS — Replace Symbols

Governs the way tokens are searched & replaced during the linking stage of ICSS loading.

This is broken into its own module in case the behaviour needs to be replicated in other PostCSS plugins (i.e. [CSS Modules Constants](https://github.com/css-modules/postcss-modules-constants))

## API

```js
import replaceSymbols from "icss-replace-symbols"
replaceSymbols(css, translations)
```

Where:

- `css` is the PostCSS tree you're working with
- `translations` is an JS object of `symbol: "replacement"` pairs, where all occurrences of `symbol` are replaced with `replacement`.

## Behaviour

A symbol is a string of alphanumeric, `-` or `_` characters. A replacement can be any string. They are replaced in the following places:

- In the value of a declaration, i.e. `color: my_symbol;` or `box-shadow: 0 0 blur spread shadow-color`
- In a media expression i.e. `@media small {}` or `@media screen and not-large {}`

## License

ISC

---
Glen Maddern, 2015.
