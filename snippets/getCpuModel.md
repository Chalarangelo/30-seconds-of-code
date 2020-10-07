---
title: getCpuModel
tags: os,cpu,beginner
---

Geting cpu model

- Using `os` to get cpu model

```js
const getCpuModel = () => {
  return require('os').cpus()[0].model;
}
```

```js
getCpuModel(); // Example: Intel(R) Core(TM) i7-4720HQ CPU @ 2.60GHz
```
