---
title: How can I perform an HTTP request in JavaScript?
shortTitle: HTTP request
language: javascript
tags: [browser]
cover: boat-port
excerpt: Learn how to perform HTTP GET, POST, PUT, and DELETE requests in JavaScript.
listed: true
dateModified: 2024-02-13
---

The **HTTP protocol** is the foundation of data communication on the web. It is a **request-response** protocol, which means that a client sends a request to a server, and the server sends a response back to the client.

The most common HTTP methods are `GET`, `POST`, `PUT`, and `DELETE`. Sending a request via JavaScript is quite common and can be achieved either using the more modern `fetch` API or the older `XMLHttpRequest` web API.

## Using the Fetch API

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a modern replacement for `XMLHttpRequest`. It is a **promise-based** API that allows you to make network requests similar to `XMLHttpRequest`, but with a simpler and more powerful interface.

### HTTP GET request

The simplest use case is to make a `GET` request to a given URL. As the `fetch()` API returns a promise, you can use the `then` method to handle the response. In the following example, the response is converted to JSON using the `json()` method and then logged to the console.

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => console.log(data));

/* Logs: {
  'userId': 1,
  'id': 1,
  'title': 'sunt aut facere repellat provident occaecati…',
  'body': '…'
} */
```

### HTTP POST request

To make a `POST` request, you need to pass an object with the request options as the second argument to `fetch()`. The `method` option is set to `'POST'`, and the `body` option is set to the data you want to send.

The type of data in the `body` option can vary and should be encoded according to the `Content-type` header. In the following example, the data is encoded as JSON using `JSON.stringify` and the `Content-type` header is set to `'application/json; charset=UTF-8'`.

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));

/* Logs: {
  'title': 'foo',
  'body': 'bar',
  'userId': 1,
  'id': 101
} */
```

### HTTP PUT request

Similarly to the `POST` request, you can make a `PUT` request by setting the `method` option to `'PUT'` in the request options object. The rest of the request options are the same as for the `POST` request.

```js
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));

/* Logs: {
  'id': 1,
  'title': 'foo',
  'body': 'bar',
  'userId': 1
} */
```

### HTTP DELETE request

To make a `DELETE` request, you need to set the `method` option to `'DELETE'` in the request options object. A `DELETE` request does not have a body, so the `body` option is omitted in the following example.

```js
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE'
})
  .then(response => console.log(response));

/* Logs: {} */
```

## Using XMLHttpRequest

The `XMLHttpRequest` web API is the **older way** of making HTTP requests in JavaScript. It is not as powerful as the `fetch` API, but it is still widely used and supported in all modern browsers.

Instead of using promises, `XMLHttpRequest` uses **event listeners** to handle the response and errors. The `onload` event is used to handle the response, and the `onerror` event is used to handle errors.

### HTTP GET request

The following example makes a `GET` request to a given URL using the `XMLHttpRequest` web API. The given `callback` function is called with the `responseText` when the request is successful, and the `err` function is called when an error occurs.

```js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};

httpGet(
  'https://jsonplaceholder.typicode.com/posts/1',
  console.log
);
/* Logs: {
  'userId': 1,
  'id': 1,
  'title': 'sunt aut facere repellat provident occaecati…',
  'body': '…'
} */
```

### HTTP POST request

The following example makes a `POST` request to a given URL using the `XMLHttpRequest` web API. The `data` argument is the data you want to send, and the `callback` function is called with the `responseText` when the request is successful. In order to set the `Content-type` header, you need to use the `setRequestHeader` method.

```js
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};

httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  JSON.stringify({
    userId: 1,
    id: 1337,
    title: 'Foo',
    body: 'bar bar bar'
  }),
  console.log
);
/* Logs: {
  'title': 'foo',
  'body': 'bar',
  'userId': 1,
  'id': 101
} */
```

### HTTP PUT request

The following example makes a `PUT` request to a given URL using the `XMLHttpRequest` web API. The `data` argument is the data you want to send, and the `callback` function is called with the `responseText` when the request is successful.

```js
const httpPut = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('PUT', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send(data);
};

httpPut(
  'https://jsonplaceholder.typicode.com/posts/1',
  JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  request => console.log(request.responseText)
);
/* Logs: {
  'id': 1,
  'title': 'foo',
  'body': 'bar',
  'userId': 1
} */
```

### HTTP DELETE request

The following example makes a `DELETE` request to a given URL using the `XMLHttpRequest` web API. The `callback` function is called with the `responseText` when the request is successful.

```js
const httpDelete = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('DELETE', url, true);
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send();
};

httpDelete('https://jsonplaceholder.typicode.com/posts/1', request => {
  console.log(request.responseText);
});
/* Logs: {} */
```
