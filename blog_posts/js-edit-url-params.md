---
title: "Tip: Edit URL Parameters in JavaScript"
shortTitle: Edit URL Parameters
type: tip
tags: javascript,string
author: chalarangelo
cover: sofia-tram
excerpt: Avoid the naive approach and use a more robust method to edit URL parameters in JavaScript.
firstSeen: 2022-12-07T05:00:00-04:00
---

Editing the query string of a URL in JavaScript is pretty common. While the naive approach of directly editing the URL as a string often works, it's a fragile solution that can break easily. This is especially true when working with encoding, hash fragments and other such intricacies.

The most robust way to go about editing a URL is using the `URL` interface to parse the original URL string and edit it as necessary. This way, the browser will take care of all the complicated details and make the code easier to read and maintain.

```js
const urlString = 'https://mysite.com?p=42&from=home#details';
const url = new URL(urlString);

// Delete a parameter
const removedParam = 'from';
url.searchParams.delete(removedParam);

// Edit/add parameters
const newParams = {
  p: 57,
  track: 'none'
};
Object.keys(newParams).forEach(key => {
  url.searchParams.set(key, newParams[key]);
});

// Edit the hash fragment
const newHash = 'new';
url.hash = newHash;

console.log(`${url}`); // https://mysite.com?p=57&track=none#new
```

As you can see in the example, the `URL` interface provides a number of methods to edit the URL. The most commonly used ones are `URL.searchParams` and `URL.hash`. The former is a `URLSearchParams` object that provides methods to edit the query string of the URL, while the latter is a string that contains the hash fragment of the URL. Apart from these two, the `URL` interface also provides methods to edit the protocol, host, port, path, etc. of the URL.
