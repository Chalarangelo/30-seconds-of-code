### serializeForm

Encode a set of form elements as a query string.

First we transform the `form` into `FormData`, then we convert it into an `array` and from the `array` we collect an `query string`

```js
const serializeForm = form =>
  Array.from(new FormData(form), field => field.map(encodeURIComponent).join('=')).join('&')
```

```js
serializeForm(document.querySelector('#form')) // email=test%40email.com&name=Test%20Name
```