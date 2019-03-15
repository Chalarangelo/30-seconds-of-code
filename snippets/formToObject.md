### formToObject

Encode a set of form elements as a `object`.

1. Convert the HTML form to `FormData()`
2. Convert `FormData()` to `Array` using ` Array.from()`
3. We collect an object from an array using `Array.prototype.reduce()`

```js
const formToObject = form =>
  Array.from(new FormData(form))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }), {})
```

```js
formToObject(document.querySelector('#form')) // { email: 'test@email.com', name: 'Test Name' }
```