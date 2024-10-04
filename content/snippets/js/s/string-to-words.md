---
title: Split a JavaScript string into words
shortTitle: Split string into words
language: javascript
tags: [string]
cover: sea-view-2
excerpt: Learn how to split a string into words, using the `Intl.Segmenter` API.
listed: true
dateModified: 2024-01-24
---

Up until a few years ago, the go-to method for splitting a string into words was `String.prototype.split()`. While it can still work just fine, it's a bit of a hassle to get right, especially for longer bodies of text. Yet, JavaScript has come up with a **simpler way** that takes care of all the nuances for us - `Intl.Segmenter`.

Using the `Intl.Segmenter()` constructor, we can create a segmenter for a **given locale**, with a **specific granularity**. In this case, we want to split a string into words, so we'll use the `word` granularity. Then, we can use the `Intl.Segmenter.prototype.segment()` method to split the string into segments.

A **segment** is an object with a handful of properties. The ones that are interesting for this task are `segment` and `isWordLike`. The former is the actual segment, while the latter is a boolean indicating whether the segment is word-like or not. This allows us to easily **filter out non-word segments**.

Putting everything together, we can create a function that splits a string into words, using the `Intl.Segmenter` API.

```js
const splitIntoWords = (str, locale) =>
  [...new Intl.Segmenter(locale, { granularity: 'word' }).segment(str)].reduce(
    (acc, { segment, isWordLike }) => {
      if (isWordLike) acc.push(segment);
      return acc;
    },
    []
  );

splitIntoWords('I love javaScript!!', 'en-US');
// ['I', 'love', 'javaScript']
splitIntoWords('python, javaScript & coffee', 'en-US');
// ['python', 'javaScript', 'coffee']
```

> [!NOTE]
>
> At the time of writing (January, 2024), `Intl.Segmenter` doesn't have perfect support across all browsers. Most notably, it's **not yet supported in Firefox**, although support seems to be just around the corner. Make sure to double check compatibility before using it in production.
