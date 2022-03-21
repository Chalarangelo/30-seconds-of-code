---
title: 6 JavaScript Regular Expression features you can use today
shortTitle: JavaScript Regular Expression tips
type: story
tags: javascript,string,regexp
expertise: advanced
author: chalarangelo
cover: blog_images/taking-photos.jpg
excerpt: Regular expressions, while very powerful, are notoriously hard to master. Start using them in your JavaScript code by understanding these 6 features.
firstSeen: 2020-04-15T14:24:50+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Regular expressions, while very powerful, are notoriously hard to master. Here are 6 useful features that can help you start using them in your JavaScript projects:

### Capturing groups

Capturing groups allow you to get specific parts of the matched string, simply by wrapping part of the regular expression in parentheses `(...)`:

```js
const str = 'JavaScript is a programming language';
/(JavaScript) is a (.*)/.exec(str);
/*
  [
    0: 'JavaScript is a programming language',
    1: 'JavaScript',
    2: 'programming language'
  ]
*/
```

### Non-capturing groups

Non-capturing groups are used for matching something without capturing it, like an either/or matching group that you do not really need. They are defined similarly to capturing groups, but prefixed with `?:`:

```js
const str = 'JavaScript is a programming language';
/(?:JavaScript|Python) is a (.+)/.exec(str);
/*
  [
    0: 'JavaScript is a programming language',
    1: 'programming language'
  ]
*/
```

### Named capturing groups

Named capturing groups allow you to name a capturing group, by prefixing it with `<name>`:

```js
const str = 'JavaScript is a programming language';
/(?<subject>.+) is a (?<description>.+)/.exec(str);
/*
  [
    0: 'JavaScript is a programming language',
    1: 'JavaScript',
    2: 'programming language',
    groups: {
      subject: 'JavaScript,
      description: 'programming language'
    }
  ]
*/
```

### Capturing group backreferences

Backreferences help you write shorter regular expressions, by repeating an existing capturing group, using `\1`, `\2` etc. Similarly, you can also repeat named capturing groups using `\k<name>`:

```js
const str = 'JavaScript is a programming language - an awesome programming language JavaScript is';
/(.+) is a (?<description>.+) - an awesome \k<description> \1 is/.exec(str);
/*
  [
    0: 'JavaScript is a programming language - an awesome programming language JavaScript is',
    1: 'JavaScript',
    2: 'programming language',
    groups: {
      subject: 'JavaScript,
      description: 'programming language'
    }
  ]
*/
```

### Lookaheads

Lookaheads allow you to check if something is followed by a certain pattern, without actually matching it. You can create positive lookaheads using `?=` and negative lookaheads using `?!`:

```js
const str = 'JavaScript is not the same as Java and you should remember that';
/Java(?=Script)(.*)/.exec(str);
/*
  [
    0: 'JavaScript is not the same as Java and you should remember that',
    1: 'Script is not the same as Java and you should remember that'
  ]
*/

/Java(?!Script)(.*)/.exec(str);
/*
  [
    0: 'Java and you should remember that',
    1: ' and you should remember that'
  ]
*/
```

### Unicode characters

Finally, you can match unicode characters, using `/p{...}` and the `/u` flag. Examples include, but are not limited to `{Emoji}`, `{Math_Symbols}` and `{Script=Greek}`:

```js
const str = 'Greek looks like this: γεια';
/\p{Script=Greek}+/u.exec(str);
/*
  [
    0: 'γεια'
  ]
*/
```
