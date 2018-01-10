### httpGet

Makes a `GET` request to the passed URL.

Use `XMLHttpRequest` web api to make a `get` request to the given `url`.
Handle the `onload` event, by console logging the `responseText`.
Handle the `onerror` event, by running the provided `err` function.

```js
const httpGet = (url, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = () => console.log(request.responseText);
  request.onerror = () => err(request);
  request.send();
};
```

```js
httpGet('https://jsonplaceholder.typicode.com/posts'); // 'Console logs JSON of 100 posts'
```
