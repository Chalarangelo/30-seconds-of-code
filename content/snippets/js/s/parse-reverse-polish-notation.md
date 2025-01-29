---
title: How can I parse Reverse Polish Notation in JavaScript?
shortTitle: Reverse Polish Notation
language: javascript
tags: [math,algorithm]
cover: flower-camera
excerpt: Parsing Reverse Polish Notation, also known as postfix notation, is a simple algorithm that can be implemented in JavaScript using a stack.
listed: true
dateModified: 2025-02-15
discussion: 2097
---

**Reverse Polish Notation** (RPN), also known as **postfix notation**, is a mathematical notation in which **every operator follows all of its operands**. This is in contrast to the more common **infix notation**, where **operators are placed between operands**.

If you're not familiar, it's better to show you a few examples:

| Infix Expression | RPN Expression |
| ---------------- | -------------- |
| `3 + 4`          | `3 4 +`        |
| `(3 + 4) * 5`    | `3 4 + 5 *`    |
| `3 + 4 - 5 * 6 / 8` | `3 4 + 5 6 * 8 / -` |


## Parse Reverse Polish Notation

Parsing Reverse Polish Notation isn't a particularly difficult task. The key lies in the **order of the operands and operators**. Whenever you encounter an operator, you're guaranteed to have two operands before it, either directly before it or further back as a result of previous operations.

_But how can we implement this in JavaScript?_ you may be asking. If you've read my previous [article](/js/s/find-matching-bracket-pairs), you may guess that we can use a **stack** to keep track of the operands and operators. And you'd be right!

> [!TIP]
>
> If you want to **learn more about stacks**, check out the previous article on the [Stack data structure](/js/s/data-structures-stack) and its JavaScript implementation.

All we have to do is parse each token in the RPN expression and push it to the stack. If we encounter an operator, we pop the last two operands from the stack, perform the operation, and push the result back to the stack. We repeat this process until the entire expression has been parsed, and we're left with a single value in the stack, which is the result of evaluating the RPN expression.

```js
// Define the operands and their corresponding functions
const operands = {
  '+': (b, a) => a + b,
  '-': (b, a) => a - b,
  '*': (b, a) => a * b,
  '/': (b, a) => a / b
};

const parseRPN = expression => {
  // If the expression is empty, return 0
  if (!expression.trim()) return 0;

  // Split the expression by whitespace
  const tokens = expression.split(/\s+/g);

  // Reduce the tokens array to a single value
  return +tokens.reduce((stack, current) => {
    // If the current token is an operator, pop the last two operands
    //  and perform the operation, then push the result back to the stack.
    // Otherwise, push the current token to the stack.
    if (current in operands)
      stack.push(operands[current](+stack.pop(), +stack.pop()));
    else stack.push(current);

    return stack;
  }, []).pop();
};

parseRPN('3 4 +'); // 7
parseRPN('3 4 + 5 *'); // 35
parseRPN('3 4 + 5 6 * 8 / -'); // 3.25
```

> [!NOTE]
>
> **Tokenization** isn't an issue here, as we can split the RPN expression by spaces to get an array of tokens. However, I'm interested in writing a tokenization article soon, so stay tuned for that! We'll also not worry about **error handling** for now, but I'm sure you can easily fit it in.

The implementation is pretty simple, using an **array** as a stack to keep track of the operands and operators. We then use `Array.prototype.reduce()` to **reduce the tokens** to a single value, popping the last two operands whenever we encounter an operator.

The trickiest part, if you can call it that, is the **order of operands when performing the operation**. We need to be careful about the order of the operands when popping them from the stack. As the first operand to be popped from the stack should be the second operand in the operation, we need to **reverse the order** when performing the operation, thus resulting in the correct order. If that doesn't make sense, take a look at how the subtraction or division operations are implemented.

## Parse Polish Notation

**Polish Notation** (PN), also known as **prefix notation**, is very similar to Reverse Polish Notation, but the operators **precede their operands**. This means that the operator comes before the operands, which makes it easier to parse.

| Infix Expression | RPN Expression | PN Expression |
| ---------------- | -------------- | -------------- |
| `3 + 4`          | `3 4 +`        | `+ 3 4`        |
| `(3 + 4) * 5`    | `3 4 + 5 *`    | `* + 3 4 5`    |
| `3 + 4 - 5 * 6 / 8` | `3 4 + 5 6 * 8 / -` | `- + 3 4 / * 5 6 8` |

Having already implemented the Reverse Polish Notation parser, we can easily convert it to parse Polish Notation by using `Array.prototype.reduceRight()` instead of `Array.prototype.reduce()` and **reversing the order of the operands** when performing the operation, resulting in the opposite order than in RPN.

```js
// Define the operands and their corresponding functions
const operands = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
};

const parsePN = expression => {
  // If the expression is empty, return 0
  if (!expression.trim()) return 0;

  // Split the expression by whitespace
  const tokens = expression.split(/\s+/g);

  // Reduce the tokens array to a single value
  return +tokens.reduceRight((stack, current) => {
    // If the current token is an operator, pop the last two operands
    //  and perform the operation, then push the result back to the stack.
    // Otherwise, push the current token to the stack.
    if (current in operands)
      stack.push(operands[current](+stack.pop(), +stack.pop()));
    else stack.push(current);

    return stack;
  }, []).pop();
};

parsePN('+ 3 4'); // 7
parsePN('* + 3 4 5'); // 35
parsePN('- + 3 4 / * 5 6 8'); // 3.25
```

## Convert Infix Notation to RPN

Converting an **infix expression to Reverse Polish Notation** is a bit more complicated than parsing RPN. However, this problem has been long solved by Edsger Dijkstra in the form of the [**shunting yard algorithm**](https://en.wikipedia.org/wiki/Shunting_yard_algorithm).

Instead of going over the details of the algorithm, which I'm sure you can easily find online, I'll provide a simple JavaScript implementation of the algorithm to convert an infix expression to RPN.

> [!IMPORTANT]
>
> Some parts of the algorithm, such as functions and right-associative operators, are **omitted for simplicity**. This implementation is meant as a starting point, implementing just the **four basic arithmetic operators**, as well as single parentheses (e.g. `((3 + 4) * 5)` wont't work). Again, **tokenization and error handling** are not the focus here, but I may cover them in a future article.

```js
// Define the operator precedence
const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

const toRPN = expression => {
  // Tokenize the expression, splitting by whitespace first and processing
  //  individual tokens to handle parentheses and negative numbers.
  const tokens = expression.split(/\s+/g).reduce((tokens, token) => {
    if (token.match(/^-?\d+$/)) tokens.push(token);
    else if (token in precedence) tokens.push(token);
    else if (token.startsWith('(')) tokens.push('(', token.slice(1));
    else if (token.endsWith(')')) tokens.push(token.slice(0, -1), ')');

    return tokens;
  }, []);

  // Reduce the tokens array to an output array and a stack array
  const { output, stack } = tokens.reduce(
    ({ output, stack }, token) => {
      if (token in precedence) {
        // If the token is an operator, pop operators from the stack with higher
        //  or equal precedence and push them to the output array. Then, push
        //  the current operator to the stack.
        while (precedence[stack[stack.length - 1]] >= precedence[token])
          output.push(stack.pop());
        stack.push(token);
      } else if (token === '(') {
        // If the token is an opening parenthesis, push it to the stack.
        stack.push(token);
      } else if (token === ')') {
        // If the token is a closing parenthesis, pop operators from the stack
        //  until an opening parenthesis is encountered and push them to the
        //  output array.
        while (stack[stack.length - 1] !== '(') output.push(stack.pop());
        stack.pop();
      } else {
        // If the token is an operand, push it to the output array.
        output.push(token);
      }

      return { output, stack };
    },
    { output: [], stack: [] }
  );

  // Return the output array concatenated with the reversed stack array.
  return output.concat(stack.reverse()).join(' ');
};

toRPN('3 + 4'); // 3 4 +
toRPN('(3 + 4) * 5'); // 3 4 + 5 *
toRPN('3 + 4 - (5 * 6) / 8'); // 3 4 + 5 6 * 8 / -
```

The implementation is a bit more complex than the RPN parser, but it's still quite simple. We tokenize the expression, then reduce the tokens array to an output and stack array, following the rules of the shunting yard algorithm. Finally, we return the output array concatenated with the reversed stack array, as the stack may still contain operators.

## Conclusion

In this article, we took a brief, yet enlightening look at parsing Reverse Polish Notation in JavaScript. We implemented a simple RPN parser using a stack and the four basic arithmetic operators. We then converted the RPN parser to parse Polish Notation by reversing the order of the operands when performing the operation and, finally, implemented a simple infix to RPN converter using the shunting yard algorithm.

I hope I didn't gloss over too many details and that you learned something along the way. If you have any questions, suggestions, or simply want to point out my mistakes, feel free to join the discussion on GitHub via the link below!
