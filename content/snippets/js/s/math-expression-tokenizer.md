---
title: Create a math expression tokenizer in JavaScript
shortTitle: Math expression tokenizer
language: javascript
tags: [math,algorithm]
cover: camper-school-bus
excerpt: Learn how to tokenize math expressions, using a simple JavaScript algorithm, forming the basis for more complex interpreters and compilers.
listed: true
dateModified: 2025-02-18
---

In the [previous article on Reverse Polish Notation](/js/s/parse-reverse-polish-notation), I skimmed over a pretty important detail, that of **math expression tokenization**. I thought I'd tackle this problem on its own, as it may help you understand the fundamental logic of building more complex interpreters and compilers.

> [!IMPORTANT]
>
> This article is **primarily a learning resource**. If you plan on using this in production, it's probably a good idea to use a battle-tested library. I won't give any recommendations, as I've never used one myself, but a quick search should yield some good results.

## Introduction

In the context of a math expression, a **token** is a **single unit of the expression**. It can be a number, an operator, a parenthesis, or any other symbol that makes up the expression. For example, in the expression `3 + 4`, the tokens are `3`, `+`, and `4`. **Tokens can span multiple characters**, such as floating-point numbers, multi-character operators, or even function names.

A **tokenizer** is a function that takes a math expression as input and returns an array of tokens. Instead of going all in, our tokenizer will be built in **smaller iterations**. We'll start with integers and operators, then add support for parentheses and floating-point numbers and, finally, negative numbers.

Our goal is to be able to tokenize the expression below and get the following tokens:

```js
tokenize('((1 + 20) * -3.14) /9');
// [
//   { type: 'PAREN_OPEN' },
//   { type: 'PAREN_OPEN' },
//   { type: 'NUMBER', value: 1 },
//   { type: 'OP_ADD' },
//   { type: 'NUMBER', value: 20 },
//   { type: 'PAREN_CLOSE' },
//   { type: 'OP_MULTIPLY' },
//   { type: 'NUMBER', value: -3.14 },
//   { type: 'PAREN_CLOSE' },
//   { type: 'OP_DIVIDE' },
//   { type: 'NUMBER', value: 9 }
// ]
```

_Why this expression?_ Because it contains a multitude of different tokens and edge cases that we'll need to learn to handle properly.

## Integers and operators

At its most basic form, a tokenizer reads an **input** (in this case a string) **one character at a time** and **groups them into tokens**. We'll start as simple as possible, implementing the tokenization of integers and operators.

```js
const TOKEN_TYPES = {
  NUMBER: 'NUMBER',
  OPERATOR: {
    '+': 'OP_ADD',
    '-': 'OP_SUBTRACT',
    '*': 'OP_MULTIPLY',
    '/': 'OP_DIVIDE',
  }
};

const OPERATORS = Object.keys(TOKEN_TYPES.OPERATOR);

const tokenize = expression => {
  const tokens = [];
  let buffer = '';

  // Flush the buffer, if it contains a valid number token
  const flushBuffer = () => {
    if (!buffer.length) return;

    const bufferValue = Number.parseFloat(buffer);
    if (Number.isNaN(bufferValue)) return;

    tokens.push({ type: TOKEN_TYPES.NUMBER, value: bufferValue });
    buffer = '';
  };

  [...expression].forEach(char => {
    // Skip whitespace
    if (char === ' ') {
      flushBuffer();
      return;
    }

    // If the character is a number, add it to the buffer
    if (!Number.isNaN(Number.parseInt(char))) {
      buffer += char;
      return;
    }

    // If the character is an operator, flush the buffer, add the operator token
    if (OPERATORS.includes(char)) {
      flushBuffer();
      tokens.push({ type: TOKEN_TYPES.OPERATOR[char] });
      return;
    }

    // If we reach here, it's an invalid character
    throw new Error(`Invalid character: ${char}`);
  });

  // Flush any remaining buffer
  flushBuffer();

  return tokens;
};
```

As you can see, the algorithm is based on a simple `Array.prototype.forEach()` that iterates over each character in the input expression. We add numbers to a **buffer**, and **flush the buffer** when we encounter an operator or a whitespace character. If we encounter an **invalid character**, we throw an error.

Let's test the tokenizer with a simple expression:

```js
tokenize('3 + 4');
// [
//   { type: 'NUMBER', value: 3 },
//   { type: 'OP_ADD' },
//   { type: 'NUMBER', value: 4 }
// ]
```

## Floating point numbers

Our current implementation will throw an error if there's even a single **unknown character**. The `.` character, used for floating point numbers, will trigger this error, too.

```js
tokenize('3.14 + 4');
// Error: Invalid character: .
```

Thus, in order to handle floating point numbers, we'll need to modify the tokenizer a little bit to allow for a single `.` character in the buffer.

```js
const tokenize = expression => {
  const tokens = [];
  let buffer = '';

  // Flush the buffer, if it contains a valid number token
  const flushBuffer = () => {
    if (!buffer.length) return;

    const bufferValue = Number.parseFloat(buffer);
    if (Number.isNaN(bufferValue)) return;

    tokens.push({ type: TOKEN_TYPES.NUMBER, value: bufferValue });
    buffer = '';
  };

  [...expression].forEach(char => {
    // Skip whitespace
    if (char === ' ') {
      flushBuffer();
      return;
    }

    // If the character is a number, add it to the buffer
    if (!Number.isNaN(Number.parseInt(char))) {
      buffer += char;
      return;
    }

    // If the character is a floating point, only add it if the buffer
    // doesn't already contain one, otherwise it's an invalid character
    if (char === '.' && !buffer.includes('.')) {
      buffer += char;
      return;
    }

    // If the character is an operator, flush the buffer, add the operator token
    if (OPERATORS.includes(char)) {
      flushBuffer();
      tokens.push({ type: TOKEN_TYPES.OPERATOR[char] });
      return;
    }

    // If we reach here, it's an invalid character
    throw new Error(`Invalid character: ${char}`);
  });

  // Flush any remaining buffer
  flushBuffer();

  return tokens;
};
```

Now, the tokenizer will correctly handle floating point numbers, but throw an error if there are multiple `.` characters in the buffer (same number).

```js
tokenize('3.14 + 4');
// [
//   { type: 'NUMBER', value: 3.14 },
//   { type: 'OP_ADD' },
//   { type: 'NUMBER', value: 4 }
// ]

tokenize('3.14.15 + 4');
// Error: Invalid character: .
```

## Parentheses

The next step is to add support for parentheses. We'll treat them as separate tokens, as they're used to group expressions. We'll not be adding any **validation** for now, but you can read more about this problem in the [article about bracket pair matching](/js/s/find-matching-bracket-pairs).

```js
const TOKEN_TYPES = {
  NUMBER: 'NUMBER',
  OPERATOR: {
    '+': 'OP_ADD',
    '-': 'OP_SUBTRACT',
    '*': 'OP_MULTIPLY',
    '/': 'OP_DIVIDE',
  },
  PARENTHESIS: {
    '(': 'PAREN_OPEN',
    ')': 'PAREN_CLOSE',
  }
};

const OPERATORS = Object.keys(TOKEN_TYPES.OPERATOR);
const PARENTHESES = Object.keys(TOKEN_TYPES.PARENTHESIS);

const tokenize = expression => {
  const tokens = [];
  let buffer = '';

  // Flush the buffer, if it contains a valid number token
  const flushBuffer = () => {
    if (!buffer.length) return;

    const bufferValue = Number.parseFloat(buffer);
    if (Number.isNaN(bufferValue)) return;

    tokens.push({ type: TOKEN_TYPES.NUMBER, value: bufferValue });
    buffer = '';
  };

  [...expression].forEach(char => {
    // Skip whitespace
    if (char === ' ') {
      flushBuffer();
      return;
    }

    // If the character is a number, add it to the buffer
    if (!Number.isNaN(Number.parseInt(char))) {
      buffer += char;
      return;
    }

    // If the character is a floating point, only add it if the buffer
    // doesn't already contain one, otherwise it's an invalid character
    if (char === '.' && !buffer.includes('.')) {
      buffer += char;
      return;
    }

    // If the character is an operator, flush the buffer, add the operator token
    if (OPERATORS.includes(char)) {
      flushBuffer();
      tokens.push({ type: TOKEN_TYPES.OPERATOR[char] });
      return;
    }

    // If the character is a parenthesis, flush the buffer,
    // add the parenthesis token
    if (PARENTHESES.includes(char)) {
      flushBuffer();
      tokens.push({ type: TOKEN_TYPES.PARENTHESIS[char] });
      return;
    }

    // If we reach here, it's an invalid character
    throw new Error(`Invalid character: ${char}`);
  });

  // Flush any remaining buffer
  flushBuffer();

  return tokens;
};
```

Now, our tokenizer correctly handles parentheses, but won't validate if they're paired.

```js
tokenize('(3 + 4) * 5');
// [
//   { type: 'PAREN_OPEN' },
//   { type: 'NUMBER', value: 3 },
//   { type: 'OP_ADD' },
//   { type: 'NUMBER', value: 4 },
//   { type: 'PAREN_CLOSE' },
//   { type: 'OP_MULTIPLY' },
//   { type: 'NUMBER', value: 5 }
// ]

tokenize('((3 + 4)');
// [
//   { type: 'PAREN_OPEN' },
//   { type: 'PAREN_OPEN' },
//   { type: 'NUMBER', value: 3 },
//   { type: 'OP_ADD' },
//   { type: 'NUMBER', value: 4 }
//   { type: 'PAREN_CLOSE' }
// ]
```

## Negative numbers

Up until this point, we've only been handling positive numbers. To support negative numbers, we need to **differentiate between a subtraction operator and a negative sign**. We'll do this by checking if the `-` character is preceded by an operator, a parenthesis, or the start of the expression.

```js
const TOKEN_TYPES = {
  NUMBER: 'NUMBER',
  OPERATOR: {
    '+': 'OP_ADD',
    '-': 'OP_SUBTRACT',
    '*': 'OP_MULTIPLY',
    '/': 'OP_DIVIDE',
  },
  PARENTHESIS: {
    '(': 'PAREN_OPEN',
    ')': 'PAREN_CLOSE',
  }
};

const OPERATORS = Object.keys(TOKEN_TYPES.OPERATOR);
const OPERATOR_TYPES = Object.values(TOKEN_TYPES.OPERATOR);
const PARENTHESES = Object.keys(TOKEN_TYPES.PARENTHESIS);
const PARENTHESIS_TYPES = Object.values(TOKEN_TYPES.PARENTHESIS);

const tokenIsOperator = token =>
  token && OPERATOR_TYPES.includes(token.type);
const tokenIsParenthesis = token =>
  token && PARENTHESIS_TYPES.includes(token.type);

const tokenize = expression => {
  const tokens = [];
  let buffer = '';

  // Flush the buffer, if it contains a valid number token
  const flushBuffer = () => {
    if (!buffer.length) return;

    const bufferValue = Number.parseFloat(buffer);
    if (Number.isNaN(bufferValue)) return;

    tokens.push({ type: TOKEN_TYPES.NUMBER, value: bufferValue });
    buffer = '';
  };

  [...expression].forEach((char) => {
    // Skip whitespace
    if (char === ' ') {
      flushBuffer();
      return;
    }

    // If the character is a number, add it to the buffer
    if (!Number.isNaN(Number.parseInt(char))) {
      buffer += char;
      return;
    }

    // If the character is a floating point, only add it if the buffer
    // doesn't already contain one, otherwise it's an invalid character
    if (char === '.' && !buffer.includes('.')) {
      buffer += char;
      return;
    }

    // If the character is a negative sign, flush the buffer, check if it's
    // a negative number (first token or after an operator/parenthesis)
    if (char === '-') {
      flushBuffer();
      const lastToken = tokens[tokens.length - 1];

      if (
        !lastToken ||
        tokenIsOperator(lastToken) ||
        tokenIsParenthesis(lastToken)
      ) {
        buffer += char;
        return;
      }
    }

    // If the character is an operator, flush the buffer, add the operator token
    if (OPERATORS.includes(char)) {
      flushBuffer();
      tokens.push({ type: TOKEN_TYPES.OPERATOR[char] });
      return;
    }

    // If the character is a parenthesis, flush the buffer,
    // add the parenthesis token
    if (PARENTHESES.includes(char)) {
      flushBuffer();
      tokens.push({ type: TOKEN_TYPES.PARENTHESIS[char] });
      return;
    }

    // If we reach here, it's an invalid character
    throw new Error(`Invalid character: ${char}`);
  });

  // Flush any remaining buffer
  flushBuffer();

  return tokens;
};
```

Notice that the check for the negative sign may result in the `lastToken` indicating it's **not a negative sign** and continue to the operator check. This is intentional, so that both cases can be handled without problems.

While the logic for the negative numbers may seem a little convoluted, here are all the sample expressions I could think of, each with a different edge case:

```js
tokenize('-3 + 4');
// [
//   { type: 'NUMBER', value: -3 },
//   { type: 'OP_ADD' },
//   { type: 'NUMBER', value: 4 }
// ]

tokenize('  -3-4');
// [
//   { type: 'NUMBER', value: -3 },
//   { type: 'OP_SUBTRACT' },
//   { type: 'NUMBER', value: 4 }
// ]

tokenize('3 + -4');
// [
//   { type: 'NUMBER', value: 3 },
//   { type: 'OP_ADD' },
//   { type: 'NUMBER', value: -4 }
// ]

tokenize('3 * (-4 + 5)');
// [
//   { type: 'NUMBER', value: 3 },
//   { type: 'OP_MULTIPLY' },
//   { type: 'PAREN_OPEN' },
//   { type: 'NUMBER', value: -4 },
//   { type: 'OP_ADD' },
//   { type: 'NUMBER', value: 5 },
//   { type: 'PAREN_CLOSE' }
// ]
```

Now, we can finally tokenize the complex math expression we started with:

```js
tokenize('((1 + 20) * -3.14) /9');
// [
//   { type: 'PAREN_OPEN' },
//   { type: 'PAREN_OPEN' },
//   { type: 'NUMBER', value: 1 },
//   { type: 'OP_ADD' },
//   { type: 'NUMBER', value: 20 },
//   { type: 'PAREN_CLOSE' },
//   { type: 'OP_MULTIPLY' },
//   { type: 'NUMBER', value: -3.14 },
//   { type: 'PAREN_CLOSE' },
//   { type: 'OP_DIVIDE' },
//   { type: 'NUMBER', value: 9 }
// ]
```

## Conclusion

I hope this article gave you a little peek into the world of tokenization and how simple logic can transform a string into a structured array of tokens. This is the basis for more complex problems, and understanding this process is crucial for building your own interpreters and compilers in the future.

If you're feeling up to it, try your hand at math functions, such as `sin()` and `cos()`, variables, or even more complex operators. It's a fun exercise and you can come up with all sorts of edge cases that need handling!
