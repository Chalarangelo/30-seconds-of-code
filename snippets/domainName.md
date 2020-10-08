---
title: domainName
tags: string,browser,url,intermediate
---

Given a `url`, returns the domain name.

- It uses `String.prototype.replace()` to parse the url in its corresponding parts (groups) using regular expressions and then replace the whole string with the third matched group that would correspond to the domain name.

```js
const domainName = url => url.replace(/(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]*)(\.[a-z]{2,})(\/+.*)?/g, "$3");
```

```js
domainName("http://google.com"); // 'google'
domainName("https://www.30secondsofcode.org/js") // '30secondsofcode'
```
