### httpPost

Makes a `POST` request to the passed URL.

Use `XMLHttpRequest` web api to make a `post` request to the given `url`.
Set the value of an `HTTP` request header with `setRequestHeader` method.
Handle the `onload` event, by running the provided `callback` function.
Handle the `onerror` event, by running the provided `err` function.
Omit the last argument, `err` to log the request to the console's error stream by default.

```js
const httpPost = (url, data, callback, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-type','application/json; charset=utf-8');
    request.onload = () => callback(request);
    request.onerror = () => err(request);
    request.send(data);
}
```

```js
const user = {
    name: "Foo",
    password: "fooBar"
};
const data = JSON.stringify(user);
httpPost('https://website.com/posts', data, request => {
  console.log(request.responseText);
}); // 'Makes a new instance of user in database'
```
