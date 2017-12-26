### shuffle

Randomizes the order of the values of an array, in place.

Users the Fisher-Yates reorder the elements, based on the [Lodash implementation](https://github.com/lodash/lodash/blob/b2ea6b1cd251796dcb5f9700c4911a7b6223920b/shuffle.js).

```js
const shuffle = (arr = []) => {
  let i = -1;
  const lastIndex = arr.length - 1;
  while (++i < arr.length) {
    const rand = i + Math.floor(Math.random() * (lastIndex - i + 1));
    const value = arr[rand];
    arr[rand] = arr[i];
    arr[i] = value;
  }
  return arr
};
// shuffle([1,2,3]) -> [2,3,1]
```
