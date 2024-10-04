---
title: How can I truncate a string to a specified length using JavaScript?
shortTitle: Truncate string
language: javascript
tags: [string]
cover: reflection-on-lake
excerpt: String splitting and truncation, both simple and locale-sensitive are possible in JavaScript. Learn how in this guide.
listed: true
dateModified: 2023-12-31
---

**Breaking a string into words** is not the easiest, neither is finding a good place to **truncate a string**. Part of the problem is recognizing **word boundaries** and words themselves. An even more advanced use-case might even need to account for **locale**. Let's build up from the simplest case to the most advanced.

## Truncate string

The absolute simplest way to truncate a string is to use `String.prototype.slice()`. All you have to do is compare `String.prototype.length` to the desired length and return the string truncated to the desired length. If the string is **shorter than the desired length**, return the string as-is.

```js
const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num) : str;

truncateString('boomerang', 6); // 'boomer'
```

## Truncate string, adding ellipsis

That works, but the result doesn't hint at the fact that the string has been truncated. Let's **add an ellipsis** to the end of the string to indicate that it has been truncated. We can do this by appending `'...'` to the end of the string if it has been truncated. We will also have to **account for the length of the ellipsis** itself, so we'll need to subtract its length from the desired length.

```js
const truncateString = (str, lim) =>
  str.length > lim ? str.slice(0, lim > 3 ? lim - 3 : lim) + '...' : str;

truncateString('boomerang', 7); // 'boom...'
```

## Truncate string at whitespace

Up until this point, we've been truncating the string at the specified length, regardless of whether it's in the middle of a word or not. But you might need to **respect word boundaries** and truncate the string at a whitespace character.

We can do this by using `String.prototype.lastIndexOf()` to find the index of the last space below the desired length. We can then use `String.prototype.slice()` to appropriately truncate the string based on the index of the last space, respecting whitespace if possible and appending `'...'` at the end.

```js
const truncateStringAtWhitespace = (str, lim, ending = '...') => {
  if (str.length <= lim) return str;
  const lastSpace = str.slice(0, lim - ending.length + 1).lastIndexOf(' ');
  return str.slice(0, lastSpace > 0 ? lastSpace : lim - ending.length) + ending;
};

truncateStringAtWhitespace('short', 10); // 'short'
truncateStringAtWhitespace('not so short', 10); // 'not so...'
truncateStringAtWhitespace('trying a thing', 10); // 'trying...'
truncateStringAtWhitespace('javascripting', 10); // 'javascr...'
```

## Locale-sensitive string truncation

Finally, we've arrived at the most complex problem - **locale-sensitive string truncation**. This is a difficult problem to solve, which is why JavaScript has kindly added the `Intl.Segmenter` object.

`Intl.Segmenter` allows you to specify a locale and a `granularity` option to specify **how a string should be segmented**. The `granularity` option can be set to `'grapheme'`, `'word'` or `'sentence'`, as needed. Using `Intl.Segmenter.prototype.segment()` on a string returns an iterable `Segments` object. This can then be used to find the correct index to split a string without being in the middle of a word or a sentence.

```js
const truncateStringAtWord = (str, lim, locale = 'en-US', ending = '...') => {
  const segmenter = new Intl.Segmenter(locale, { granularity: 'word' });
  let lastWordBreak = -1;

  for (let word of segmenter.segment(str)) {
    if (word.isWordLike) continue;
    if (word.index >= lim) break;
    lastWordBreak = word.index;
  }

  return str.slice(0, lastWordBreak) + '...';
};

const truncateStringAtSentence = (
  str,
  lim,
  locale = 'en-US',
  ending = '...'
) => {
  const segmenter = new Intl.Segmenter(locale, { granularity: 'sentence' });
  let lastSentenceBreak = -1;

  for (let sentence of segmenter.segment(str)) {
    if (
      lastSentenceBreak !== -1 &&
      sentence.index + sentence.segment.length >= lim
    )
      break;
    lastSentenceBreak = sentence.index + sentence.segment.length;
  }

  return str.slice(0, lastSentenceBreak).trim().slice(0, -1) + '...';
};

const str =
  'The quick brown fox jumps over the lazy dog. The jay, pig, fox, zebra and my wolves quack!';
const lim = 50;

truncateStringAtWord(str, lim);
// 'The quick brown fox jumps over the lazy dog. The...'
truncateStringAtSentence(str, lim);
// 'The quick brown fox jumps over the lazy dog...'
```

> [!NOTE]
>
> The `Intl.Segmenter` object is available in modern browsers and Node.js, since **v16.0.0**. Make sure to check compatibility for your target environment.
