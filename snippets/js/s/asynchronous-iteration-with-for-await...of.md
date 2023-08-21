---
title: How can you wield the power of asynchronous iteration in JavaScript to seamlessly process data from multiple sources concurrently?
title: Asynchronous Iteration with for await...of
type: snippet
language: javascript
tags: [async,iteration]
cover: wooden-bowl
author: jayanth-kumar-morem
dateModified: 2023-08-21T21:54:53+03:00
---

Iterate asynchronously over a collection using the for await...of loop and handle multiple asynchronous operations concurrently.

```js
// Imagine you have an asynchronous function that fetches data
async function fetchData(id) {
  // Simulate asynchronous fetch
  return new Promise(resolve => setTimeout(() => resolve(`Data ${id}`), 1000));
}

// Create an asynchronous iterable
const asyncIterable = {
  [Symbol.asyncIterator]() {
    let count = 1;
    return {
      async next() {
        if (count <= 5) {
          const data = await fetchData(count);
          count++;
          return { value: data, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// Use the for await...of loop to iterate over the asynchronous iterable
(async () => {
  for await (const data of asyncIterable) {
    console.log(data);
  }
})();
```

**Practical Use:**
```js
// Fetch and process data from an API concurrently
async function fetchAndProcessData(urls) {
  const promises = urls.map(async url => {
    const response = await fetch(url);
    const data = await response.json();
    // Perform some processing on the data
    return process(data);
  });

  const results = await Promise.all(promises);
  return results;
}

const urls = ['url1', 'url2', 'url3'];
fetchAndProcessData(urls).then(results => {
  console.log(results);
});
```

This code snippet demonstrates the power of asynchronous iteration using the for await...of loop, allowing you to work with asynchronous data sources and operations more effectively. It also showcases concurrent processing of multiple asynchronous operations using Promise.all.