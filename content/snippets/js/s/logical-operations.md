---
title: JavaScript Logical Operations
shortTitle: Logical Operations
language: javascript
tags: [math,logic,function]
cover: chess-pawns
excerpt: Get started with logical operations in JavaScript with this collection of helper functions.
listed: true
dateModified: 2023-05-07
---

Boolean logic and **logical operations** might not come up that often in JavaScript development, but when they do, you'll be glad you know how to use them. Let's explore some of the most common logical operations in JavaScript and how to implement them in a functional style.

## Logical AND

The **logical and** (`&&`) operator returns `true` if both operands are `true`, otherwise it returns `false`.

```js
const and = (a, b) => a && b;

and(true, true); // true
and(true, false); // false
and(false, false); // false
```

| a     | b     | a && b |
| ----- | ----- | ------ |
| true  | true  | true   |
| true  | false | false  |
| false | true  | false  |
| false | false | false  |

## Logical OR

The **logical or** (`||`) operator returns `true` if at least one of the operands is `true`, otherwise it returns `false`.

```js
const or = (a, b) => a || b;

or(true, true); // true
or(true, false); // true
or(false, false); // false
```

| a     | b     | a \|\| b |
| ----- | ----- | -------- |
| true  | true  | true     |
| true  | false | true     |
| false | true  | true     |
| false | false | false    |

## Logical NOT

The **logical not** (`!`) operator returns `true` if the operand is `false`, otherwise it returns `false`.

```js
const not = a => !a;

not(true); // false
not(false); // true
```

| a     | !a    |
| ----- | ----- |
| true  | false |
| false | true  |

## Logical XOR

The **logical xor** (`^`) operator returns `true` if exactly one of the operands is `true`, otherwise it returns `false`.

> [!NOTE]
>
> While JavaScript implements the XOR (`^`) operator, it's only for **bitwise operations**. It's not a logical operator, so it doesn't work with booleans. To implement a logical XOR operator, we can use a combination of the previous logical operators.

```js
const xor = (a, b) => (( a || b ) && !( a && b ));

xor(true, true); // false
xor(true, false); // true
xor(false, true); // true
xor(false, false); // false
```

| a     | b     | a ^ b |
| ----- | ----- | ----- |
| true  | true  | false |
| true  | false | true  |
| false | true  | true  |
| false | false | false |

## Logical NOR

The **logical nor** operator is a combination of the logical not and logical or operators. It returns `true` if none of the operands are `true`, otherwise it returns `false`.


```js
const nor = (a, b) => !(a||b);

nor(true, true); // false
nor(true, false); // false
nor(false, false); // true
```

| a     | b     | !(a \|\| b) |
| ----- | ----- | ----------- |
| true  | true  | false       |
| true  | false | false       |
| false | true  | false       |
| false | false | true        |

## Logical NAND

The **logical nand** operator is a combination of the logical not and logical and operators. It returns `true` if at least one of the operands is `false`, otherwise it returns `false`.

```js
const nand = (a, b) => !(a&&b);

nand(true, true); // false
nand(true, false); // true
nand(false, false); // true
```

| a     | b     | !(a && b) |
| ----- | ----- | --------- |
| true  | true  | false     |
| true  | false | true      |
| false | true  | true      |
| false | false | true      |

## Implementing logical operations with functions

The logical operations we've seen so far work with **boolean values**, but what if we want to use them with **functions**? For example, what if we want to check if both of two functions return `true` for a given set of arguments? We'll have to alter them in such a way that they work with functions. For example, here's the implementation of the logical and, or, and not operators for functions:

```js
// Logical and for functions
const both = (f, g) => (...args) => f(...args) && g(...args);
// Logical or for functions
const either = (f, g) => (...args) => f(...args) || g(...args);
// Logical not for functions
const complement = fn => (...args) => !fn(...args);
```

In fact, we can generalize this to implement any binary logical operator for functions, using [higher-order functions](/js/s/higher-order-functions).

```js
const logicalOperator =
  operatorFn =>
  (f, g) =>
  (...args) =>
    operatorFn(f(...args), g(...args));

const and = (a, b) => a && b;
const or = (a, b) => a || b;

const both = logicalOperator(and);
const either = logicalOperator(or);

const isEven = num => num % 2 === 0;
const isPositive = num => num > 0;
const isPositiveAndEven = both(isEven, isPositive);
const isPositiveOrEven = either(isEven, isPositive);

isPositiveAndEven(4); // true
isPositiveAndEven(-2); // false
isPositiveOrEven(4); // true
isPositiveOrEven(-2); // true
```
