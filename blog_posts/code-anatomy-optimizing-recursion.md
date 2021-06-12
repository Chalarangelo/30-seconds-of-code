---
title: Code Anatomy - Optimizing recursive functions
type: story
tags: javascript,recursion,performance
authors: chalarangelo
cover: blog_images/case-study.jpg
excerpt: Recursive code has a tendency of being inefficient and can leave a lot of space for optimization. Learn a couple of tricks we use to speed up our recursive functions.
---

### Recursive functions

Recursion is a programming technique where the final solution is computed by breaking down the problem into smaller instances of the same problem and computing the solution for each one. The most common implementation is a function that calls itself, reducing the problem every time until it reaches an instance of the problem whose solution is either trivial to compute or already known. Let's look at a very well-known example, calculating the `n`th term of the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number), implemented using recursion in JavaScript:

```js
const fibonacciNumber = n =>
  n < 2 ? fibonacciNumber(n - 1) + fibonacciNumber(n - 2) : n;
```

To understand recursion better, let's add a `console.log()` call before each `return` and figure out what exactly is happening:

```js
const fibonacciNumber = n => {
  console.log(`[CALLED] fibonacciNumber(${n})`);
  const r = n >= 2 ? fibonacciNumber(n - 1) + fibonacciNumber(n - 2) : n;
  console.log(`[RETURN] ${r} for n=${n}`);
  return r;
}

fibonacciNumber(4);
// [CALLED] fibonacciNumber(4)
// [CALLED] fibonacciNumber(3)
// [CALLED] fibonacciNumber(2)
// [CALLED] fibonacciNumber(1)
// [RETURN] 1 for n=1
// [CALLED] fibonacciNumber(0)
// [RETURN] 0 for n=0
// [RETURN] 1 for n=2
// [CALLED] fibonacciNumber(1)
// [RETURN] 1 for n=1
// [RETURN] 2 for n=3
// [CALLED] fibonacciNumber(2)
// [CALLED] fibonacciNumber(1)
// [RETURN] 1 for n=1
// [CALLED] fibonacciNumber(0)
// [RETURN] 0 for n=0
// [RETURN] 1 for n=2
// [RETURN] 3 for n=4
```

As you can see, for each value of `n`, `fibonacciNumber` will be called twice, once with `n - 1` and once with `n - 2` and this will continue until it's called with either `1` or `0`. While this is straightforward to write and understand, it is inefficient as it will have to calculate the same value more than once.

### Calculation memoization

The solution to this problem, and the first trick that you can use to speed up recursive functions, is to use memoization. We already published [a great blog post on memoization](https://www.30secondsofcode.org/blog/s/javascript-memoization/) a little while back, so be sure to check it out to learn more about the subject. Here's our `fibonacciNumber` function, using memoization:

```js
const fibonacciCache = new Map();

const fibonacciNumber = n => {
  console.log(`[CALL] fibonacciNumber(${n})`);
  const cacheKey = `${n}`;
  let r;
  if(fibonacciCache.has(cacheKey)) {
    r = fibonacciCache.get(cacheKey);
    console.log(`[MEMO] Cache hit for ${n}: ${r}`);
  }
  else {
    r = n >= 2 ? fibonacciNumber(n - 1) + fibonacciNumber(n - 2) : n;
    fibonacciCache.set(cacheKey, r);
    console.log(`[CALC] Computed and stored value for ${n}: ${r}`);
  }
  return r;
}

fibonacciNumber(4);
// [CALL] fibonacciNumber(4)
// [CALL] fibonacciNumber(3)
// [CALL] fibonacciNumber(2)
// [CALL] fibonacciNumber(1)
// [CALC] Computed and stored value for 1: 1
// [CALL] fibonacciNumber(0)
// [CALC] Computed and stored value for 0: 0
// [CALC] Computed and stored value for 2: 1
// [CALL] fibonacciNumber(1)
// [MEMO] Cache hit for 1: 1
// [CALC] Computed and stored value for 3: 2
// [CALL] fibonacciNumber(2)
// [MEMO] Cache hit for 2: 1
// [CALC] Computed and stored value for 4: 3
```

As you can see in the example above, the value for each `n` is only computed once. While the Fibonacci sequence doesn't require any costly calculations, this could make a huge difference for a more computationally expensive problem. It will also be a lot more noticeable for higher values of `n` where the number of calculations will increase significantly.

### Using iteration

The second and final trick stems from the very definition of recursive programming turned on its head. If we can solve a smaller instance of the problem and use it for the solution of a larger instance of the problem, it should be possible to work iteratively from the smaller problem to the larger one, instead of recursively. Here's this idea in practice for our `fibonacciNumber` function:

```js
const fibonacciNumber = n => {
  let r = 0, l = 1, s = 0;
  for(let i = 0; i < n; i++) {
    r = l;
    l = s;
    s = r + l;
    console.log(`[CALC] i = ${i}: r = ${r}, l = ${l}, s = ${s}`);
  }
  return s;
}

fibonacciNumber(4);
// [CALC] i = 0: r = 1, l = 0, s = 1
// [CALC] i = 1: r = 0, l = 1, s = 1
// [CALC] i = 2: r = 1, l = 1, s = 2
// [CALC] i = 3: r = 1, l = 2, s = 3
```

The iterative solution above makes the same calculations as the memoized one, however it performs better due to two key reasons. First of all, there is no cache, which would take up space in memory, making the latter implementation require fewer resources. Similarly, as there are no recursive calls or checks for cache hits, the code performs better and requires fewer resources to execute.

However, you have to bear in mind what the actual use cases of your recursive code are and be very careful how you optimize them. Memoization can be a more powerful tool if a recursive function is called multiple times with different arguments, as its cache persists between calls, while iteration can be faster for recursive computations that are used less frequently. Always pay attention to your code and optimize for the cases you know or anticipate to be more common.
