---
title: Redirect to HTTPS
tags: browser
cover: blue-lake
firstSeen: 2017-12-21T08:33:56+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Redirects the page to HTTPS if it's currently in HTTP.

- Use `location.protocol` to get the protocol currently being used.
- If it's not HTTPS, use `location.replace()` to replace the existing page with the HTTPS version of the page.
- Use `location.href` to get the full address, split it with `String.prototype.split()` and remove the protocol part of the URL.
- Note that pressing the back button doesn't take it back to the HTTP page as its replaced in the history.

```js
const httpsRedirect = () => {
  if (location.protocol !== 'https:')
    location.replace('https://' + location.href.split('//')[1]);
};
```

```js
httpsRedirect();
// If you are on http://mydomain.com, you are redirected to https://mydomain.com
```
