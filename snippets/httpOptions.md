---
title: httpOptions
tags: browser,intermediate
---

Makes a `OPTIONS` request to the passed URL.

- Use the `XMLHttpRequest` web API to make a `OPTIONS` request to the given `url`.
- Handle the `onload` event, by calling the given `callback` the `getResponseHeader()` with "Allow" or "Access-Control-Allow-Methods" Header.
- Handle the `onerror` event, by running the provided `err` function.
- Omit the third argument, `err`, to log errors to the console's `error` stream by default.

```js
const httpTrace = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('OPTIONS', url, true);
  request.onload = () => callback(request.getResponseHeader("Access-Control-Allow-Methods"));
  request.onerror = () => err(request);
  request.send();
};
```

```js
httpTrace(
  'http://jsonplaceholder.typicode.com/posts/1', 
   request => {console.log(request.getResponseHeader("Access-Control-Allow-Methods"));} 
);
 /*
Logs: {
	GET,HEAD,PUT,PATCH,POST,DELETE
}
*/
```
