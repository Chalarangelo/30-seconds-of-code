---
title: getURLQueryVariable
tags: browser,string,regexp,intermediate
---

Checks the browser's URL for the given variable and returns the value as a string.
Returns undefined if the given variable is not found as a query in the URL.

- Get the querystring portion of the URL without the question mark.
- Create an array of the key/value pairs within the querystring.
- Loop over the key/value pairs, and return the value when a key is found matching the passed variable.

```js
const getQueryVariable = (variable) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return undefined;
};
```

```js
// While on the page 'http://url.com/page?name=Adam&surname=Smith'
getQueryVariable('name'); // 'Adam'
getQueryVariable('surname'); // 'Smith'
getQueryVariable('shoeSize'); // undefined
```
