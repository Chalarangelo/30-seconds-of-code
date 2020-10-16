| title | tags |
|-------|------|
|removeDuplicate|javascript, beginner|

Removes duplicate items from an array and returns a new array.

* Creates a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object which allows you to store unique values, and then the spread operator is used to transform the Set into an array.

```js
const removeDuplicate = (array) => {
  return([...new Set(array)]);
}
```

```js
let array = ["donuts", "donuts", "coffee", "donuts"];
console.log(removeDuplicate(array)); // [ "donuts", "coffee" ]
```
