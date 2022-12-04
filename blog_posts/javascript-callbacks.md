---
title: A cautionary tale about JavaScript callbacks
shortTitle: Callback pitfalls
type: story
tags: javascript,function
author: chalarangelo
cover: blog_images/rabbit-call.jpg
excerpt: JavaScript callbacks are especially tricky when you're not careful. Take a deeper dive into potential issues and how to avoid them.
firstSeen: 2021-07-01T05:00:00-04:00
---

A piece of advice I've found myself repeating often as of late is this:

> When working with callbacks in JavaScript, it's better to err on the side of caution and be more verbose.

Mind you, I'm mostly repeating this to myself, but I thought it's pretty valuable to share it with the world. The reason is the myriads of issues I've stumbled upon due to seemingly harmless functions used as callbacks. And that's not even the worst part! They usually slip under the radar when you look at the code and might need a second or third look to identify as the culprit behind the issue.

The most common bug I've encountered is one you might be familiar with: `parseInt()` used as a callback, especially in combination with `Array.prototype.map()`. Consider the following code:

```js
const nums = ['1', '5', '10', '21'];
nums.map(parseInt); // [1, NaN, 2, 7]
```

Did you spot the problem? `parseInt()` takes up to two arguments: the `string` to be parsed and an optional `radix` parameter. `Array.prototype.map()` passes three parameters to the callback: the `value`, `index` and `array`. It should be obvious from this breakdown that the index of each element being passed as the radix parameter results in this strange problem.

The solution is pretty straightforward, too. Creating a function to pass the arguments we want to `parseInt()` would fix this and remove a nasty bug somewhere down the line:

```js
const nums = ['1', '5', '10', '21'];
nums.map(num => parseInt(num, 10)); // [1, 5, 10, 21]
```

A corollary to this is that when working with third-party libraries and APIs, it's always best to create a function to pass the data to whatever part of said API is being used rather than using it directly as a callback. The reason for this is that, even though the library or API might not expect any additional arguments now, this might change in a later version. Not accounting for this could be a major risk when updating to a new version of a library marked as having no breaking changes. Take a look at the following example:

```js
// third-party-lib@v1.0.0
const parseData = path => {
 const fileData = fs.readFileSync(path);
 return fileData || '';
};

const importantFiles = ['id-card.txt', 'bank-number.txt'];
importantFiles.map(parseData); // Works fine

// third-party-lib@v1.1.0 - No breaking changes!
const parseData = (path, purge) => {
 const fileData = fs.readFileSync(path);
 if (purge) fs.unlinkSync(path);
 return fileData || '';
};

const importantFiles = ['id-card.txt', 'bank-number.txt'];
importantFiles.map(parseData); // 'bank-number.txt'` has been deleted
```

The example above, while a bit unlikely, demonstrates a case where a simple index from `Array.prototype.map()` could wreak havoc on the entire filesystem due to a harmless version bump of an external dependency. This is the kind of bug that is hard to track down and causes a ton of headaches when debugging as you struggle to understand how a version bump without breaking changes could cause this.

To summarize, be extra careful when working with callbacks. If a function is not explicitly designed to be a callback, if you are using third party code, even if you are uncertain just add a function to pass down the arguments. It will save you time in the long run at the cost of your code looking a tiny bit more verbose. I think it's a worthwhile tradeoff.
