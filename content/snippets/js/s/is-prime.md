---
title: Check if a number is prime in JavaScript
shortTitle: Number is prime
language: javascript
tags: [math,algorithm]
cover: thread
excerpt: Learn how to check if a number is prime and how to generate prime numbers up to a given number in JavaScript.
listed: true
dateModified: 2024-01-25
---

Checking for **prime numbers** is a common task in mathematics and computer science. It's also pretty common in coding interviews and challenges. Let's see how to check if a number is prime and how to generate prime numbers up to a given number.

## Check if a number is prime

To check if an integer is a prime number, we can simply use a `for` loop. Inside the loop we can check if the number is **divisible** by any number from `2` to the **square root of the given number**. If such a number is found, we can return `false`. If no such number is found, we can return `true`, unless the number is less than `2`.

```js
const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

isPrime(11); // true
```

> [!NOTE]
>
> This code snippet may be fairly **inefficient for very large numbers**. Optimizations are possible, but they are beyond the scope of this article.

## Generate primes up to a given number

Using the [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) algorithm, we can **generate primes** up to a given number. The algorithm works as follows:

- Generate an array from `2` to the given number.
- Use `Array.prototype.filter()` to filter out the values divisible by any number from `2` to the square root of the provided number.

```js
const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

primes(10); // [2, 3, 5, 7]
```
