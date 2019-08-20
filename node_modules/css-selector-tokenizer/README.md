# CSS Modules: CSS selector Tokenizer

Parses and stringifies CSS selectors.

``` js
import Tokenizer from "css-selector-tokenizer";

let input = "a#content.active > div::first-line [data-content], a:not(:visited)";

Tokenizer.parse(input); // === expected
let expected = {
  type: "selectors",
  nodes: [
    {
      type: "selector",
      nodes: [
        { type: "element", name: "a" },
        { type: "id", name: "content" },
        { type: "class", name: "active" },
        { type: "operator", operator: ">", before: " ", after: " " },
        { type: "element", name: "div" },
        { type: "pseudo-element", name: "first-line" },
        { type: "spacing", value: " " },
        { type: "attribute", content: "data-content" },
      ]
    },
    {
      type: "selector",
      nodes: [
        { type: "element", name: "a" },
        { type: "nested-pseudo-class", name: "not", nodes: [
          {
            type: "selector",
            nodes: [
              { type: "pseudo-class", name: "visited" }
            ]
          }
        ] }
      ],
      before: " "
    }
  ]
}

Tokenizer.stringify(expected) // === input

// * => { type: "universal" }
// foo|element = { type: "element", name: "element", namespace: "foo" }
// *|* = { type: "universal", namespace: "*" }
// :has(h1, h2) => { type: "nested-pseudo-class", name: "has", nodes: [
//     {
//       type: "selector",
//       nodes: [
//         { type: "element", name: "h1" }
//       ]
//     },
//     {
//       type: "selector",
//       nodes: [
//         { type: "element", name: "h2" }
//       ],
//       before: " "
//     }
//   ] }
```

## Building

```
npm install
npm test
```

[![Build Status](https://travis-ci.org/css-modules/css-selector-tokenizer.svg?branch=master)](https://travis-ci.org/css-modules/css-selector-tokenizer)

* Lines: [![Coverage Status](https://coveralls.io/repos/css-modules/css-selector-tokenizer/badge.svg?branch=master)](https://coveralls.io/r/css-modules/css-selector-tokenizer?branch=master)
* Statements: [![codecov.io](http://codecov.io/github/css-modules/css-selector-tokenizer/coverage.svg?branch=master)](http://codecov.io/github/css-modules/css-selector-tokenizer?branch=master)

## Development

- `npm autotest` will watch `lib` and `test` for changes and retest

## License

MIT

## With thanks

- Mark Dalgleish
- Glen Maddern
- Guy Bedford

---
Tobias Koppers, 2015.
