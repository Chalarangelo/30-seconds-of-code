---
title: getURLParameters
tags: utility,browser,string,url,intermediate
---

Returns an object containing the parameters of the current URL.

Use `URLSearchParams` to parse location.search string and cycle all entries to create object result.

It takes advantage of parameters default value, conditional chaining and short circuit evaluation to ensure passing a valid string to `URLSearchParams` object.

It also supports arrays values in query string by matching "[]" at the end of the string or by repeating the same key multiple times, to do so it uses a combination of `String.endsWith`, `String.slice`, `Array.push`, `Array.isArray` and array's spread operator.

```js
const getURLParameters = (url = window.location.search) => {
  const query = new URLSearchParams(`?${url?.split("?")[1] || url || ""}`);

  const result = {};

  for (let [key, value] of query.entries()) {
    if (key.endsWith("[]")) {
      key = key.slice(0, -2);
      if (result[key]) {
        result[key].push(value);
      } else {
        result[key] = [value];
      }
    } else if (result[key]) {
      result[key] = Array.isArray(result[key])
        ? [...result[key], value]
        : [result[key], value];
    } else {
      result[key] = value;
    }
  }

  return result;
};
```

```js
getURLParameters('http://url.com/page?name=Adam&surname=Smith'); // {name: 'Adam', surname: 'Smith'}
getURLParameters('google.com'); // {}
getURLParameters('http://url.com/page?arr[]=1&arr[]=2'); // {arr: [1, 2]}
getURLParameters('http://url.com/page?arr=1&arr=2'); // {arr: [1, 2]}
getURLParameters(); // {}
```
