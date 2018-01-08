### httpGet

Makes a `GET` request to the passed `URL`.

Use `XMLHttpRequest` web api to retrieve data from the server. When the response is ready call the callback function.

```js
const httpGet = (url, callback) => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = () => callback(request);
  request.send();
}
```

```js
httpGet('https://jsonplaceholder.typicode.com/posts', request => {
  console.log(request.responseText);
}) // 'Array of 100 items'
```
