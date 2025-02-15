---
title: Making a Brainfuck interpreter in JavaScript - Part 1
shortTitle: Brainfuck interpreter - Part 1
language: javascript
tags: [algorithm]
cover: lake-bench
excerpt: Continuing on the code interpretation path, I'm attempting to build a Brainfuck interpreter, using an AST to represent and execute the code.
listed: true
dateModified: 2025-03-01
---

Remember how I tried my hand at making a [Smallfuck interpreter](/js/s/smallfuck-interpreter) the other day? Well, this time around, I'm going to do the same for **Brainfuck**, but with a couple of twists:

1. I'll be going down the **AST** route, instead of parsing and interpreting on the fly. This has the added benefit of creating an **intermediate representation** that can be used for portability and readability.
2. I'll build something that sort of resembles a **virtual machine**, so that the code can be run in a more **controlled environment** and we can add some timeouts and other **safety measures**.

For this article, I'll mainly explore the AST part of the interpreter. The VM part will be covered in the next article, which will be published in about a week or so.

## Language introduction

Brainfuck is a <dfn title="A Turing-complete system can solve any computational problem given enough time and memory">**Turing-complete**</dfn> <dfn title="Short for esoteric programming language; a computer programming language designed to experiment with unconventional ideas, be difficult to program in, or serve as a joke, rather than for practical use.">Esolang</dfn>, not unlike Smallfuck. It has only 8 commands, which makes it a very simple language to implement. The commands are:

| Command | Description |
| ------- | ----------- |
| `>`     | Move pointer to the right (by 1 cell) |
| `<`     | Move pointer to the left (by 1 cell) |
| `+`     | Increment the byte at the current cell |
| `-`     | Decrement the byte at the current cell |
| `.`     | Output the byte at the current cell |
| `,`     | Accept one byte of input, storing it at the current cell |
| `[`     | Jump past matching `]` if value at current cell is `0` |
| `]`     | Jump back to matching `[` if value at current cell is non-`0` |

As you can see, the main differences from Smallfuck are the **input/output commands** and the fact that the **memory is byte-based** instead of bit-based. Other than that, the two languages are quite similar.

### Memory representation

As is often the case, there are a few conflicting definitions of how the internal memory of the language works. In our case, we'll go for a more extensible memory system, using **two arrays**, `left` and `right` and a `pointer`, starting at `0`. Negative indexes will be used to access the `left` array, while positive indexes will be used to access the `right` array. This gives us an **infinite memory system** that grows in both directions.

```js
class Memory {
  constructor(initialMemory) {
    this.left = [];
    this.right = [];
    this.pointer = 0;
  }

  get(index) {
    if (index >= 0) return this.#getRight(index);
    return this.#getLeft(-index - 1);
  }

  set(index, value) {
    if (index >= 0) this.#setRight(index, value);
    else this.#setLeft(-index - 1, value);
  }

  movePointer(offset) {
    this.pointer += offset;
  }

  #getLeft(index) {
    if (this.left[index] === undefined) this.left[index] = 0;
    return this.left[index];
  }

  #setLeft(index, value) {
    this.left[index] = Math.min(Math.max(value, 0), 255);
  }

  #getRight(index) {
    if (this.right[index] === undefined) this.right[index] = 0;
    return this.right[index];
  }

  #setRight(index, value) {
    this.right[index] = Math.min(Math.max(value, 0), 255);
  }
}

export default Memory;
```

> [!NOTE]
>
> Yes, technically this isn't an infinite memory system, as it's **constrained by the actual memory** of the machine running the JavaScript code. But, for all intents and purposes, it can be scaled to any size, given enough real memory.

Notice that we **overflow and underflow** values to the range `[0, 255]`, as Brainfuck uses 1-byte cells. This allows us to handle wrapping around the edges of the memory.

### Input and output

For **input and output**, we'll use the standard `process.stdin` and `process.stdout` streams. We'll be reading and writing **single bytes** at a time and converting from the byte value to a character and vice versa. This is a trivial task using `String.fromCharCode()` and `String.prototype.charCodeAt()`.

```js
// Read one byte
process.stdin.read(1).charCodeAt(0);

// Write one byte (65 is the ASCII code for 'A')
process.stdout.write(String.fromCharCode(65));
```

### Tokenization

**Tokenization** will be very similar to Smallfuck, except for the set of characters that are allowed. However, we'll make three **optimizations** that will drastically reduce the size and complexity of our AST:

1. We'll **merge consecutive** `+` and `-` commands into a single command that increments or decrements the current cell by the sum of the commands. This will require the addition of a `diff` parameter to the AST nodes.
2. We'll **merge consecutive** `>` and `<` commands into a single command that moves the pointer by the sum of the commands. This will require the addition of an `offset` parameter to the AST nodes.
3. We'll **replace the pattern** `[-]` with a single command that sets the current cell to `0`. This will require the addition of a new node type for this specific command, but will drastically reduce execution time.

```plaintext
Brainfuck code: ++-+><<<[-]>+
Tokens: [['+', 2], ['>', -2], '0', '>', '+']
```

## Abstract Syntax Tree

An **Abstract Syntax Tree** (AST) is a tree representation of the abstract syntactic structure of source code written in a programming language. It's a way to represent the code in a way that's easier to manipulate and interpret. For Brainfuck, the AST is quite simple, as the language itself is simple.

Each **node** in the AST represents a command in the Brainfuck language. The nodes have a `type` property that can be one of the Brainfuck commands. Loop nodes are the only special case, requiring an additional `nodes` property to store the inner nodes.

```plaintext
Brainfuck code: +[>++<-]
AST:
[
  { type: 'increment' },
  {
    type: 'loop',
    nodes: [
      { type: 'moveRight' },
      { type: 'increment' },
      { type: 'increment' },
      { type: 'moveLeft' },
      { type: 'decrement' }
    ]
  }
]
```

### The AST class

The `AST` class represents the AST of a Brainfuck program. It has a single property, `nodes`, which is an array of nodes. The class has a single method, `addNode`, which adds a new node to the AST.

```js [ast.js]
class AST {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }
}

export default AST;
```

### The ASTNode class

The `ASTNode` class represents a single node in the AST. For flexibility, I'll first define a set of `nodeTypes` as an object representing the various node types (its keys) and their parameters, such as `offset`, `diff`, and `nodes`.

```js [astNode.js]
const nodeTypes = {
  movePointer: { params: { offset: 0 } },
  updateCell: { params: { diff: 0 } },
  clearCell: { params: {} },
  printValue: { params: {} },
  readValue: { params: {} },
  loop: { params: { nodes: null } }
};

const typeNames = Object.keys(nodeTypes);
```

As you can see, we've used **descriptive names** for the node types, such as `movePointer`and `updateCell`. This will make the tree easier to read and understand. Moreover, we'll group `+` and `-` under `updateCell`, and `>` and `<` under `movePointer`, as the additional parameters will allow us to differentiate between them.

We can now define a simple `ASTNode` class that will take a `type` and `params` object as arguments. The `params` object will be validated against the `nodeTypes` object to ensure that the **node type** is valid and that the **parameters** are correct.

```js [astNode.js]
const nodeTypes = { /* ... */ };
const typeNames = Object.keys(nodeTypes);

class ASTNode {
  constructor(type, params = {}) {
    if (!typeNames.includes(type)) {
      throw new Error(`Invalid node type: ${type}`);
    } else {
      this.type = type;
      const { params: paramsWithDefaults } = nodeTypes[type];

      Object.entries(paramsWithDefaults).forEach(([key, defaultValue]) => {
        this[key] = params[key] || defaultValue;
      });
    }
  }
}

export default ASTNode;
```

## Code parser

We'll use a **regular expression** to first clean up the code by removing any characters that are not part of the Brainfuck language. We'll then split the code into character tokens and then **merge consecutive tokens** of the same type.

```js [parser.js]
class Parser {

  static splitTokens(code) {
    return code.replace(/[^><+\-,.[\]]/gm, '').split('');
  }

  static mergeConsecutiveTokens(tokens) {
    let mergedTokens = [];
    let lastGroup = null;

    for (let token of tokens) {
      if (lastGroup) {
        const [tokens, count] = lastGroup;
        if (tokens.includes(token)) {
          lastGroup[1] += token === tokens[0] ? 1 : -1;
          continue;
        } else if (
          token === ']' &&
          tokens === '+-' &&
          count === -1 &&
          mergedTokens[mergedTokens.length - 1] === '['
        ) {
          mergedTokens.pop();
          lastGroup = null;
          mergedTokens.push('0');
          continue;
        } else {
          if (count) mergedTokens.push([tokens[0], count]);
          lastGroup = null;
        }
      }

      if (token === '>') lastGroup = ['><', 1];
      else if (token === '<') lastGroup = ['><', -1];
      else if (token === '+') lastGroup = ['+-', 1];
      else if (token === '-') lastGroup = ['+-', -1];
      else mergedTokens.push(token);
    }

    if (lastGroup) {
      const [tokens, count] = lastGroup;
      if (count) mergedTokens.push([tokens[0], count]);
    }

    return mergedTokens;
  }
}

export default Parser;
```

Up until this point, everything should be similar to the Smallfuck interpreter. Notice that we've taken some liberties in the `mergeConsecutiveTokens` method to represent consecutive tokens as **2-element arrays** (type and `offset`/`diff`), as well as handling the `[-]` pattern, replacing it with a `0` token. This intermediate step isn't absolutely necessary, but it helped me debug the code and seemed a lot easier to read than going from raw tokens to AST nodes representing multiple nodes directly.

Finally, we can add our `parse` function to tie it all up:

```js [parser.js]
import AST from './ast.js';
import ASTNode from './astNode.js';

class Parser {
  static parse(code) {
    const tokens = this.splitTokens(code);
    const mergedTokens = this.mergeConsecutiveTokens(tokens);

    let ast = new AST();
    let stack = [];

    for (let token of mergedTokens) {
      if (Array.isArray(token)) {
        const [type, count] = token;
        if (type === '>')
          ast.addNode(new ASTNode('movePointer', { offset: count }));
        else if (type === '+')
          ast.addNode(new ASTNode('updateCell', { diff: count }));
      } else {
        switch (token) {
          case '>':
            ast.addNode(new ASTNode('movePointer', { offset: 1 }));
            break;
          case '<':
            ast.addNode(new ASTNode('movePointer', { offset: -1 }));
            break;
          case '+':
            ast.addNode(new ASTNode('updateCell', { diff: 1 }));
            break;
          case '-':
            ast.addNode(new ASTNode('updateCell', { diff: -1 }));
            break;
          case '.':
            ast.addNode(new ASTNode('printValue'));
            break;
          case ',':
            ast.addNode(new ASTNode('readValue'));
            break;
          case '0':
            ast.addNode(new ASTNode('clearCell'));
            break;
          case '[':
            stack.push(ast);
            ast = new AST();
            break;
          case ']':
            const loop = new ASTNode('loop', { nodes: ast });
            ast = stack.pop();
            ast.addNode(loop);
            break;
          default:
            throw new Error(`Invalid token: ${token}`);
        }
      }
    }

    if (stack.length) throw new Error('Unmatched loop start');

    return ast;
  }

  // ...
}

export default Parser;
```

I think the only point worth mentioning here is, as is often the case, the use of a **stack** for loops. It helps us create the nested structure of the AST, but also acts as a way to **validate that all loop brackets are matched**.

## Code execution

The AST itself is essentially a simple array of nodes. To execute it, we can use a simple **loop over the nodes**. Each node will then define what to do based on its type. Loop nodes will follow a similar pattern, implementing their own loop logic over their internal nodes. Let's see what that looks like for the `AST` class:

```js [ast.js]
class AST {
  // ...

  execute({ memory, stdin, stdout}) {
    for (let node of this.nodes) {
      node.execute({ memory, stdin, stdout });
    }
  }
}

export default AST;
```

Now, for the `ASTNode` class, we can simply extend the `nodeTypes` object to include a `createExecute` method for each node. This way we can prepare the `execute` function in the `constructor`, instead of having to write a `switch` statement:

```js [astNode.js]
const nodeTypes = {
  movePointer: {
    params: { offset: 0 },
    createExecute({ offset }) {
      return ({ memory }) => {
        memory.movePointer(offset);
      };
    }
  },
  updateCell: {
    params: { diff: 0 },
    createExecute({ diff }) {
      return ({ memory }) => {
        memory.set(memory.pointer, memory.get(memory.pointer) + diff);
      };
    }
  },
  clearCell: {
    params: {},
    createExecute() {
      return ({ memory }) => {
        memory.set(memory.pointer, 0);
      };
    }
  },
  printValue: {
    params: {},
    createExecute() {
      return ({ memory, stdout }) => {
        stdout.write(String.fromCharCode(memory.get(memory.pointer)));
      };
    }
  },
  readValue: {
    params: {},
    createExecute() {
      return ({ memory, stdin }) => {
        memory.set(memory.pointer, stdin.read(1)?.charCodeAt(0) ?? 0);
      };
    }
  },
  loop: {
    params: { nodes: null },
    createExecute({ nodes }) {
      return ({ memory, stdin, stdout }) => {
        while (memory.get(memory.pointer)) {
          nodes.execute({ memory, stdin, stdout });
        }
      };
    }
  }
};

const typeNames = Object.keys(nodeTypes);

class ASTNode {
  constructor(type, params = {}) {
    if (!typeNames.includes(type)) {
      throw new Error(`Invalid node type: ${type}`);
    } else {
      this.type = type;
      const { params: paramsWithDefaults } = nodeTypes[type];

      Object.entries(paramsWithDefaults).forEach(([key, defaultValue]) => {
        this[key] = params[key] || defaultValue;
      });

      this.execute = nodeTypes[type].createExecute(this);
    }
  }
}

export default ASTNode;
```

And that's it! We now have a fully functional Brainfuck interpreter that uses an AST to represent the code and execute it. Let's put it to the test:

```js
import Memory from './memory.js';
import Parser from './parser.js';

const program = '++++++++[>++++[>++<-]>+[<]<-]>>.---.+++++++..+++.';
const ast = Parser.parse(program);

ast.execute({
  memory: new Memory(),
  stdin: process.stdin,
  stdout: process.stdout
});

process.stdout.write('\n');
// Output: 'HELLO\n';
```

## Conclusion

We've come halfway through the whole project in this first part of the implementation. Next time around, we'll be building a **virtual machine** to run the code in a more controlled environment. This will allow us to add **safety measures** and **timeouts** to the code execution, as well as **debugging tools**, shall we need them. Stay tuned!

> [!NOTE]
>
> You can find the codebase for this entire project in [this GitHub repository](https://github.com/Chalarangelo/bf-interpreter). Feel free to clone it and play around with it! Give it a star if you like it, too!
