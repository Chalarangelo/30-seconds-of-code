### formToObject

Serializes a form into an object.

First we transform the `form` into `FormData`, then we convert it into an `array` and from the `array` we collect an `object`

```js
const formToObject = form =>
  Array.from(new FormData(form))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }), {})
```

```html
<form id="form">
  <input name="email" type="email" />
  <input name="name" />
</form>
```

```js
formToObject(document.querySelector('#form')) // { email: 'test@email.com', name: 'Test Name' }
```