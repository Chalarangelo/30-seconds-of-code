### httpPost

Makes a `PUT` request to the passed URL.

Use `XMLHttpRequest` web api to make a `put` request to the given `url`.
Set the value of an `HTTP` request header with `setRequestHeader` method.
Handle the `onload` event, by running the provided `callback` function.
Handle the `onerror` event, by running the provided `err` function.
Omit the last argument, `err` to log the request to the console's error stream by default.

```js
const httpPut = (url, data, callback, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-type','application/json; charset=utf-8');
    request.onload = () => callback(request);
    request.onerror = () => err(request);
    request.send(data);
};
```

```js
const password = "fooBaz";
const data = JSON.stringify(password);
httpPost(`https://website.com/posts/123`, data, request => {
  console.log(request.responseText);
}); // 'Updates a user's password in database'
```
