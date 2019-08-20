# min-document

[![build status][1]][2] [![dependency status][3]][4]

<!-- [![browser support][5]][6] -->

A minimal DOM implementation

## Example

```js
var document = require("min-document")

var div = document.createElement("div")
div.className = "foo bar"

var span = document.createElement("span")
div.appendChild(span)
span.textContent = "Hello!"

/*  <div class="foo bar">
        <span>Hello!</span>
    </div>
*/
var html = String(div)
```

## Installation

`npm install min-document`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/min-document.png
  [2]: https://travis-ci.org/Raynos/min-document
  [3]: https://david-dm.org/Raynos/min-document.png
  [4]: https://david-dm.org/Raynos/min-document
  [5]: https://ci.testling.com/Raynos/min-document.png
  [6]: https://ci.testling.com/Raynos/min-document
