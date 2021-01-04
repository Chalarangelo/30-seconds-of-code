---
title: "Tip: JavaScript array sorting shorthand"
type: tip
tags: javascript,array
authors: maciv,chalarangelo
cover: blog_images/apples.jpg
excerpt: Learn how to quickly write code to sort JavaScript arrays with this handy one-liner.
---

When sorting an array of primitive values (e.g. strings or numbers), you'll often see a lot of code that looks like this:

```js
const arr = [8, 2, 1, 4, 5, 0];
// Sort in ascending order
arr.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1
  return 0;
}); // [0, 1, 2, 4, 5, 8]
```

While this piece of code does the job, there is also a one-line alternative for it. The trick hinges on `Array.prototype.sort()` expecting either a positive or a negative value to perform a swap between two elements, thus allowing for more flexible values than `1` and `-1`. Subtracting the numeric values in an array is sufficient and can also be used to sort the array the other way around:

```js
const arr = [8, 2, 1, 4, 5, 0];
// Sort in ascending order
arr.sort((a, b) => a - b); // [0, 1, 2, 4, 5, 8]
// Sort in descending order
arr.sort((a, b) => b - a); // [8, 5, 4, 2, 1, 0]
```

If you are working with string arrays, you should instead use `String.prototype.localeCompare()`, as it provides far greater flexibility, by accounting for specific locales and their unique needs:

```js
const s = ['Hi', 'Hola', 'Hello'];
// Sort in ascending order
arr.sort((a, b) => a.localeCompare(b)); // ['Hello', 'Hi', 'Hola']
// Sort in descending order
arr.sort((a, b) => b.localeCompare(a)); // ['Hola', 'Hi', 'Hello']
```

**Image credit:** [Andra Ion](https://unsplash.com/@amiion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
