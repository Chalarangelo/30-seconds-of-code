---
title: How do I empty an array in JavaScript?
type: question
tags: javascript,array
authors: chalarangelo
cover: blog_images/coconuts.jpg
excerpt: You can use a lot of different techniques to empty an array in JavaScript. See which ones best suits your needs with this quick guide.
---

When working with JavaScript arrays, a pretty common question is how does one empty an array and remove all its elements. As it turns out, there are a few ways you can go about this, each one with its pros and cons.

### Assign it to an empty array

You can assign your variable to an empty array (`[]`) in order to clear it. While this option is rather fast, you should be mindful of references to the original array, as they will remain unchanged. Moreover, it doesn't work for arrays declared as `const`.

```js
let a = [1, 2, 3, 4];
a = [];
```

### Set its length to 0

A better option is to set the `length` of the array to `0`. This option is also pretty fast and has the additional benefit of working for `const` variables.

```js
let a = [1, 2, 3, 4];
a.length = 0;
```

### Use Array.prototype.splice()

`Array.prototype.splice()` can also be a useful alternative when trying to empty an array. While it has no other downsides compared to the previous method, it doesn't seem to perform as well, so that might be something to consider.

```js
let a = [1, 2, 3, 4];
a.splice(0, a.length);
```

### Use Array.prototype.pop()

Last but not least, using `Array.prototype.pop()` is another, more old-fashioned option. It's generally more verbose and less performant, so I'd rather use one of the previous methods instead.

```js
let a = [1, 2, 3, 4];
while (a.length) a.pop();
```

**Image credit:** [Irene Kredenets](https://unsplash.com/@ikredenets?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
