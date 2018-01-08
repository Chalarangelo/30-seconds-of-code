### httpGet

Makes a `GET` request to the passed URL.

Use `XMLHttpRequest` web api to make a `get` request to the given `url`.
Handle the `onload` event, by running the provided `callback` function.
Handle the `onerror` event, by running the provided `err` function.
Omit the third argument, `err` to log the request to the console's error stream by default.

```js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send();
}
```

```js
httpGet('https://website.com/posts', request => {
  console.log(request.responseText);
}); // 'Retrieves all users from the database'
```
