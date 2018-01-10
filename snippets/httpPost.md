### httpPost

Makes a `POST` request to the passed URL.

Use `XMLHttpRequest` web api to make a `post` request to the given `url`.
Set the value of an `HTTP` request header with `setRequestHeader` method.
Handle the `onload` event, by console logging the `responseText`.
Handle the `onerror` event, by running the provided `err` function.

```js
const httpPost = (url, data, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-type','application/json; charset=utf-8');
    request.onload = () => console.log(request.responseText);
    request.onerror = () => err(request);
    request.send(data);
};
```

```js
const user = {
    name: "Foo",
    password: "fooBar"
};
const data = JSON.stringify(user);
httpPost('https://website.com/posts', data, request => {
  console.log(request.responseText);
}); // ''
```
