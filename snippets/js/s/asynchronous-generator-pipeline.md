---
title: Asynchronous Generator Pipeline
type: snippet
language: javascript
tags: [async, generators]
author: jayanth-kumar-morem
cover: shiny-mountains
dateModified: 2023-08-21T19:21:15+02:00
---

An approach for asynchronous operations using async functions and generators.

- Combines the power of async functions and generators for sequential, asynchronous processing.
Allows pipelining asynchronous tasks in a clean and readable manner.

```js
async function* asyncPipeline(...funcs) {
  for (const func of funcs) {
    yield await func();
  }
}

async function fetchData1() {
  // Simulate fetching data asynchronously
  return await fetch('https://api.example.com/data1');
}

async function processData1(data) {
  // Simulate processing data asynchronously
  return await someAsyncProcessing(data);
}

async function fetchData2() {
  // Simulate fetching more data asynchronously
  return await fetch('https://api.example.com/data2');
}

(async () => {
  try {
    const results = [];

    for await (const result of asyncPipeline(fetchData1, processData1, fetchData2)) {
      results.push(result);
    }

    console.log('Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```

**Practical Usage**

This code snippet can be used when you have a series of asynchronous operations that need to be executed in a specific sequence and their results need to be collected. It's especially useful for data processing pipelines and API calls with dependencies.
