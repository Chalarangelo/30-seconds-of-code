---
title: Implementing a Smallfuck Interpreter in JavaScript
shortTitle: Smallfuck Interpreter
language: javascript
tags: [algorithm]
cover: rustic-cup
excerpt: Yet another interpreter article, this time around we'll be building a full-fledged interpreter for the esolang Smallfuck.
listed: true
dateModified: 2025-02-24
---

As I've mentioned before, I've been training on [CodeWars](https://www.codewars.com) quite a bit lately. I've been solving some fairly involved katas, especially ones related to <dfn title="Short for esoteric programming language; a computer programming language designed to experiment with unconventional ideas, be difficult to program in, or serve as a joke, rather than for practical use.">Esolang</dfn> interpreters. One of the most interesting ones I've come across is the [Smallfuck interpreter Kata](https://www.codewars.com/kata/esolang-interpreters-number-2-custom-smallfuck-interpreter).

> [!IMPORTANT]
>
> I'll be solving the Kata in this article, so if you're interested in solving it yourself, I suggest you do so before reading on. Please note that [**cheating on CodeWars is not permitted**](https://docs.codewars.com/community/code-of-conduct#behavior-that-is-not-tolerated:~:text=Cheating%20and%20plagiarising%3A%20Cheating%2C%20plagiarising%2C%20and%20the%20use%20of%20AI%2Dgenerated%20code%20are%20not%20permitted%20on%20the%20Codewars%20website.%20Our%20algorithms%20and%20moderation%20team%20are%20trained%20to%20spot%20this%20behavior%2C%20and%20violators%20will%20face%20account%20restrictions.). That being said, you may read my solution if you feel stuck or need a hint, but please don't copy it, as it may have consequences on your account.

## Language introduction

The [Smallfuck](https://esolangs.org/wiki/Smallfuck) language is a minimalist, <dfn title="A Turing-complete system can solve any computational problem given enough time and memory">**Turing-complete**</dfn> esolang. It operates on an array of bits, the **tape**, provided as input. The language has only six **commands**:

| Command | Description |
| ------- | ----------- |
| `>`     | Move pointer to the right (by 1 cell) |
| `<`     | Move pointer to the left (by 1 cell) |
| `*`     | Flip the bit at the current cell |
| `[`     | Jump past matching `]` if value at current cell is `0` |
| `]`     | Jump back to matching `[` if value at current cell is non-`0` |

As opposed to [Brainfuck](https://esolangs.org/wiki/Brainfuck) (another esolang I hope to explore in a future article), Smallfuck has **no input or output commands**. The interpreter should simply run the program and return the final state of the tape. The program terminates when either the **end of the program** is reached or the **pointer goes out of bounds**.

## Interpreter implementation

Instead of throwing a solution at you and trying to explain it, I'll start by building **smaller subsets of the interpreter** and explaining them as I go. This way, you'll understand the solution better and be able to follow along more easily.

### Termination conditions

We'll first start by writing two functions for termination conditions. The `boundCheck` function will check if the **pointer is within the bounds of the tape**, and the `codeCompleteCheck` function will check if the **program has reached the end**.

```js
const boundCheck = length => n => n < 0 || n >= length;
const codeCompleteCheck = length => n => n == length;
```

Notice that these two functions are [curried](/js/s/currying). We'll pass them the length of the tape and program respectively to get the actual functions that we'll use later.

### Input parsing

Next up, we want to **parse the input** given to our interpreter function. For the tape, this is a simple matter of splitting the input string into an **array of characters** (we'll see why in a little bit). As it's fairly inefficient to map the characters to integers, we'll skip this step and use the characters directly later on.

For the code parsing, we want to **ignore any characters that are not part of the Smallfuck language**. We can do this by using a **regular expression** to remove any characters that are not `>`, `<`, `*`, `[`, or `]`.

```js
const parseTape = tape => tape.split('');
const parseCode = code => code.replace(/[^><*\[\]]/g, '');
```

### Bit flipping

We'll split the interpreter into smaller, readable blocks. For the **bit flipping function**, we'll need the symbol, pointer and tape as arguments. As the tape is an array and [is passed by reference](/js/s/pass-by-reference-or-pass-by-value), we can directly **modify the tape in place**.

```js
const interpretBitFlip = (symbol, pointer, tape) => {
  if (symbol === '*') tape[pointer] = tape[pointer] === '1' ? '0' : '1';
};
```

As mentioned previously, the tape's values are **characters, not integers**. This is why we're comparing the value to `'1'` and not `1`.

### Pointer movement

The **pointer movement function** is fairly similar, but handles both left and right movements. We won't check if the pointer is within bounds here, as we'll do that in the main interpreter loop, using the `boundCheck` function from earlier.

```js
const interpretPointerMove = (symbol, pointer) =>
  symbol === '>' ? pointer + 1 : symbol === '<' ? pointer - 1 : pointer;
```

### Interpreter loop

At this point, we have the building blocks needed to solve some simple examples, yet we don't have the **interpreter loop** itself. We'll write a function that takes the **tape and code as arguments** and **returns the final tape state**.

```js
const smallfuckInterpreter = (code, tape) => {
  const tapeData = parseTape(tape);
  const codeData = parseCode(code);
  const isTapeOutOfBounds = boundCheck(tapeData.length);
  const isCodeCompleted = codeCompleteCheck(codeData.length);

  let tapePointer = 0, codePointer = 0;

  while (true) {
    if (isTapeOutOfBounds(tapePointer) || isCodeCompleted(codePointer))
      return tapeData.join('');

    const codeSymbol = code[codePointer];
    tapePointer = interpretPointerMove(codeSymbol, tapePointer);
    interpretBitFlip(codeSymbol, tapePointer, tapeData);

    codePointer++;
  }
};
```

As you can see, this is quite straightforward. We start by parsing the tape and code, then create the termination checking functions and initialize the pointers. We then enter a loop that will run until the program is complete or the tape pointer goes out of bounds. In each iteration, we get the current symbol, move the pointer, and flip the bit if necessary. Finally, we **increment the code pointer** and continue the loop.

Let's test this with a simple example:

```js
smallfuckInterpreter('*>*>>*>>>*>*', '00101100'); // '11111111'
```

### Matching brackets

The last piece of the puzzle is handling the `[` and `]` commands. This is the most complicated part of the interpreter, but luckily, we've already built the building blocks needed to solve it in the [matching bracket pairs article](/js/s/find-matching-bracket-pairs). We'll use the same **stack-based approach** here to produce a `Map` that will store the **positions of matching brackets**.

```js
const createLoopPairs = code =>
  [...code].reduce(({ pairs, stack }, symbol, i) => {
    if (symbol === '[') stack.push(i);
    else if (symbol === ']') {
      const openIndex = stack.pop();
      pairs.set(openIndex, i);
      pairs.set(i, openIndex);
    }
    return { pairs, stack };
  }, { pairs: new Map(), stack: [] }).pairs;
```

Additionally, we'll define a function to **retrieve the matching bracket index** from the `Map`, given the current code pointer. Again, we'll be using currying to supply the initial `loopPairs` map to the function to reduce the number of arguments we pass around.

```js
const pairMatch = loopPairs => codePointer => loopPairs.get(codePointer);
```

Finally, we can add the **loop interpretation function** itself. This function will take the code, code pointer, and tape pointer as arguments, after being supplied with the loop pairs map. It will then return the new code pointer after interpreting the loop.

```js
const createLoopInterpreter = loopPairs =>
  (symbol, codePointer, tapeValue) => {
    const getMatchingLoopPair = pairMatch(loopPairs);
    if (
      (symbol === '[' && tapeValue === '0') ||
      (symbol === ']' && tapeValue === '1')
    )
      return getMatchingLoopPair(codePointer);
    return codePointer;
  };
```

Notice that the code pointer may be changed to the matching bracket index or remain the same, depending on the tape value and symbol.

### Revised interpreter loop

Now that we have all the pieces in place, we can revise the main interpreter loop to include the loop interpretation function.

```js
const smallfuckInterpreter = (code, tape) => {
  const tapeData = parseTape(tape);
  const codeData = parseCode(code);
  const isTapeOutOfBounds = boundCheck(tapeData.length);
  const isCodeCompleted = codeCompleteCheck(codeData.length);
  const loopPairs = createLoopPairs(codeData);
  const interpretLoop = createLoopInterpreter(loopPairs);

  let tapePointer = 0, codePointer = 0;

  while (true) {
    if (isTapeOutOfBounds(tapePointer) || isCodeCompleted(codePointer))
      return tapeData.join('');

    const codeSymbol = codeData[codePointer];
    tapePointer = interpretPointerMove(codeSymbol, tapePointer);
    interpretBitFlip(codeSymbol, tapePointer, tapeData);
    codePointer = interpretLoop(codeSymbol, codePointer, tapeData[tapePointer]);

    codePointer++;
  }
};
```

A detail that you should notice is that the loop interpretation function is called **before** incrementing the code pointer. This allows the code pointer to be incremented after the loop is interpreted, regardless of whether the loop is entered or not.

Let's finally test our interpreter on more complex examples:

```js
smallfuckInterpreter('[[]*>*>*>]',   '000');    // '000'
smallfuckInterpreter('*>[[]*>]<*',   '100');    // '100'
smallfuckInterpreter('[*>[>*>]>]',   '11001');  // '01100'
smallfuckInterpreter('[>[*>*>*>]>]', '10110');  // '10101'
```

## Optimizations

Now that we have a working interpreter, we can look into **optimizations**. These will make our interpreter faster and more efficient. We'll look into two optimizations: **bit flipping** and **pointer movement**, the most common commands in Smallfuck programs.

### Bit flipping optimization

Up until this point we've been interpreting sequences of **consecutive** `*` commands by flipping the bit at the current tape position. However, we can optimize this by counting the number of `*` commands and **flipping the bit only if the count is odd**. This is because flipping a bit twice will result in the original value.

To do so, we will need to alter our `parseCode` function. We'll just replace consequent `*` commands with a single `*` command if their count is odd, using a regular expression and the modulo (`%`) operator, after discarding any non-Smallfuck characters.

```js
const parseCode = code =>
  code.
    replace(/[^><*\[\]]/g, '').
    replace(/\*{2,}/g, (match) => match.length % 2 === 0 ? '' : '*');
```

Let's test this optimization with a simple example:

```js
smallfuckInterpreter('**>*>*>**', '000'); // '011
```

### Pointer movement optimization

Similar to the bit flipping optimization, we can optimize the **pointer movement commands**. We'll be updating the `parseCode` function yet again, only this time we'll convert the `code` to an array. Then, we'll replace sequences of `>` and `<` commands with a single command that moves the pointer by the **net difference**.

```js
const parseCode = code => {
  const minifiedCode = code.
    replace(/[^><*\[\]]/g, '').
    replace(/\*{2,}/g, (match) => match.length % 2 === 0 ? '' : '*');

  const codeArray = [];
  let pointer = 0;

  const flushPointer = () => {
    if (pointer > 0) codeArray.push(['>', pointer]);
    if (pointer < 0) codeArray.push(['<', -pointer]);
    pointer = 0;
  };

  for (const symbol of minifiedCode) {
    if (symbol === '>') pointer++;
    else if (symbol === '<') pointer--;
    else {
      flushPointer()
      codeArray.push(symbol);
    }
  }

  flushPointer();
  return codeArray;
};
```

If this code reminds you of the [math expression tokenizer article](/js/s/math-expression-tokenizer), that's because the underlying principles are the same. We essentially **tokenize the code** into a more optimized format.

We'll then need to also update our `interpretPointerMove` function to handle the **new format** of the code. The function will only process **arrays with two elements**, moving the pointer by the count specified in the second element.

```js
const interpretPointerMove = (symbol, pointer) => {
  if (!Array.isArray(symbol)) return pointer;

  const [command, count] = symbol;
  if (command === '>') return pointer + count;
  if (command === '<') return pointer - count;

  return pointer;
};
```

And let's test that this works with a simple example:

```js
smallfuckInterpreter('*>*>>*>>>*>*', '00101100'); // '11111111'
```

Both of these optimizations should work **inside loops** as well, as they don't change the semantics of the language. They should also improve the performance of the interpreter, especially for programs with long sequences of `*`, `>`, or `<` commands.

## Conclusion

In this article, we've built a full-fledged interpreter for the Smallfuck esolang. We've started by building smaller building blocks, then combined them to create the main interpreter loop. We've also looked into optimizations that can be applied to the interpreter to improve its performance. This implementation can serve as a starting point for more complex esolang interpreters, as the principles used here can be applied to other languages as well. I hope you enjoyed this article and learned something new!

## Addendum: Code summary

The entire interpreter code is summarized below, with comments added for clarity:

<details>
<summary>View the complete implementation</summary>

```js
// Termination conditions (curried functions)
const boundCheck = length => n => n < 0 || n >= length;
const codeCompleteCheck = length => n => n == length;

// Input parsing functions (tape and code)
const parseTape = tape => tape.split('');
const parseCode = code => {
  // Discard non-Smallfuck characters, then optimize bit flipping
  const minifiedCode = code
    .replace(/[^><*\[\]]/g, '')
    .replace(/\*{2,}/g, match => (match.length % 2 === 0 ? '' : '*'));

  const codeArray = [];
  let pointer = 0;

  const flushPointer = () => {
    if (pointer > 0) codeArray.push(['>', pointer]);
    if (pointer < 0) codeArray.push(['<', -pointer]);
    pointer = 0;
  };

  // Convert sequences of > and < commands to single commands
  for (const symbol of minifiedCode) {
    if (symbol === '>') pointer++;
    else if (symbol === '<') pointer--;
    else {
      flushPointer();
      codeArray.push(symbol);
    }
  }

  flushPointer();
  return codeArray;
};

// Bit flipping function (handles * commands)
const interpretBitFlip = (symbol, pointer, tape) => {
  if (symbol === '*') tape[pointer] = tape[pointer] === '1' ? '0' : '1';
};

// Pointer movement function (handles sequences of > and < commands)
const interpretPointerMove = (symbol, pointer) => {
  if (!Array.isArray(symbol)) return pointer;

  const [command, count] = symbol;
  if (command === '>') return pointer + count;
  if (command === '<') return pointer - count;

  return pointer;
};

// Loop pair creation function (finds matching brackets)
const createLoopPairs = code =>
  [...code].reduce(
    ({ pairs, stack }, symbol, i) => {
      if (symbol === '[') stack.push(i);
      else if (symbol === ']') {
        const openIndex = stack.pop();
        pairs.set(openIndex, i);
        pairs.set(i, openIndex);
      }
      return { pairs, stack };
    },
    { pairs: new Map(), stack: [] }
  ).pairs;

// Matching bracket retrieval function (curried function)
const pairMatch = loopPairs => codePointer => loopPairs.get(codePointer);

// Loop interpretation function (handles [ and ] commands, curried function)
const createLoopInterpreter = loopPairs =>
  (symbol, codePointer, tapeValue) => {
    const getMatchingLoopPair = pairMatch(loopPairs);
    if (
      (symbol === '[' && tapeValue === '0') ||
      (symbol === ']' && tapeValue === '1')
    )
      return getMatchingLoopPair(codePointer);
    return codePointer;
  };

// Main interpreter function
const smallfuckInterpreter = (code, tape) => {
  // Parse input data
  const tapeData = parseTape(tape);
  const codeData = parseCode(code);
  // Prepare termination conditions, loop pairs, and loop interpreter
  const isTapeOutOfBounds = boundCheck(tapeData.length);
  const isCodeCompleted = codeCompleteCheck(codeData.length);
  const loopPairs = createLoopPairs(codeData);
  const interpretLoop = createLoopInterpreter(loopPairs);

  // Initialize pointers and start interpreter loop
  let tapePointer = 0, codePointer = 0;

  // Main interpreter loop
  while (true) {
    // Exit if tape pointer is out of bounds or code is completed
    if (isTapeOutOfBounds(tapePointer) || isCodeCompleted(codePointer))
      return tapeData.join('');

    // Interpret current symbol, move pointer, flip bit, and interpret loop
    const codeSymbol = codeData[codePointer];
    tapePointer = interpretPointerMove(codeSymbol, tapePointer);
    interpretBitFlip(codeSymbol, tapePointer, tapeData);
    codePointer = interpretLoop(codeSymbol, codePointer, tapeData[tapePointer]);

    // Move to next symbol
    codePointer++;
  }
};
```

</details>
