---
title: Check if a JavaScript string contains only alpha or alphanumeric characters
shortTitle: String is alpha or alphanumeric
language: javascript
tags: [string,regexp]
cover: mountain-lake-cottage-2
excerpt: Use a regular expression to check if a string contains only alpha or alphanumeric characters in JavaScript.
listed: true
dateModified: 2024-03-24
---

Oftentimes, strings are used to represent data that should only contain alphabetic or alphanumeric characters. Using **regular expressions**, you can easily check if a string matches the pattern.

## Check if a string contains only alpha characters

For alpha (alphabetic) characters, you can use a **range** (`[a-zA-Z]`) to match any character from `a` to `z` (lowercase) and `A` to `Z` (uppercase). Simply adding the `*` **quantifier** and the **positional anchors** (`^` and `$`) will ensure that the pattern matches the entire string. Then, you can use `RegExp.prototype.test()` to check if the given string matches against the alphabetic pattern.

```js
const isAlpha = str => /^[a-zA-Z]*$/.test(str);

isAlpha('sampleInput'); // true
isAlpha('this Will fail'); // false
isAlpha('123'); // false
```

## Check if a string contains only alphanumeric characters

Subsequently, you can extend the pattern to include **digits** (`0-9`) by adding them to the range. The resulting pattern will be `[a-zA-Z0-9]`. Adding the `gi` **flags** makes the pattern **case-insensitive**, allowing for the range to be simplified to `[a-z0-9]`.

```js
const isAlphaNumeric = str => /^[a-z0-9]*$/gi.test(str);

isAlphaNumeric('hello123'); // true
isAlphaNumeric('123'); // true
isAlphaNumeric('hello 123'); // false (space character is not alphanumeric)
isAlphaNumeric('#$hello'); // false
```

> [!TIP]
>
> These methods can serve as a **great starting point** for more complex string validation patterns. You can further customize the regular expressions to suit your specific requirements (e.g. allowing spaces, hyphens, or underscores in the string).
