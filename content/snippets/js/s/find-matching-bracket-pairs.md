---
title: Find matching bracket pairs in a string with JavaScript
shortTitle: Matching bracket pairs
language: javascript
tags: [string,algorithm]
cover: invention-shack
excerpt: A common problem when building parsers is finding matching bracket pairs in a string. Here's how you can solve it with JavaScript.
listed: true
dateModified: 2025-02-07
discussion: 2096
---

I was recently honing my skills over at [CodeWars](https://www.codewars.com) and I came across an <dfn title="Short for esoteric programming language; a computer programming language designed to experiment with unconventional ideas, be difficult to program in, or serve as a joke, rather than for practical use.">Esolang</dfn> interpreter kata, that, ultimately, required me to find **matching bracket pairs** in a string. I'll spare you the details of the problem for now (maybe I'll write about it in the future), but I thought I'd share the bracket matching solution with you, as I've found it to be a recurring problem when building parsers or solving similar problems.

> [!NOTE]
>
> I'm sure that searching for this problem will yield lots of results, mostly variations of the same sort of solution, many of which contain no comments or explanations. I'll try to **explain the solution** as best as I can, starting from simple parentheses matching and then moving on to more complex bracket pairs.

## Matching parentheses

Given a simple string with **parentheses**, like `((a + b))`, we want to find the matching pairs of parentheses. In this case, the pairs are `(0, 8)` and `(1, 7)`. The first pair is the outermost parentheses, and the second pair is the innermost parentheses.

Looking closely, we can **identify the pattern** we're looking for. If we come across an **opening parenthesis**, we have to **store its index**. When we find a **closing parenthesis**, we can **pair it with the last opening parenthesis** we found. This way, we can find the matching pairs in the given string.

If, however, we find **a closing parenthesis without a matching opening parenthesis**, we can safely assume that the string is invalid. Similarly, if we find **an opening parenthesis without a matching closing parenthesis**, the string is also invalid.

To solve this problem, we can use a **stack-based approach**. As we'll only need its `push()` and `pop()` methods, we can use a simple array to represent the stack. Let's see how we can implement this in JavaScript:

```js
const findMatchingParentheses = str => {
  const { stack, pairs } = [...str].reduce(
    ({ pairs, stack }, char, i) => {
      if (char === '(') stack.push(i);
      else if (char === ')') {
        if (stack.length === 0) throw new Error('Invalid string');
        pairs.push([stack.pop(), i]);
      }
      return { pairs, stack };
    },
    { pairs: [], stack: [] }
  );

  if (stack.length > 0) throw new Error('Invalid string');

  return pairs;
};

findMatchingParentheses('a + b');      // []
findMatchingParentheses('(a + b)');    // [[0, 6]]
findMatchingParentheses('((a + b))');  // [[1, 7], [0, 8]]
findMatchingParentheses('((a + b)');   // Error: Invalid string
findMatchingParentheses('a + b)');     // Error: Invalid string
```

> [!TIP]
>
> If you want to **learn more about stacks**, check out the article on the [Stack data structure](/js/s/data-structures-stack) and how it can be implemented in JavaScript.

## Matching bracket pairs

Now that we've seen how to find matching parentheses, we can extend the solution to **matching bracket pairs**. We'll consider the following bracket pairs: `()`, `[]`, and `{}`.

The approach is similar to the one we used for parentheses. The main difference is that we'll use an object as a **dictionary of opening and closing brackets**. This way, we can easily check if a character is an opening or closing bracket.

Same as before, we'll then push the index of the opening bracket to the stack. When we find a closing bracket, we'll pair it with the last opening bracket we found. If we find a closing bracket without a matching opening bracket, or vice versa, we'll throw an error.

```js
const findMatchingBrackets = str => {
  const bracketMap = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  const bracketOpenings = Object.keys(bracketMap);
  const bracketClosings = Object.values(bracketMap);

  const { stack, pairs } = [...str].reduce(
    ({ pairs, stack }, char, i) => {
      if (bracketOpenings.includes(char)) stack.push(i);
      else if (bracketClosings.includes(char)) {
        if (stack.length === 0) throw new Error('Invalid string');
        const openingIndex = stack.pop();
        if (bracketMap[str[openingIndex]] !== char)
          throw new Error('Invalid string');
        pairs.push([openingIndex, i]);
      }
      return { pairs, stack };
    },
    { pairs: [], stack: [] }
  );

  if (stack.length > 0) throw new Error('Invalid string');

  return pairs;
};

findMatchingBrackets('a + b');        // []
findMatchingBrackets('(a + b)');      // [[0, 6]]
findMatchingBrackets('((a + b))');    // [[1, 7], [0, 8]]
findMatchingBrackets('([a] + b)');    // [[1, 3], [0, 8]]
findMatchingBrackets('([{a} + b])');  // [[2, 4], [1, 9], [0, 10]]
findMatchingBrackets('((a + b)');     // Error: Invalid string
findMatchingBrackets('a + b)');       // Error: Invalid string
findMatchingBrackets('([a + b}');     // Error: Invalid string
```

## Using a `Map`

In many of the use cases I've come across, a `Map` is way easier to work with as a result, instead of an array of arrays. The simple fact of the matter is, in most scenarios, you'll want to **retrieve the matching bracket index**, given an opening or closing bracket index. This is where a `Map` comes in handy.

Instead of storing pairs of indexes in an array, we can store them in a `Map`. But, given that we may want to retrieve the matching index given an opening or closing bracket index, we'll need to **store both sides of the pair** in the `Map` at the same time. Here's how using a `Map` would look like:

```js
const findMatchingBrackets = str => {
  const bracketMap = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  const bracketOpenings = Object.keys(bracketMap);
  const bracketClosings = Object.values(bracketMap);

  const { stack, pairs } = [...str].reduce(
    ({ pairs, stack }, char, i) => {
      if (bracketOpenings.includes(char)) stack.push(i);
      else if (bracketClosings.includes(char)) {
        if (stack.length === 0) throw new Error('Invalid string');
        const openingIndex = stack.pop();
        if (bracketMap[str[openingIndex]] !== char)
          throw new Error('Invalid string');
        pairs.set(openingIndex, i);
        pairs.set(i, openingIndex);
      }
      return { pairs, stack };
    },
    { pairs: new Map(), stack: [] }
  );

  if (stack.length > 0) throw new Error('Invalid string');

  return pairs;
};

const str = '([{a} + b])';
const pairs = findMatchingBrackets(str);

[...str].forEach((char, i) => {
  if (pairs.has(i)) {
    const matchingIndex = pairs.get(i);
    const matchingChar = str[pairs.get(i)];
    console.log(
      `Bracket "${char}" at index ${i} matches with bracket "${matchingChar}" at index ${matchingIndex}`
    );
  }
});
// Bracket "(" at index  0 matches with bracket ")" at index 10
// Bracket "[" at index  1 matches with bracket "]" at index  9
// Bracket "{" at index  2 matches with bracket "}" at index  4
// Bracket "}" at index  4 matches with bracket "{" at index  2
// Bracket "]" at index  9 matches with bracket "[" at index  1
// Bracket ")" at index 10 matches with bracket "(" at index  0
```

## Generalizing the solution

The solutions we've seen so far handles parentheses and brackets. But, what if I told you it can handle far **more complex inputs**, such as HTML or XML tags? The solution can be generalized to handle any type of bracket pair, as long as you provide the **rules for the opening and closing brackets and how they match**.

Let's expand our solution to accept the rules for the opening and closing brackets as **arguments**. This way, we can handle different types of bracket pairs, such as `<` and `>` for HTML tags. Here's how you can do it:

```js
const findMatchingBrackets = bracketMap => {
  const bracketOpenings = Object.keys(bracketMap);
  const bracketClosings = Object.values(bracketMap);

  return str => {
    const { stack, pairs } = [...str].reduce(
      ({ pairs, stack }, char, i) => {
        if (bracketOpenings.includes(char)) stack.push(i);
        else if (bracketClosings.includes(char)) {
          if (stack.length === 0) throw new Error('Invalid string');
          const openingIndex = stack.pop();
          if (bracketMap[str[openingIndex]] !== char)
            throw new Error('Invalid string');
          pairs.set(openingIndex, i);
          pairs.set(i, openingIndex);
        }
        return { pairs, stack };
      },
      { pairs: new Map(), stack: [] }
    );

    if (stack.length > 0) throw new Error('Invalid string');

    return pairs;
  };
};

const findBracketPairs =
  findMatchingBrackets({ '(': ')', '[': ']', '{': '}' });
const str = '([{a} + b])';
const pairs = findBracketPairs(str);
// Map(6) {
//  0 => 10, 1 => 9, 2 => 4,
//  4 => 2, 9 => 1, 10 => 0
//}

const findHtmlPairs = findMatchingBrackets({ '<': '>' });
const htmlStr = '<div><p>Hello, world!</p></div>';
const htmlPairs = findHtmlPairs(htmlStr);
// Map(8) {
//  0 => 4, 5 => 7, 21 => 24, 25 => 30,
//  30 => 25, 24 => 21, 7 => 5, 4 => 0
// }
```

> [!TIP]
>
> I'm using [currying](/js/s/currying/) to create a function that accepts the bracket rules and **returns a function** that accepts the string to find the matching bracket pairs. This way, you can easily **reuse the function** with different inputs, given the same bracket rules.

## Conclusion

As you can see, solving the matching bracket pairs problem is straightforward, using a stack-based approach. While this solution is fairly simple, it can easily be expanded upon for more complex tasks, such as incorporating a **tokenizer to parse multi-character tokens** (e.g. full HTML tags).

I hope you found this article helpful and that you can use this solution in your projects or coding katas. If you have any questions or suggestions, feel free to join the discussion below. I'd love to hear your thoughts on this topic!
