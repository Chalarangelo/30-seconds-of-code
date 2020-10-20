---
title: queryStringToObject
tags: object,intermediate
---

Returns a key-value pairs of object of query params of given url.

- Use `String.prototype.split()` to split url .
- Return the object of key value pair of query params of given url.

```js

function queryStringToObject(url){
    var query = url.split('?');
    if(query[1]){
	    var queryParams = {};
	    var val = '';
	    query = query[1].split('&');
	    query.forEach((e) => {
	        val = e.split('=');
	        queryParams[val[0]] = val[1];
	    })
	    return queryParams;
    } else { return {}; }
}
```

```js
queryStringToObject('https://google.com?page=1&count=10'); // {page: "1", count: "10"}
```
