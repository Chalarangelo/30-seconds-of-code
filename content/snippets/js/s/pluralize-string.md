---
title: Pluralize a JavaScript string
description: Pluralize string
language: javascript
tags: [string]
cover: shell-focus
excerpt: Learn how to pluralize a string in JavaScript based on a number.
listed: true
dateModified: 2024-06-02
---

Tasks involving language and localization are generally more complex than they seem at first glance. One common task is **pluralizing strings** based on a number. While seemingly easy at first, each language has its own rules for pluralization and special cases that need to be accounted for.

## Check if string should be pluralized

Focusing on **English**, the rules are relatively simple: if the number is not `1`, the word should be pluralized. We can write a simple function to decide whether to pluralize a word based on a number, using `Math.abs()`, so we can handle **negative numbers** as well.

```js
const isPlural = num => Math.abs(num) !== 1;

isPlural(0); // false
isPlural(1); // false
isPlural(-1); // false
isPlural(2); // true
isPlural(-2); // true
```

## Pluralize string based on a number

The plural form of most words is simply the singular form with an _s_ added to the end. However, there are **exceptions**, such as _person_ becoming _people_ and _radius_ becoming _radii_. For such cases, we can easily provide a custom plural form, via an optional argument.

```js
const isPlural = num => Math.abs(num) !== 1;
const simplePlural = word => `${word}s`;
const pluralize = (num, word, plural = simplePlural) =>
  isPlural(num) ? plural(word) : word;

pluralize(0, 'apple'); // 'apples'
pluralize(1, 'apple'); // 'apple'
pluralize(2, 'apple'); // 'apples'
pluralize(2, 'person', word => 'people'); // 'people'
```

## Pluralize strings using a dictionary

This works, but is a little cumbersome to use. We can improve it by using a **dictionary** to store the plural forms of words. This way, we can easily look up the plural form of a word based on the input number.

```js
const isPlural = num => Math.abs(num) !== 1;
const simplePlural = word => `${word}s`;
const pluralizer =
  (dictionary = {}, plural = simplePlural) =>
  (num, word) =>
    isPlural(num) ? dictionary[word] || plural(word) : word;

const PLURALS = {
  person: 'people',
  radius: 'radii',
};

const autoPluralize = pluralizer(PLURALS);
autoPluralize(0, 'apple'); // 'apples'
autoPluralize(2, 'person'); // 'people'
```
