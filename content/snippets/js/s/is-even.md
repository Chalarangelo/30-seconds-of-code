---
title: Check if a number is even
shortTitle: isEven
language: javascript
tags: [math,number,basic]
cover: image
excerpt: Checks if a given number is an even integer using the modulus operator.
listed: true
dateModified: 2025-07-23
---

### isEven

Checking whether a number is even is a basic but important operation in programming.  
An **even number** is an **integer** that is **divisible by 2** without a remainder.

Here’s how to check if a number is both an **integer** and **even** in JavaScript.

```js
const isEven = num => Number.isInteger(num) && num % 2 === 0;

isEven(4);     // true (valid even integer)
isEven(7);     // false (odd integer)
isEven(2.5);   // false (not an integer)
isEven("6");   // false (string, not number)
```

### 🧠 How It Works

1. `Number.isInteger(num)` checks if the input is a **valid integer**.
2. `num % 2 === 0` checks if the number is divisible by 2.
3. Both conditions must be true for the number to be considered even.

This makes the check **safer** and more **robust**, especially when working with **user input**, APIs, or dynamic data.

### ✅ Example Use Cases

- Filtering only even numbers in a list.
- Making sure input values are whole even numbers (e.g., seats, scores).
- Validating data from user forms.

### ⚠️ Note

If you want to **allow floats** like `4.0` as even (because technically `4.0 % 2 === 0`), you can skip `Number.isInteger()` — but that depends on your use case.
