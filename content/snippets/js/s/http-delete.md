---
title: HTTP delete
type: snippet
language: javascript
tags: [browser]
cover: beach-from-above
dateModified: 2020-10-19
---

Makes a `DELETE` request to the passed URL.

- Use the `XMLHttpRequest` web API to make a `DELETE` request to the given `url`.
- Handle the `onload` event, by running the provided `callback` function.
- Handle the `onerror` event, by running the provided `err` function.
- Omit the third argument, `err` to log the request to the console's error stream by default.

```js
const httpDelete = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('DELETE', url, true);
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send();
};
```

```js
httpDelete('https://jsonplaceholder.typicode.com/posts/1', request => {
  console.log(request.responseText);
}); // Logs: {}
```
