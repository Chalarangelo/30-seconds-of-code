---
title: filteredArrayData
tags: array,beginner
---

Filtering an array of objects based on a condition

- Use the `arrow function`
- Use the `filter` and `includes` methods

```js
const filteredData = (array, data) => {
	return array.filter(path => path.includes(data))
}
```

```js
const array = [
  "files/dir1/file",
  "files/dir1/file2",
  "files/dir2/file",
  "files/dir2/file2"
]

filteredData(array, "dir2") // ["files/dir2/file", "files/dir2/file2"]
```
