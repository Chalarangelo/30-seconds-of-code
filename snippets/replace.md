---
title: replace
tags: string
---

This string method returns new String, where the specified value(s) has been replaced by the new value.

The replace() method searches a string for a specified value, or a regular expression, and returns a new string where the specified values are replaced.

```js
string.replace(regexp/substr, newSubStr/function[, flags]);//returns a new changed string
```

```js
var str = "I love oranges";
var res = str.replace("oranges", "apples");//returns I love apples
```
