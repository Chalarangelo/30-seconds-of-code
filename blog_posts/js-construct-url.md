---
title: How to construct a URL in JavaScript
shortTitle: Construct a URL in JavaScript
type: story
tags: javascript,string,browser
author: chalarangelo
cover: alfama
excerpt: A short guide on how to correctly construct a URL in JavaScript.
firstSeen: 2023-02-26T05:00:00-04:00
---

Oftentimes, we need to **create a URL in JavaScript**, to request a resource or redirect the user. A seemingly simple task, yet URLs can be quite nuanced and complex, requiring a lot of attention to get right. This rings especially true if you've ever worked with different encodings and multiple **query parameters**.

Naively, many developers reach for template literals to construct a URL. After all, URLs are simply strings and interpolation can be used to add parameters as needed. Except, this approach is error-prone and can lead to bugs. Let's take a look at an example:

```js
const query = "Where's Waldø?";
const locale = "en-US";
const campaign = "promo_email";

const url = `https://examp.le?q=${query}&lang=${locale}&from=${campaign}`;
// "https://examp.le?q=Where's Waldø?&lang=en-US&from=promo_email"
```

As you can see, template literals aren't well-suited for URLs, as they won't **encode special characters**. If you've worked with JavaScript for any amount of time, you might reach for `encodeURIComponent()` to fix this:

```js
const query = "Where's Waldø?";
const locale = "en-US";
const campaign = "promo_email";

const url = `https://examp.le
  ?q=${
    encodeURIComponent(query)
  }&lang=${
    encodeURIComponent(locale)
  }&from=${
    encodeURIComponent(campaign)
  }`;
// "https://examp.le\n  ?q=Where's%20Wald%C3%B8%3F&lang=en-US&from=promo_email"
```

Surely, this dealt with encoding, but the multiline string has sneaked a newline character (`\n`) into the URL. This is because template literals preserve whitespace, leading to such issues. Breaking the string into multiple lines and concatenating them can help, but the code is starting to get ugly.

Obviously, there are other issues that might come into play, making this a **non-trivial problem** to solve. Luckily, there's a better way to construct URLs in JavaScript, using the `URL` object. Let's see how we can use it to solve the problem above:

```js
const query = "Where's Waldø?";
const locale = "en-US";
const campaign = "promo_email";

// Good
const url = new URL('https://examp.le');

url.searchParams.set('q', query);
url.searchParams.set('lang', locale);
url.searchParams.set('from', campaign);

url.toString();
// 'https://examp.le/?q=Where%27s+Wald%C3%B8%3F&lang=en-US&from=promo_email'
```

Admittedly, using the `URL` object can be a bit more verbose, but it's a worthwhile tradeoff. The code is much more readable and maintainable, and it's less prone to errors. Query parameters are now encoded properly, and delimiters are added automatically.

While query parameters are the most common issue when dealing with URLs, the `URL` object can be useful in many other situations. For example, you can change the protocol, hostname, port, path, hash, etc. of a URL, or even parse an existing URL into its components. If you're interested, you should check out previous articles about how you can [edit URL parameters](/articles/s/js-edit-url-params) and the [`window.location` cheat sheet](/articles/s/js-window-location-cheatsheet).
