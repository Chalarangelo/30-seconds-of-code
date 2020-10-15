---
title: hashNode
tags: node,async,axios
---

Makes a `POST` request to the passed URL.

- Use [`axios`](https://www.npmjs.com/package/axios) HTTP client to make a `post` request to the given `url`.
- The function can return a successful object or the error caught by catch.
- The function receives the url and body as parameter.

```js
var axios = require("axios");
const request = async (url, newPost) => {
  try {
    const response = await axios.post(url, newPost);
    return response.data
  } catch (error) {
    return error;
  }
};
```

```js
const newPost = {
  userId: 1,
  title: 'Foo',
  body: 'bar bar bar'
};

(async () => {
  console.log(await request('https://jsonplaceholder.typicode.com/posts', newPost));
})();

/*Response
  { userId: 1, id: 101, title: 'Foo', body: 'bar bar bar' }
*/
```
