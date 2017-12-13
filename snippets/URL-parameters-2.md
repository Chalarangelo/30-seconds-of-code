### URL parameters

Use `split()` for splitting the URL by the `?`-prefix query parameter as well as the `&`-prefix additional parameters.
Iterate through the additional parameters array returned by `query.split("&")` and split the array elements by `=` for seperating keys and values. Merge all pairs together to a string which is finally returned.

```js
const getUrlParameters = URL => {
    var query_string = {};
    var vars = URL.split("?")[1].split("&");
    for (var i = 0; i < vars.length; i++) {
        if (typeof query_string[vars[i].split("=")[0]] === "undefined") {
            query_string[vars[i].split("=")[0]] = decodeURIComponent(vars[i].split("=")[1]);
        } else {
            query_string[vars[i].split("=")[0]].push(decodeURIComponent(vars[i].split("=")[1]));
        }
    }
    return query_string;
}
// getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
```
