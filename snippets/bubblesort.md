---
title: bubbleSort
tags: array,beginner
---

Bubble sort algorithm.

- O(n²) complexity in worst case.
- O(n) complexity in optimal case.

```js
bubbleSort = (inputArr) => {
    const len = inputArr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len; i++) {
            if (inputArr[i] > inputArr[i + 1]) {
                const tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
    return inputArr;
}
```

```js
bubbleSort([1,0,12,41,3,20]); // [0, 1, 3, 12, 20, 41]
bubbleSort(['f','a','zoo','foo','bar']); // ["a", "bar", "f", "foo", "zoo"]
```
