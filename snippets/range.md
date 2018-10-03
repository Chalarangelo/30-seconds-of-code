### range

Returns an array of numbers from range [start, stop) with an optional step (default value is `1`). The first argument, `start`, is also optional with a default value of `0`.

Strictly compare to `undefined` to check if parameter `b` was passed to the function. If it was, treat `a` as `start` and `b` as `stop`. Otherwise, set `start` to a default value of `0` and treat `a` as `stop`. Generate elements of the array using a `for` loop.

```js
const range = (a, b, step=1) => {
    let start, stop;
    if (b !== undefined) {
        start = a;
        stop = b;
    } else {
        start = 0;
        stop = a;
    }
    let result = [];
    if (step == 0) {
        throw "Step must not be zero!";
    } else if (step > 0) {
        for (let v = start; v < stop; v += step) {
            result.push(v);
        }
    } else {
        for (let v = start; v > stop; v += step) {
            result.push(v);
        }
    }
    return result;
}
```

```js
range(10); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
range(5, 10); // [ 5, 6, 7, 8, 9 ]
range(1, 10, 2); // [ 1, 3, 5, 7, 9 ]
range(10, 0, -1) // [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
range(1, 5, 0.5); // [ 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5 ]
```
