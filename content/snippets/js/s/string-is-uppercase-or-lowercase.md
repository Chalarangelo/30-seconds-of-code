---
title: Check if a string is uppercase or lowercase in JavaScript
short: String is uppercase or lowercase
language: javascript
tags: [string]
cover: flower-portrait-7
excerpt: Use these simple tricks to check if a string is uppercase or lowercase in JavaScript.
listed: true
dateModified: 2023-12-20
---

It's not uncommon to need to check if a **string is uppercase or lowercase** in JavaScript. Fundamentally, this is a very simple task, as we can easily convert any string to uppercase or lowercase. We can then **compare the original string to the converted string** and get the desired result.

## Check if a string is uppercase

In order to check if a string is uppercase, we can convert the string to uppercase using `String.prototype.toUpperCase()` and compare it to the original string.

```js
const isUpperCase = str => str === str.toUpperCase();

isUpperCase('ABC'); // true
isUpperCase('A3@$'); // true
isUpperCase('aB4'); // false
```

## Check if a string is lowercase

Conversely, we can do the same for lowercase strings, comparing the original string with the output of `String.prototype.toLowerCase()`.

```js
const isLowerCase = str => str === str.toLowerCase();

isLowerCase('abc'); // true
isLowerCase('a3@$'); // true
isLowerCase('Ab4'); // false
```

## Dealing with non-alphabetic characters

The above examples work well for **alphabetic characters**, but what about **non-alphabetic characters**? For example, `'!@#$'` is neither uppercase nor lowercase, but both `isUpperCase('!@#$')` and `isLowerCase('!@#$')` return `true`.

**Regular expressions** offer a solution to this problem. Here's a quick rundown of the regular expression syntax we'll be using:

- Use the `^` anchor to match the **start of the string**.
- Use `[a-z]` or `[A-Z]` to match a **range of alphabetic characters** (case-sensitive).
- Use a **positive lookahead** `(?=)` to ensure that at least one alphabetic character is present in the string.
- Use `\s` to **allow whitespace characters** (optional).
- Use the `+` quantifier to match **one or more** of the preceding token.
- Use the `$` anchor to match the **end of the string**.

After setting up the regular expression, we can use `RegExp.prototype.test()` to check if the string matches.

```js
const isUpperCase = str => /^(?=[A-Z])[A-Z\s]+$/.test(str);

isUpperCase('ABC'); // true
isUpperCase('A BC'); // true
isUpperCase('A3@$'); // false
isUpperCase(' '); // false
isUpperCase('!@#$'); // false

const isLowerCase = str => /^(?=[a-z])[a-z\s]+$/.test(str);

isLowerCase('abc'); // true
isLowerCase('a bc'); // true
isLowerCase('a3@$'); // false
isLowerCase(' '); // false
isLowerCase('!@#$'); // false
```

> [!TIP]
>
> If you **don't want to allow whitespace characters**, the regular expressions for uppercase and lowercase can be simplified to `/^[A-Z]+$/` and `/^[a-z]+$/` respectively.

