# dom-walk

iteratively walk a DOM node

## Example

``` js
var walk = require("dom-walk")

walk(document.body.childNodes, function (node) {
    console.log("node", node)
})
```

## Installation

`npm install dom-walk`

## Contributors

 - Raynos

## MIT Licenced