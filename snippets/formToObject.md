### formToObject

Encode a set of form elements as a `object`.

First we transform the `form` into `FormData`, then we convert it into an `array` and from the `array` we collect an `object`

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