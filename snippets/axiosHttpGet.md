---
title: hashNode
tags: node,async,axios
---

Makes a `GET` request to the passed URL.

- Use [`axios`](https://www.npmjs.com/package/axios) HTTP client to make a `get` request to the given `url`.
- The function can return a successful object or the error caught by catch.
- The function receives the url as parameter.

```js
var axios = require("axios");
const request = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data
  } catch (error) {
    return error;
  }
};
```

```js
(async () => {
  console.log(await request('https://jsonplaceholder.typicode.com/posts/1'));
})();

/*Response
  { userId: 1, id: 1, title: 'foo', body: 'bar bar bar' }
*/
```
