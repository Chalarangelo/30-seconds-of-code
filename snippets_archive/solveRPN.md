---
title: solveRPN
tags: algorithm,advanced
---

Solves the given mathematical expression in [reverse polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation).
Throws appropriate errors if there are unrecognized symbols or the expression is wrong. The valid operators are :- `+`,`-`,`*`,`/`,`^`,`**` (`^`&`**` are the exponential symbols and are same). This snippet does not supports any unary operators.

Use a dictionary, `OPERATORS` to specify each operator's matching mathematical operation.
Use `String.prototype.replace()` with a regular expression to replace `^` with `**`, `String.prototype.split()` to tokenize the string and `Array.prototype.filter()` to remove empty tokens.
Use `Array.prototype.forEach()` to parse each `symbol`, evaluate it as a numeric value or operator and solve the mathematical expression.
Numeric values are converted to floating point numbers and pushed to a `stack`, while operators are evaluated using the `OPERATORS` dictionary and pop elements from the `stack` to apply operations.

```js
const solveRPN = rpn => {
  const OPERATORS = {
    '*': (a, b) => a * b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    '**': (a, b) => a ** b
  };
  const [stack, solve] = [
    [],
    rpn
      .replace(/\^/g, '**')
      .split(/\s+/g)
      .filter(el => !/\s+/.test(el) && el !== '')
  ];
  solve.forEach(symbol => {
    if (!isNaN(parseFloat(symbol)) && isFinite(symbol)) {
      stack.push(symbol);
    } else if (Object.keys(OPERATORS).includes(symbol)) {
      const [a, b] = [stack.pop(), stack.pop()];
      stack.push(OPERATORS[symbol](parseFloat(b), parseFloat(a)));
    } else {
      throw `${symbol} is not a recognized symbol`;
    }
  });
  if (stack.length === 1) return stack.pop();
  else throw `${rpn} is not a proper RPN. Please check it and try again`;
};
```

```js
solveRPN('15 7 1 1 + - / 3 * 2 1 1 + + -'); // 5
solveRPN('2 3 ^'); // 8
```