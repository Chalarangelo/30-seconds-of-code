---
title: httpOptions
tags: browser,url,intermediate
---

Makes a `OPTIONS` request to the passed URL.

- Use [`OPTIONS HTTP`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) The HTTP OPTIONS method requests permitted communication options for a given URL or server.
- Use [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) web api to make a `options` request to the given `url`.
- Handle the `onload` event, by calling the given `callback` the `responseText`.
- Handle the `onerror` event, by running the provided `err` function.
- Omit the third argument, `err`, to log errors to the console's `error` stream by default.

```js
const httpOptions = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('OPTIONS', url, true);
  request.onload = () => callback(request.getAllResponseHeaders());
  request.onerror = () => err(request);
  request.send();
};
```

```js
httpGet(
  'https://jsonplaceholder.typicode.com/posts',
  console.log
); /*
/*
Logs: 
  date: Tue, 13 Oct 2020 22:50:35 GMT
  content-length: 0
  connection: close
  x-powered-by: Express
  x-ratelimit-limit: 1000
  x-ratelimit-remaining: 999
  x-ratelimit-reset: 1602629488
  vary: Origin, Access-Control-Request-Headers
  access-control-allow-credentials: true
  access-control-allow-methods: GET,HEAD,PUT,PATCH,POST,DELETE
  via: 1.1 vegur
  cf-cache-status: DYNAMIC
  cf-request-id: 05c5c1982c0000f1f6d43f4200000001
  expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
  report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report?lkg-colo=97&lkg-time=1602629436"}],"group":"cf-nel","max_age":604800}
  nel: {"report_to":"cf-nel","max_age":604800}
  server: cloudflare
  cf-ray: 5e1c9ed37da5f1f6-GRU
*/
```
