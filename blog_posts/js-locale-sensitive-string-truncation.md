---
title: How can I truncate a string accounting for locale?
shortTitle: Locale-sensitive string truncation
type: question
tags: javascript,string
author: chalarangelo
cover: blog_images/reflection-on-lake.jpg
excerpt: Locale-sensitive string splitting and truncation are finally possible in JavaScript.
firstSeen: 2022-12-04T05:00:00-04:00
---

Breaking a string into words is not the easiest, neither is finding a good place to add an ellipsis. Part of the problem is recognizing word boundaries and words themselves. Luckily `Intl.Segmenter` is a relatively new object that enables **locale-sensitive text segmentation**.

`Intl.Segmenter` allows you to specify a locale and a `granularity` option to specify how a string should be segmented. The `granularity` option can be set to `'grapheme'`, `'word'` or `'sentence'` according to your needs. Using `Intl.Segmenter.prototype.segment()` on a string returns an iterable `Segments` object. This can then be used to find the correct index to split a string without being in the middle of a word or a sentence.

```js
const str =
  'The quick brown fox jumps over the lazy dog. The jay, pig, fox, zebra and my wolves quack!';
const cutOff = 50;

const wordSegmenter = new Intl.Segmenter('en-US', { granularity: 'word' });
const sentenceSegmenter = new Intl.Segmenter('en-US', {
  granularity: 'sentence',
});

let lastWordBreak = -1;
for (let word of wordSegmenter.segment(str)) {
  if (word.isWordLike) continue;
  if (word.index >= cutOff) break;
  lastWordBreak = word.index;
}
str.slice(0, lastWordBreak) + '...';
// 'The quick brown fox jumps over the lazy dog. The...'

let lastSentenceBreak = -1;
for (let sentence of sentenceSegmenter.segment(str)) {
  if (
    lastSentenceBreak !== -1 &&
    sentence.index + sentence.segment.length >= cutOff
  )
    break;
  lastSentenceBreak = sentence.index + sentence.segment.length;
}
str.slice(0, lastSentenceBreak).trim().slice(0, -1) + '...';
// 'The quick brown fox jumps over the lazy dog...'
```

Note that the `Intl.Segmenter` object is not yet supported in all environments at the time of writing (December, 2022). Namely, Firefox has yet to implement it, while Node.js has only started supporting it since version 16.0.0.
