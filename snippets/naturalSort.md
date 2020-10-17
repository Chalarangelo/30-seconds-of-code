---
title: naturalSort
tags: array,intermediate
---

Sort the given list of strings in the way that humans expect.

- The normal Java Script sort-algorithm sorts lexicographically, 
so it sorts numbers like letters (ab, ac, ba, bc, ...) -> (1, 11, 2, 23, ...)

- The natural sort-algorithm, sorts the list naturally like human would do it


```js
const naturalSort = (array) => {
    return array.sort(
        (a, b) => a.localeCompare(b, navigator.languages[0] || navigator.language, {
            numeric: true,
            ignorePunctuation: true
        })
    )
}
```

```js
const example = ['2 ft 7 in', '1 ft 5 in', '10 ft 2 in', '2 ft 11 in', '7 ft 6 in']
// Normal sort
example.sort() // 1 ft 5 in, 10 ft 2 in, 2 ft 11 in, 2 ft 7 in, 7 ft 6 in

// Natural sort 
naturalSort(example); // 1 ft 5 in, 2 ft 7 in, 2 ft 11 in, 7 ft 6 in, 10 ft 2 in
```
