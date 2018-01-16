### isMap

Checks if value is classified as a Map object.

Use the `instanceof`operator to check if the provided value is a `Map` object.

```js
const isMap = val => val instanceof Map;
```

```js
isMap(new Map()); // true
```
