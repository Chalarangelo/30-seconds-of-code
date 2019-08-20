## PostCSS Architecture

General overview of the PostCSS architecture.
It can be useful for everyone who wishes to contribute to the core or develop a better understanding of the tool.

**Table of Contents**

- [Overview](#overview)
- [Workflow](#workflow)
- [Core Structures](#core-structures)
    * [Tokenizer](#tokenizer--libtokenizees6-)
    * [Parser](#parser--libparsees6-libparseres6-)
    * [Processor](#processor--libprocessores6-)
    * [Stringifier](#stringifier--libstringifyes6-libstringifieres6-)
- [API](#api-reference)

### Overview

> This section describes ideas lying behind PostCSS

Before diving deeper into the development of PostCSS let's briefly describe what is PostCSS and what is not.

**PostCSS**

- *is **NOT** a style preprocessor like `Sass` or `Less`.*

    It does not define a custom syntax and semantics, it's not actually a language.
    PostCSS works with CSS and can be easily integrated with the tools described above. That being said any valid CSS can be processed by PostCSS.

- *is a tool for CSS syntax transformations*

    It allows you to define custom CSS like syntax that could be understandable and transformed by plugins. That being said PostCSS is not strictly about CSS spec but about syntax definition manner of CSS. In such a way you can define custom syntax constructs like at-rule, that could be very helpful for tools build around PostCSS. PostCSS plays the role of a framework for building outstanding tools for CSS manipulations.

- *is a big player in CSS ecosystem*

    A Large amount of lovely tools like `Autoprefixer`, `Stylelint`, `CSSnano` were built on PostCSS ecosystem. There is a big chance that you already use it implicitly, just check your `node_modules` :smiley:

### Workflow

This is a high-level overview of the whole PostCSS workflow

<img width="300" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/PostCSS_scheme.svg/512px-PostCSS_scheme.svg.png" alt="workflow">

As you can see from the diagram above, PostCSS architecture is pretty straightforward but some parts of it could be misunderstood.

You can see a part called *Parser*, this construct will be described in details later on, just for now think about it as a structure that can understand your CSS like syntax and create an object representation of it.

That being said, there are few ways to write a parser.

 - *Write a single file with string to AST transformation*

    This method is quite popular, for example, the [Rework analyzer](https://github.com/reworkcss/css/blob/master/lib/parse/index.js) was written in this style. But with a large code base, the code becomes hard to read and pretty slow.

 - *Split it into lexical analysis/parsing steps (source string → tokens → AST)*

    This is the way of how we do it in PostCSS and also the most popular one.
    A lot of parsers like [`@babel/parser` (parser behind Babel)](https://github.com/babel/babel/tree/master/packages/babel-parser), [`CSSTree`](https://github.com/csstree/csstree) were written in such way.
    The main reasons to separate tokenization from parsing steps are performance and abstracting complexity.

Let think about why the second way is better for our needs.

First of all, because string to tokens step takes more time than parsing step. We operate on large source string and process it char by char, this is why it is very inefficient operation in terms of performance and we should perform it only once.

But from other side tokens to AST transformation is logically more complex so with such separation we could write very fast tokenizer (but from this comes sometimes hard to read code) and easy to read (but slow) parser.

Summing it up splitting into two steps improve performance and code readability.

So now let's look more closely on structures that play the main role in PostCSS workflow.

### Core Structures

 - #### Tokenizer ( [lib/tokenize.es6](https://github.com/postcss/postcss/blob/master/lib/tokenize.es6) )

    Tokenizer (aka Lexer) plays important role in syntax analysis.

    It accepts CSS string and returns a list of tokens.

    Token is a simple structure that describes some part of syntax like `at-rule`, `comment` or `word`. It can also contain positional information for more descriptive errors.

    For example, if we consider following CSS

    ```css
    .className { color: #FFF; }
    ```

    corresponding tokens from PostCSS will be
    ```js
    [
        ["word", ".className", 1, 1, 1, 10]
        ["space", " "]
        ["{", "{", 1, 12]
        ["space", " "]
        ["word", "color", 1, 14, 1, 18]
        [":", ":", 1, 19]
        ["space", " "]
        ["word", "#FFF" , 1, 21, 1, 23]
        [";", ";", 1, 24]
        ["space", " "]
        ["}", "}", 1, 26]
    ]
    ```

    As you can see from the example above a single token represented as a list and also `space` token doesn't have positional information.

    Let's look more closely on single token like `word`. As it was said each token represented as a list and follow such pattern.

    ```js
    const token = [
         // represents token type
        'word',

        // represents matched word
        '.className',

        // This two numbers represent start position of token.
        // It is optional value as we saw in the example above,
        // tokens like `space` don't have such information.

        // Here the first number is line number and the second one is corresponding column.
        1, 1,

        // Next two numbers also optional and represent end position for multichar tokens like this one. Numbers follow same rule as was described above
        1, 10
    ]
    ```
   There are many patterns how tokenization could be done, PostCSS motto is performance and simplicity. Tokenization is a complex computing operation and takes a large amount of syntax analysis time ( ~90% ), that why PostCSS' Tokenizer looks dirty but it was optimized for speed. Any high-level constructs like classes could dramatically slow down tokenizer.

    PostCSS' Tokenizer uses some sort of streaming/chaining API where you expose [`nextToken()`](https://github.com/postcss/postcss/blob/master/lib/tokenize.es6#L48-L308) method to Parser. In this manner, we provide a clean interface for Parser and reduce memory usage by storing only a few tokens and not the whole list of tokens.

- #### Parser ( [lib/parse.es6](https://github.com/postcss/postcss/blob/master/lib/parse.es6), [lib/parser.es6](https://github.com/postcss/postcss/blob/master/lib/parser.es6) )

    Parser is the main structure responsible for [syntax analysis](https://en.wikipedia.org/wiki/Parsing) of incoming CSS. Parser produces a structure called [Abstract Syntax Tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) that could then be transformed by plugins later on.

    Parser works in common with Tokenizer and operates over tokens, not source string, as it would be a very inefficient operation.

    It uses mostly `nextToken` and `back` methods provided by Tokenizer for obtaining single or multiple tokens and then construct part of AST called `Node`.

    There are multiple Node types that PostCSS could produce but all of them inherit from base Node [class](https://github.com/postcss/postcss/blob/master/lib/node.es6#L34).

- #### Processor ( [lib/processor.es6](https://github.com/postcss/postcss/blob/master/lib/processor.es6) )

    Processor is a very plain structure that initializes plugins and runs syntax transformations. Plugin is just a function registered with [postcss.plugin](https://github.com/postcss/postcss/blob/master/lib/postcss.es6#L109) call.

    It exposes only a few public API methods. Description of them could be found on [api.postcss.org/Processor](http://api.postcss.org/Processor.html)

- #### Stringifier ( [lib/stringify.es6](https://github.com/postcss/postcss/blob/master/lib/stringify.es6), [lib/stringifier.es6](https://github.com/postcss/postcss/blob/master/lib/stringifier.es6) )

    Stringifier is a base class that translates modified AST to pure CSS string. Stringifier traverses AST starting from provided Node and generates a raw string representation of it calling corresponding methods.

    The most essential method is [`Stringifier.stringify`](https://github.com/postcss/postcss/blob/master/lib/stringifier.es6#L25-L27)
    that accepts initial Node and semicolon indicator.
    You can learn more by checking [stringifier.es6](https://github.com/postcss/postcss/blob/master/lib/stringifier.es6)

### API Reference

More descriptive API documentation could be found [here](http://api.postcss.org/)
