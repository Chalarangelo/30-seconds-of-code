---
title: How can I check if a string starts or ends with a substring of another string using JavaScript?
shortTitle: Starts or ends with substring
language: javascript
tags: [string]
cover: boutique-home-office-4
excerpt: Test if a string's start or end partially matches another string.
listed: true
dateModified: 2023-12-31
---

While working on a project a little while back, I came across a problem that made me stop and think. I was trying to check if a truncated HTML string that was serialized from the server had been truncated in the middle of a tag. Naturally, instead of writing a one-off solution, I decided to create a reusable helper function.

## Check if a string starts with a substring of another string

`String.prototype.startsWith()` allows us to easily check if a string **starts with a given substring**. Unfortunately, in the case of this problem, this is insufficient by itself. Instead, we can use `String.prototype.slice()` to get **each substring of the other string** and check it against our text.

If we go from **longest to shortest substring** of the target string, we are guaranteed to come across the longest substring that the text starts with first. We can then return this substring, if it is found. Otherwise, we can return `undefined`.

```js
const startsWithSubstring = (text, word) => {
  for (i = word.length; i > 0; i--) {
    const substr = word.slice(-i);
    if (text.startsWith(substr)) return substr;
  }
  return undefined;
};

startsWithSubstring('/>Lorem ipsum dolor sit amet', '<br />'); // '/>'
```

## Check if a string ends with a substring of another string

We can use the same approach to check if a string ends with a substring of another string. The only difference is that we need to use `String.prototype.endsWith()` instead of `String.prototype.startsWith()` and change the **order of iteration of the substrings**.

```js
const endsWithSubstring = (text, word) => {
  for (i = word.length; i > 0; i--) {
    const substr = word.slice(0, i);
    if (text.endsWith(substr)) return substr;
  }
  return undefined;
};

endsWithSubstring('Lorem ipsum dolor sit amet<br /', '<br />'); // '<br /'
```
