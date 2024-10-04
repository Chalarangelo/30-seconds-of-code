---
title: How can I redirect the page to HTTPS in JavaScript?
shortTitle: Redirect to HTTPS
language: javascript
tags: [browser]
cover: blue-lake
excerpt: Learn how to redirect the page to HTTPS if it's currently in HTTP.
listed: true
dateModified: 2023-10-18
---

HTTP is a highly **insecure and legacy protocol**, and it's recommended to use HTTPS instead. For a few years now, browsers have been marking HTTP sites as insecure and even blocking certain features on them. If you have a website that's still using HTTP, it's a good idea to **redirect it to HTTPS**.

But how exactly can you do that using JavaScript? You can easily get the current protocol via the use of `location.protocol`. If it's not HTTPS, you can use `location.replace()` to replace the existing page with the HTTPS version of the page. In order to get the full address, you can use `location.href`, split it with `String.prototype.split()` and replace the protocol part of the URL.

```js
const httpsRedirect = () => {
  if (location.protocol !== 'https:')
    location.replace('https://' + location.href.split('//')[1]);
};

httpsRedirect();
// If you are on http://mydomain.com,
//   you are redirected to https://mydomain.com
```

Note that, when using this method, pressing the **back button** doesn't take it back to the HTTP page as it's replaced in the history.
