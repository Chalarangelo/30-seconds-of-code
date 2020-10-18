---
title: convertToSlug
tags: array,slug,regex,basic
---

returns a slug when a string is passed in the function convertToSlug.

- convertToSlug function converts normal string to url friendly slug without using any regex.
- Put the string as an argument in the convertToSlug function.
- Then function will break every word of your string and put them all in an array.
- Then it will loop over array and join all the words in the array with <->
- Finnaly it will return the slug.

```js
const convertToSlug = (putString) => {
  const newStrArr = [];
  putString
    .trim()
    .split(" ")
    .forEach((el) => {
      if (el !== "") {
        newStrArr.push(el.toLowerCase());
      }
    });

  const slug = newStr.join("-");

  return slug;
};
```

```js
convertToSlug("   THIS is a       great tour   "); // 'this-is-a-great-tour'
```
