### serializeForm

Encode a set of form elements as a query string.

1. Convert the HTML form to `FormData()`
2. Convert `FormData()` to `Array` using ` Array.prototype.from()`
3. Use the 2 argument `Array.from()` to pass the `map` function.
4. On the field of each iteration, we call the map and add `window.encodeURIComponent()` to it to encode all values inside the field
5. Then on the result map call `Array.prototype.join('=')` to glue the key and value.
6. Then the result of `Array.from()` is glued together using `Array.prototype.join('&')`

```js
const serializeForm = form =>
  Array.from(new FormData(form), field => field.map(encodeURIComponent).join('=')).join('&')
```

```js
serializeForm(document.querySelector('#form')) // email=test%40email.com&name=Test%20Name
```