### permuteAll

Uses recursion and `Array.push()` to return all the permutations of the given input in an array.

```js
const permuteAll = (input) => {
  const result = [];
  let inputState = input;

  if (typeof input === 'string') inputState = input.split('');
  if (typeof input === 'number') inputState = (input).toString().split('');

  const permute = (arr, m = []) => {
    (arr.length === 0)
      ? result.push(m)
      : arr.forEach((_, i) => {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next));
        });
  };

  permute(inputState);

  return (typeof input === 'string')
            ? result.map(variant => variant.join(''))
            : (typeof input === 'number') 
                ? result.map(variant => parseFloat(variant.join('')))
                : result;
};
```

```js
permuteAll('sun') // [ 'sun', 'snu', 'usn', 'uns', 'nsu', 'nus' ]
permuteAll([1, 33, 5]) // [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]
permuteAll(345) // [ 345, 354, 435, 453, 534, 543 ]
```
