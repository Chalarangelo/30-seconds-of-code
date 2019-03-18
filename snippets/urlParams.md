### urlParams

Get query parameters from current URL.

Pass the url query param as a argument to the urlParams map, it will return you the query value.

```
var urlParams = new URLSearchParams(window.location.search.substring(1));
```

```
//URL example https://example.com/?param1=value1
console.log(urlParams.get("param1")); // Prints value1
```