### serializeForm

Serializes a form into an object.

First we transform the `form` into `FormData`, then we convert it into an `array` and from the `array` we collect an `query string`

```js
const serializeForm = form =>
  Array.from(new FormData(form), field => field.map(encodeURIComponent).join('=')).join('&')
```

```html
<form id="form">
  <input name="email" type="email" />
  <input name="name" />
</form>
```

```js
serializeForm(document.querySelector('#form')) // email=test%40email.com&name=Test%20Name
```