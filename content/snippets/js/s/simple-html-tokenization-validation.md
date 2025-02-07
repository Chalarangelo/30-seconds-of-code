---
title: Simple HTML tokenization & validation in JavaScript
shortTitle: HTML tokenization & validation
language: javascript
tags: [string,algorithm]
cover: jars-on-shelf
excerpt: Expanding upon previous articles on bracket matching and tokenization, it's time to try a basic HTML tokenization and validation algorithm.
listed: true
dateModified: 2025-02-21
---

I've been down the **tokenization** rabbit hole for a little while now, if it wasn't obvious from the previous articles on [bracket pair matching](/js/s/find-matching-bracket-pairs) and [math expression tokenization](/js/s/math-expression-tokenizer). This time, I wanted to try something a little more complex, but still simple enough to be done in a single article. So, I decided to try my hand at **tokenizing an HTML string** and **validating that its tags are balanced** correctly.

> [!NOTE]
>
> Huge disclaimer right here that this is a **learning exercise** and, quite possibly, an exercise in futility. What I hope to achieve here is you coming out of this article with a basic understanding of how to tokenize some more complex inputs and how to validate them. This is not a full-fledged HTML parser, nor is it meant to be.

## HTML Tokenization

If you've read the previous article on [math expression tokenization](/js/s/math-expression-tokenizer), you'll know that **tokenization** is the process of breaking down a string into smaller, more manageable pieces. In that article, we didn't really delve into **multi-character tokens**, except for numbers, which made the process a little simpler. In this article, we'll be dealing with multi-character tokens, specifically HTML tags and text nodes.

### Token types

The first problem we'll have to solve is distinguishing between an HTML tag and a text node. An **HTML tag** is a string that starts with `<` and ends with `>`, while a **text node** is everything else. In order to tackle this, we'll have to create a `flushBuffer` function, much like we did in the math expression tokenizer. Only this time around, we'll make it a simple conditional that delegates responsibility to different functions based on the detected token type.

```js
const flushBuffer = () => {
  if (!buffer.length) return;

  const value = buffer.trim();
  if (value.startsWith('<') || value.endsWith('>'))
    processTagToken(value);
  else
    processTextToken(value);
};
```

This function is responsible for loosely **detecting the token type** based on the buffer's contents and delegating the processing to the appropriate function. If the buffer starts with `<` or ends with `>`, we'll assume it's an HTML tag and pass it to `processTagToken`. Otherwise, we'll assume it's a text node and pass it to `processTextToken`. We'll implement these functions next.

### Processing text tokens

Text tokens aren't very interesting. They're just text nodes that **don't contain any HTML tags**. We'll simply add them to a `tokens` array as a simple object with a `type` of `text` and a `value` of the text node.

```js
const processTextToken = str => {
  tokens.push({ type: 'text', value: str });
  buffer = '';
};
```

As you can see, the `processTextToken` function handles emptying the `buffer` after the token is processed. We could have done this in the `flushBuffer` function, but there's a slight chance we may want the raw buffer value at some point in the future, so it's better to keep the logic separate.

### Processing tag tokens

Tag tokens are where most of the complexity of this process comes from. As soon as we enter the `processTagToken`, we must check if the buffer's contents are actually **valid**. Luckily, this is doable with a simple **regular expression**.

Then, we'll have to figure out the **tag name**, check if it's an **opening**, **closing** or even **self-closing** tag and, finally, get the rest of the **attributes**. Most of this is done using regular expressions, which I know are a pain, but they're fairly simple in this case.

```js
const SELF_CLOSING_TAGS = new Set([
  'br', 'img', 'input', 'meta', 'hr', 'link'
]);

const processTagToken = str => {
  if (!str.match(/^<[^<>]+>$/))
    throw new Error(`${str} is not a valid HTML tag`);

  const tagName = str.match(/^<\/?([^<>/ ]+)/)[1];
  const isClosingTag = str.startsWith('</');
  const isSelfClosingTag =
    str.endsWith('/>') || SELF_CLOSING_TAGS.has(tagName);
  const tagAttributeString = str.
    replace(new RegExp(`^</?${tagName}`), '').
    replace(/\/?>/, '').
    trim() || null;

  tokens.push({
    type: 'tag',
    tagName,
    opening: !isClosingTag || isSelfClosingTag,
    closing: isClosingTag || isSelfClosingTag,
    tagAttributeString
  });

  buffer = '';
};
```

> [!NOTE]
>
> I'm not going to dive deeper into **attribute handling**, as this is almost a tokenizer of its own, but we'll simply store them as a string for now. Additionally, my **self-closing tags** list is very incomplete, but it'll do for now.

While this might look a little intimidating at first, there's not a whole lot going on in this function. We're simply performing the steps I outlined above, then, if all goes well, we're adding the token to the `tokens` array and emptying the buffer.

### Tokenizing the HTML string

We're now ready to tokenize an HTML string. The structure of the tokenizer is very similar to the previous article, so I won't bother you with all the minute details. The only point I would like to focus on is the actual **character processing loop**.

In this loop, we're simply adding characters to the buffer until we encounter either a `<` or a `>`. When we do, we **flush the buffer and continue**. The one thing that's of note is that we handle these two characters differently. When we encounter a `<`, we flush the buffer, then add the character, whereas when we encounter a `>`, we add the character, then flush the buffer. This allows us to parse both tags and text nodes correctly.

Let's take a look at the full tokenization code:

```js
const SELF_CLOSING_TAGS = new Set([
  'br', 'img', 'input', 'meta', 'hr', 'link'
]);

const tokenizeHtml = str => {
  const tokens = [];
  let buffer = '';

  const processTagToken = str => {
    if (!str.match(/^<[^<>]+>$/))
      throw new Error(`${str} is not a valid HTML tag`);

    const tagName = str.match(/^<\/?([^<>/ ]+)/)[1];
    const isClosingTag = str.startsWith('</');
    const isSelfClosingTag =
      str.endsWith('/>') || SELF_CLOSING_TAGS.has(tagName);
    const tagAttributeString = str.
      replace(new RegExp(`^</?${tagName}`), '').
      replace(/\/?>/, '').
      trim() || null;

    tokens.push({
      type: 'tag',
      tagName,
      opening: !isClosingTag || isSelfClosingTag,
      closing: isClosingTag || isSelfClosingTag,
      tagAttributeString
    });

    buffer = '';
  };

  const processTextToken = str => {
    tokens.push({ type: 'text', value: str });
    buffer = '';
  };

  // Flush the buffer and process the tokens
  const flushBuffer = () => {
    if (!buffer.length) return;

    const value = buffer.trim();
    if (value.startsWith('<') || value.endsWith('>'))
      processTagToken(value);
    else
      processTextToken(value);
  };

  // Tokenize the input string
  [...str].forEach(char => {
    // If we encounter the opening tag, flush the buffer
    if (char === '<') flushBuffer();

    // Add the character to the buffer
    buffer += char;

    // If we encounter the closing tag, flush the buffer
    if (char === '>') flushBuffer();
  });

  // Flush any remaining buffer
  flushBuffer();

  return tokens;
};
```

Let's see it in action, shall we?

```js
const tokens = tokenizeHtml(
  '<div class="container"><p>Hello, <strong>world</strong>!<br/></p></div>'
);
// [
//   {
//     type: 'tag', tagName: 'div',
//     opening: true, closing: false,
//     tagAttributeString: 'class="container"'
//   },
//   {
//     type: 'tag', tagName: 'p',
//     opening: true, closing: false,
//     tagAttributeString: null
//   },
//   { type: 'text', value: 'Hello,' },
//   {
//     type: 'tag', tagName: 'strong',
//     opening: true, closing: false,
//     tagAttributeString: null
//   },
//   { type: 'text', value: 'world' },
//   {
//     type: 'tag', tagName: 'strong',
//     opening: false, closing: true,
//     tagAttributeString: null
//   },
//   { type: 'text', value: '!' },
//   {
//     type: 'tag',
//     tagName: 'br',
//     opening: true, closing: true,
//     tagAttributeString: null
//   },
//   {
//     type: 'tag', tagName: 'p',
//     opening: false, closing: true,
//     tagAttributeString: null
//   },
//   {
//     type: 'tag', tagName: 'div',
//     opening: false, closing: true,
//     tagAttributeString: null
//   }
// ]
```

## Matching tag pairs

In the previous article on [bracket pair matching](/js/s/find-matching-bracket-pairs), we used a simple **stack-based approach** to match bracket pairs. This scenario is no different, only we need to work with **tokens**, instead of a raw string and its characters.

The idea is rather simple. We **skip non-tag tokens** entirely and we keep track of encountered tags. When we encounter an **opening tag**, we push its `tagName` and index to the stack. When we encounter a **closing tag**, we pop the last tag from the stack and check if they match. If they don't, we throw an error. If they do, we continue. If we reach the end of the tokens and the stack is not empty, we also throw an error.

```js
const findMatchingTags = tokens => {
  const { pairs, stack } = tokens.reduce(
    ({ pairs, stack }, token, i) => {
      if (token.type === 'tag') {
        if (token.opening && !token.closing) {
          stack.push({ index: i, tagName: token.tagName });
        } else if (token.closing && !token.opening) {
          const {index: openingIndex, tagName} = stack.pop();
          if (tagName !== token.tagName)
            throw new Error(`Mismatched tags: ${tagName} and ${token.tagName}`);
          pairs.set(openingIndex, i);
          pairs.set(i, openingIndex);
        }
      }
      return { pairs, stack };
    },
    { pairs: new Map(), stack: [] }
  );

  if (stack.length)
    throw new Error('Unmatched HTML tags');

  return pairs;
};
```

This isn't all that different from the last implementation, only we're working with tokens instead of characters. Let's see it in action:

```js
// Given the tokens from the previous example
const pairs = findMatchingTags(tokens);
// Map {
//   0 => 9, 9 => 0,
//   1 => 8, 8 => 1,
//   3 => 5, 5 => 3
// }
```

## A simple HTML validator

Putting the previous two pieces together, we can create a **simple HTML validator** that tokenizes the input string, matches the tag pairs and throws an error if the tags are mismatched or unmatched or if the input string is not a valid HTML string.

```js
const validateHtml = str => {
  const tokens = tokenizeHtml(str);
  const matchingTags = findMatchingTags(tokens);
  return { tokens, matchingTags };
};
```

## Conclusion

And that's basically our simple HTML validator done! Of course, there are a ton more things one can and should take care of when parsing HTML, but this is a good starting point for understanding the basics.

I hope this article has really driven home the mentality of tokenization and how it can be used in real-world scenarios to break down complex strings into more manageable pieces. See you in the next one!
