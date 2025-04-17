---
title: JavaScript Operator Cheatsheet
shortTitle: Operator Cheatsheet
language: javascript
tags: [type,math,comparison]
cover: dying-flowers
excerpt: Quick reference for JavaScript operators.
listed: true
dateModified: 2025-05-07
---

> [!IMPORTANT]
>
> This article serves as a **quick reference for JavaScript's symbolic operators**, helping newcomers to the language by giving them an easily searchable name for them. If you're looking for the full operator reference for the language, you should probably check out the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators).

## Assignment operator

The assignment operator (`=`) assigns a value to a variable.

```js
let x = 5; // Assigns the value 5 to x
```

## Equality comparison operators

JavaScript equality comes in two flavors:

- `==` (loose equality) & `!=` (loose inequality)
- `===` (strict equality) & `!==` (strict inequality)

```js
// Loose equality
10 == '10'; // true
10 != '10'; // false

// Strict equality
10 === '10'; // false
10 !== '10'; // true
```

@[Further reading](/js/s/equality)

## Comparison operators

Comparison operators compare two values, much like in math:

- `>`: greater than
- `<`: less than
- `>=`: greater than or equal to
- `<=`: less than or equal to

```js
const a = 5;
const b = 10;
a > b;  // false
a < b;  // true
a >= b; // false
a <= b; // true
```

## Math operators

Math operators are pretty much exactly what you'd expect. They perform basic arithmetic operations:

- `+`: addition (binary) or casting to number (unary)
- `-`: subtraction (binary) or negation (unary)
- `*`: multiplication
- `/`: division
- `%`: modulo (remainder of integer division)
- `**`: exponentiation (equivalent to `Math.pow()`)

```js
const a = 5;
const b = 2;

const sum = a + b;          // 7
const difference = a - b;   // 3
const product = a * b;      // 10
const quotient = a / b;     // 2.5
const remainder = a % b;    // 1
const exponent = a ** b;    // 25
const negation = -a;        // -5
```

### Math assignment operators

A similar, set of operators combines assignment (`=`) with the math operators. These are shorthand for the longer forms:

- `+=`: addition assignment
- `-=`: subtraction assignment
- `*=`: multiplication assignment
- `/=`: division assignment
- `%=`: modulo assignment
- `**=`: exponentiation assignment

```js
let a = 5;
let b = 2;
a += b;     // a = a + b; a is now 7
a -= b;     // a = a - b; a is now 5
a *= b;     // a = a * b; a is now 10
a /= b;     // a = a / b; a is now 5
a %= b;     // a = a % b; a is now 1
a **= b;    // a = a ** b; a is now 25
```

### Increment & decrement operators

The increment (`++`) and decrement (`--`) operators are shorthand for adding or subtracting 1 from a variable. They can be used in two ways:

- **Prefix**: `++a` or `--a` (increments/decrements the variable before using it)
- **Postfix**: `a++` or `a--` (increments/decrements the variable after using it)

```js
let a = 5;
let b = 5;
let c = ++a;  // a is now 6, c is 6
let d = b++;  // b is now 6, d is 5
let e = --a;  // a is now 5, e is 5
let f = b--;  // b is now 5, f is 6
```


## String concatenation operator

Apart from other usage mentioned above, the `+` operator can also be used to concatenate strings.

```js
const str1 = 'Hello';
const str2 = 'World';
const greeting = str1 + ' ' + str2; // 'Hello World'
```

## Logical operators

Logical operators are used to combine or negate boolean values:

- `&&`: logical AND
- `||`: logical OR
- `!`: logical NOT

```js
const a = true;
const b = false;
const c = a && b;   // false (both must be true)
const d = a || b;   // true (at least one must be true)
const e = !a;       // false (negates the value)
```

@[Further reading](/js/s/truthy-falsy-values)

### Logical assignment operators

Logical assignment operators combine logical operations with assignment. They are shorthand for the longer forms:

- `&&=`: logical AND assignment (assigns the value if the left operand is truthy)
- `||=`: logical OR assignment (assigns the value if the left operand is falsy)

```js
let a = true;
let b = false;
let c = true;

a &&= b;  // a is now false (b is assigned to a)
b ||= c;  // b is now true  (c is assigned to b)
```

@[Further reading](/js/s/logical-operations)

### Double negation operator

The double NOT (`!!`) is not technically an operator, but provides a way to convert a value to its boolean equivalent. It negates the value twice, effectively converting it to a boolean.

```js
const str = 'Hello';
const isNotEmpty = !!str; // true

const num = 0;
const isNotZero = !!num; // false
```

## Ternary operator

The ternary operator (`?`) is a shorthand for an `if...else` statement. It takes three operands:

- A condition to evaluate
- The value to return if the condition is `true`
- The value to return if the condition is `false`

```js
const age = 18;
const canVote = age >= 18 ? 'Yes' : 'No'; // 'Yes'
```

@[Further reading](/js/s/ternary-operator)

## Spread operator

The spread operator (`...`) is used to expand an iterable (like an array or object) into its individual elements. It can be used in function calls, array literals, and object literals.

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];    // [1, 2, 3, 4, 5]

const obj = { a: 1, b: 2 };
const newObj = { ...obj, c: 3 };  // { a: 1, b: 2, c: 3 }
```

@[Further reading](/js/s/spread-rest-syntax)


## Bitwise operators

Bitwise operators perform operations on the binary representations of numbers. They are not commonly used in JavaScript, but they can be useful in certain situations:

- `&`: bitwise AND
- `|`: bitwise OR
- `^`: bitwise XOR
- `~`: bitwise NOT
- `<<`: left shift
- `>>`: right shift
- `>>>`: unsigned right shift

```js
const a = 5;        // 0101 in binary
const b = 3;        // 0011 in binary

const c = a & b;    // 0001 (1 in decimal)
const d = a | b;    // 0111 (7 in decimal)
const e = a ^ b;    // 0110 (6 in decimal)
const f = ~a;       // 1010 (inverts all bits)
const g = a << 1;   // 1010 (10 in decimal)
const h = a >> 1;   // 0010 (2 in decimal)
const i = a >>> 1;  // 0010 (2 in decimal)
```

### Bitwise assignment operators

Bitwise assignment operators combine bitwise operations with assignment. They are shorthand for the longer forms:
- `&=`: bitwise AND assignment
- `|=`: bitwise OR assignment
- `^=`: bitwise XOR assignment
- `<<=`: left shift assignment
- `>>=`: right shift assignment
- `>>>=`: unsigned right shift assignment

```js
let a = 5;  // 0101 in binary
let b = 3;  // 0011 in binary

a &= b;     // a = a & b; a is now 1 (0001 in binary)
a |= b;     // a = a | b; a is now 3 (0011 in binary)
a ^= b;     // a = a ^ b; a is now 0 (0000 in binary)
a <<= 1;    // a = a << 1; a is now 0 (0000 in binary)
a >>= 1;    // a = a >> 1; a is still 0 (0000 in binary)
a >>>= 1;   // a = a >>> 1; a is still 0 (0000 in binary)
```

## Nullish coalescing operator

The nullish coalescing operator (`??`) returns the right-hand operand when the left-hand operand is `null` or `undefined`. It is useful for providing default values.

```js
const a = null;
const b = 5;
const c = a ?? b; // 5 (a is null)
const d = 0;
const e = d ?? b; // 0 (d is not null or undefined)
```

@[Further reading](/js/s/nullish-coalescing-optional-chaining#nullish-coalescing)

### Nullish assignment operator

The nullish assignment operator (`??=`) assigns the right-hand operand to the left-hand operand only if the left-hand operand is `null` or `undefined`.

```js
let a = null;
let b = 5;
a ??= b;  // a is now 5 (a was null)
let c = 0;
c ??= b;  // c is still 0 (c was not null or undefined)
```

## Property access operator

The property access operator (`.`) is used to access properties of objects. It can also be used to call methods on objects.

```js
const obj = { a: 1 };
const value = obj.a; // 1
```

## Optional chaining operator

The optional chaining operator (`?.`) allows you to safely access deeply nested properties of an object without having to check if each property in the chain exists. If any property in the chain is `null` or `undefined`, it returns `undefined` instead of throwing an error.

```js
const obj = { a: { b: { c: 1 } } };
const value = obj?.a?.b?.c;   // 1
const value2 = obj?.a?.b?.d;  // undefined (no error thrown)
```

@[Further reading](/js/s/nullish-coalescing-optional-chaining#optional-chaining)

## Comma operator

The comma operator (`,`) evaluates each of its operands (from left to right) and returns the value of the last operand.

```js
const a = (1, 2, 3);      // a is 3
```

## Arrow function operator

While not technically an operator, it's often confused with one. The arrow function syntax (`=>`) is a shorthand for writing function expressions. It allows you to create anonymous functions in a more concise way.

```js
const add = (a, b) => a + b; // Arrow function
add(2, 3); // 5
```

@[Further reading](/js/s/arrow-functions)
