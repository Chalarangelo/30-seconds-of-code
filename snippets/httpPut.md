---
title: httpPut
tags: utility,url,browser,intermediate
---

Makes a `PUT` request to the passed URL.

Use `XMLHttpRequest` web api to make a `put` request to the given `url`.
Set the value of an `HTTP` request header with `setRequestHeader` method.
Handle the `onload` event, by running the provided `callback` function.
Handle the `onerror` event, by running the provided `err` function.
Omit the last argument, `err` to log the request to the console's error stream by default.

```js

const httpPut = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('PUT', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send(data);
};
```

```js

const password = 'fooBaz';
const data = JSON.stringify({
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1
});
httpPut('https://jsonplaceholder.typicode.com/posts/1', data, request => {
  console.log(request.responseText);
}); /*
Logs: {
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1
}
*/
```
