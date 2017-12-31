### isValidJSON

Checks if the provided argument is a valid JSON.

Use `JSON.parse()` and a `try... catch` block to check if the provided argument is a valid JSON.

```js
const isValidJSON = obj => {
  try {
    JSON.parse(obj);
    if (o && typeof o === "object") {
            return true;
        }
} catch (e) {
    return false;
  }
};
```

```js
isValidJSON('{"name":"Adam","age":20}'); // true
isValidJSON('{"name":"Adam",age:"20"}'); // false
```
