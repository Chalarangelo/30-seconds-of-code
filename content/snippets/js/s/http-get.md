---
title: HTTP get
type: snippet
language: javascript
tags: [browser]
cover: boat-port
dateModified: 2020-10-19
---

Makes a `GET` request to the passed URL.

- Use the `XMLHttpRequest` web API to make a `GET` request to the given `url`.
- Handle the `onload` event, by calling the given `callback` the `responseText`.
- Handle the `onerror` event, by running the provided `err` function.
- Omit the third argument, `err`, to log errors to the console's `error` stream by default.

```js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};
```

```js
httpGet(
  'https://jsonplaceholder.typicode.com/posts/1',
  console.log
); /*
Logs: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
*/
```
