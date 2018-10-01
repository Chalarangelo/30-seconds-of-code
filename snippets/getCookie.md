### getCookie

Get a cookie by name in browser environment

Use `document.cookie` to get all cookies.
Use `String.prototype.split('; ')` to separate cookie name from cookie value.
Use `if (parts.length === 2)` to check if exists any value.
Use `Array.prototype.pop()` to get part of split that starts with cookie value.
Use `Array.prototype.split(';')` to split remaining cookies if exist.
Use `Array.prototype.shift()` to get cookie value from start of array.

```js
function getCookie(name) {
  const parts = ('; ' + document.cookie).split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}
```

```js
getCookie('cookieName'); // cookieValue
```
