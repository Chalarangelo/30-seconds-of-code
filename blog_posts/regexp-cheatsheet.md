---
title: Regular Expressions Cheat Sheet
type: cheatsheet
tags: javascript,string,regexp,cheatsheet
author: chalarangelo
cover: tools
excerpt: Regular expressions are a very useful tool in a variety of situations. Save this cheatsheet for any time you need to look up their syntax and speed up your development.
firstSeen: 2020-05-01T15:39:07+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### Anchors

- `^`: start of the string or the start of a line in a multiline pattern
- `$`: end of the string or the end of a line in a multiline pattern
- `\b`: word boundary
- `\B`: not word boundary (opposite of `\b`)

Note: Anchors are non-quantifiable (i.e. cannot be followed by a quantifier).

### Character sequences

- `.`: any character except line breaks
- `\w`: any word character
- `\W`: any non-word character (opposite of `\w`)
- `\s`: any whitespace character
- `\S`: any non-whitespace character (opposite of `\s`)
- `\d`: any digit character
- `\D`: any non-digit character (opposite of `\d`)
- `[abc]`: a single character in the given set (here `a`, `b` or `c`)
- `[^abc]`: a single character not in the given set (opposite of `[abc]`)
- `[a-z]`: a single character in the given range (here between `a` and `z` inclusive)
- `[^a-z]`: a single character not in the given range (opposite of `[a-z]`)
- `[a-zA-Z]`: a single character in either of the given ranges

Note: Use `\` to escape special characters (e.g. `\`, `/`, `[`, `]`, `(`, `)`, `{`, `}` etc.).

### Quantifiers

- `a?`: zero or one of `a` (equal to `a{0,1}`)
- `a*`: zero or more of `a` (equal to `a{0,}`)
- `a+`: one or more of `a` (equal to `a{1,}`)
- `a{3}`: exactly 3 of `a`
- `a{3,}`: 3 or more of `a`
- `a{3,5}`: between 3 and 5 of `a` (inclusive)

Note: `a` is any valid quantifiable expression.

### Groups

- `(ab)`: match and capture everything enclosed (here exactly `ab`)
- `(a|b)`: match and capture either one character (here `a` or `b`)
- `(?:ab)`: match everything enclosed, without capturing

### Flags

- `g`: Global
- `m`: Multiline
- `i`: Case insensitive
- `u`: Unicode

Note that this cheatsheet is meant only as a starting point and is by no means a complete guide to all the features and nuances of regular expressions. You can also read [6 JavaScript Regular Expression features you can use today](/blog/s/6-javascript-regexp-tricks) for a deeper dive into some more advanced features.
