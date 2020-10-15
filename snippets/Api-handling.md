---
title: Api-handling
tags: Api,Promises,intermediate
---

This snippet would handle an api using core javascript

- `fetch()` is used to send an GET request to an API. 
- So in response the Api here then returns a promise which can be fulfilled or get rejected .
- Calling api using `fetch()` which returns a promise in `.then()` which is then parsed into json using `res.json()`.
- Now that our promise is fulfilled the next response would be the data we requested for. 
- for giving example I have used Github's Api and printed out my name on the console.
- Important note :- use of `fetch()` is limited to javascript . It does not run on node we have different methods for that. 

```js
const apiHandling = (url) =>{
return (
fetch(url)
.then((res) => {
  return res.json();
})
.then((data) => {
  console.log(data.name);
})
.catch((e) => {
    console.log(e)
})
)
}
```

```js

apiHandling(`https://api.github.com/users/ayush015`); // Ayush Srivastava
```
