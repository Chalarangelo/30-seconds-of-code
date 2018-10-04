### getQueryString

Get URL parameters. By default it uses `window.location.search`, but you can pass `window.location.hash` or a custom string.

Returns an object with the values passed in the URL.

```js
const getQueryString = (query = window.location.search) => {
  return typeof query === 'string'
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
        const [key, value = ''] = param.split('=');
        params[key] = decodeURIComponent(value.replace(/\+/g, ' '));

        return params;
      }, {})
    : {};
};
```

```js
// http://localhost:3000/?a=1&b=&c
getQueryString(); // {a: "1", b: "", c: ""}

// http://localhost:3000/?a=1&b=&c
getQueryString(window.location.search); // {a: "1", b: "2"}

// http://localhost:3000/#a=1&b=&c
getQueryString(window.location.hash); // {a: "1", b: "2"}

// https://www.google.com/search?q=unicorn+overflow&hl=en&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiVyKSDzOvdAhWDDJAKHaHhDrgQ_AUIDigB&biw=1858&bih=1009
getQueryString();
/*
{
  q: "unicorn overflow",
  hl: "en",
  source: "lnms",
  tbm: "isch",
  sa: "X",
  ved: "0ahUKEwiVyKSDzOvdAhWDDJAKHaHhDrgQ_AUIDigB",
  biw: "1858",
  bih: "1009"
}
*/
```

