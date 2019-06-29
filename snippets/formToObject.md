### formToObject

Encode a set of form elements as an `object`.

Use the `FormData` constructor to convert the HTML `form` to `FormData`, `FormData.prototype.entries()` to get a 2D-array with `[key, value]`-pairs. Then use `Object.fromEntries()` to get the result as an object.

```js
const formToObject = form => Object.fromEntries(new FormData(form).entries());
```

```js
formToObject(document.querySelector('#form')); // { email: 'test@email.com', name: 'Test Name' }
```
