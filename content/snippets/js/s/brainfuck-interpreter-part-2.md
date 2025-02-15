---
title: Making a Brainfuck interpreter in JavaScript - Part 2
shortTitle: Brainfuck interpreter - Part 2
language: javascript
tags: [algorithm]
cover: mug-flower-book
excerpt: Picking up where I left off last time, I'm wrapping up the Brainfuck interpreter, by making a simple VM for code execution and debugging.
listed: true
dateModified: 2025-03-08
---

In the [last article](/js/s/brainfuck-interpreter-part-1), I explored the basics of Brainfuck tokenization and interpretation, using **Abstract Syntax Trees** (AST) to represent the program. In this article, I will continue to build on that foundation by implementing a **VM-like interpreter** that can execute the AST. I'll also wrap the whole thing up, by adding some **command-line scripts** to parse and run Brainfuck programs.

## The interpreter

Previously, we explored how we can add an `execute` method to the `AST` and `ASTNode` classes to run the program. However, we may want far more flexibility in interpretation, especially if we were working with a more complex language with more instructions or more complex constructs.

To deal with this complexity, we can delegate code execution to a separate class. As my implementation is a mix of an interpreter and a VM in itself, I'll call this class, the `Runner`. So, what are the **responsibilities** we want to give this class?

### Runner responsibilities

First and foremost, we need it to be able to **execute the program**, provided as an AST. Then, we want it to handle **input**, **output** and **memory management**. The input and output need to be **configurable**, so we can potentially supply all of the input ahead of time, or output to a file, for example.

Memory management will use the underlying `Memory` class, but we may want to swap it out for a different implementation in the future, or provide an **initial memory setup**.

Next up, we want to provide a **maximum number of steps** to run the program for, to prevent infinite loops. We'll also add a safeguard to **terminate via a signal** sent as a method call to the `Runner`.

> [!NOTE]
>
> I found that implementing **event-driven logic** to actually handle signal-based termination was too much for this article, but I had already written the method and thought I'd share it, if you want to try it out yourself.

Finally, we'll add the ability to pass **flags** before execution. For now, we'll only implement a `debug` flag with additional output, but we could add more in the future.

Let's see what this core looks like:

```js [runner.js]
import { Readable, Writable } from 'stream';
import Memory from './memory.js';

const MAX_INSTRUCTIONS = 10_000;

class Runner {
  #hasTerminated = false;

  constructor(
    ast,
    {
      stdin = process.stdin,
      stdout = process.stdout,
      memory,
      maxInstructionCount = MAX_INSTRUCTIONS,
      debug = false,
    } = {}
  ) {
    this.ast = ast;
    this.stdin = typeof stdin === 'string' ? this.#toInStream(stdin) : stdin;
    this.stdout = debug ? this.#toDebugWriteStream(stdout) : stdout;
    this.memory = new Memory(memory);
    this.maxInstructionCount = maxInstructionCount ?? MAX_INSTRUCTIONS;
    this.debug = debug;
  }

  get hasTerminated() {
    return this.#hasTerminated;
  }

  get hasExceededInstructionCount() {
    return this.instructionCounter > this.maxInstructionCount;
  }

  stop() {
    this.#terminate('Stopped');
  }

  #terminate(error = null) {
    this.#hasTerminated = true;

    const status = error ? 1 : 0;
    const message = error ?? 'Success';

    if (this.debug) {
      const output = this.output;

      process.stdout.write('\n');
      process.stdout.write(`Status: ${message} (Code: ${status})\n`);
      process.stdout.write(`Memory: ${this.memory.toString()}\n`);
      process.stdout.write(`Instruction count: ${this.instructionCounter}\n`);

      if (output)
        process.stdout.write(
          `Output: [${output.split('\n').filter(Boolean).join(', ')}]\n`
        );
    }
    process.exit(status);
  }

  #toInStream(string) {
    const stream = new Readable();
    stream.setEncoding('ascii');
    stream.push(string);
    stream.push(null);
    return stream;
  }

  #toDebugWriteStream(stream) {
    this.output = '';

    return new Writable({
      write: (chunk, encoding, callback) => {
        this.output += chunk.toString();
        callback();
      },
    });
  }
}

export default Runner;
```

As you can see, there's a lot going on here and we've yet to implement actual execution logic. We're relying on **Node.js streams** to make input and output configurable, allowing us to pass input as a string or make output print all out at once in debug mode. We're also setting up the early termination system we mentioned to make it easier to stop the program if it runs too long.

### Memory upgrades

You may have noticed I snuck in some changes to the `Memory` class, the most important one of which comes as an **argument** to the `constructor`. We can now initialize our memory with some data, if we so desire, which may come in handy for debugging segments of code without having to perform the entire setup manually.

I also added a subtle change, in expecting `Memory` to respond with a nice output to the `toString()` method. This will make it easier to debug the memory state at any given time. Let's see what that looks like:

```js [memory.js]
class Memory {
  constructor(initialMemory) {
    this.left = [];
    this.right = [];
    this.pointer = 0;

    if (typeof initialMemory === 'undefined' || initialMemory === null) return;
    if (typeof initialMemory === 'string') {
      initialMemory
        .split('')
        .forEach((value, index) => this.set(index, value.charCodeAt(0)));
      return;
    }
    if (Array.isArray(initialMemory)) {
      initialMemory.forEach((value, index) => this.set(index, value));
      return;
    }

    if (typeof initialMemory === 'object') {
      const keys = Object.keys(initialMemory);
      if (
        keys.includes('left') &&
        keys.includes('right') &&
        keys.includes('pointer')
      ) {
        this.left = [...memory.left];
        this.right = [...memory.right];
        this.pointer = memory.pointer;
        return;
      }
    }
  }

  toString() {
    const leftLength = this.left.length;
    const memory = [...this.left, ...this.right]
      .map((v, i) => {
        const value = v || 0;
        const pointer = i < leftLength ? -leftLength + i : i - leftLength;
        const characterMap = value => {
          if (value === 9) return '\\t';
          if (value === 10) return '\\n';
          if (value === 13) return '\\r';
          if (value < 32) return null;
          if (value > 126) return null;
          return String.fromCharCode(value);
        };
        const string = characterMap(value);
        return `${pointer}: ${value}${string ? ` (${string})` : ''}`;
      })
      .join(', ');

    return `[${memory}]`;
  }

  // ...
}

export default Memory;
```

## Running the code

In the previous iteration, we would run the code by calling `execute` on the `AST` object. We would then pass down the memory, input and output streams to the `ASTNode` objects, which would then call the appropriate methods on the `Memory` object.

We won't deviate that much here, but we'll use the `Runner` class instance to wrap all of this in a nice package. We'll also make sure to **delegate responsibility** for some things to the runner, so that nodes have lean implementations, focusing on their own logic.

### Running instructions

The `Runner` class will be given **instructions** in the form of functions. These will correspond to the various `ASTNode` types, but we'll make sure to pass the `Runner` instance to them, so they can delegate responsibility to it. The runner will then perform the necessary **checks**, such as whether the program has terminated or exceeded the instruction count, **run the instruction** and update the **instruction counter**. We can add debugging logic in this step, as needed.

We'll also provide a way to run an entire `AST`, in a similar fashion. The only major change is that the `AST` will be given the `Runner` instance to pass down to its children, thus making the instance available to all subsequent instructions.

```js [runner.js]
import { Readable, Writable } from 'stream';
import Memory from './memory.js';

const MAX_INSTRUCTIONS = 10_000;

class Runner {
  // ...

  run() {
    this.instructionCounter = 0;
    this.ast.execute(this);
    this.#hasTerminated = true;
    this.#terminate();
  }

  runInstruction(instruction) {
    if (this.hasExceededInstructionCount) {
      this.#terminate('Instruction count exceeded');
    } else if (this.hasTerminated) {
      this.#terminate('Terminated unexpectedly');
    }

    instruction(this);
    this.instructionCounter++;
  }

  // ...
}

export default Runner;
```

### Running the AST

The changes to the `AST` class are, as I said, fairly minimal. We'll swap out the previously unnamed object argument for a `Runner` instance, which we'll pass down to the `ASTNode` objects. We'll also call `runner.runInstruction` on each node, which will then call the appropriate instruction.

```js [ast.js]
class AST {
  // ...

  execute(runner) {
    for (let node of this.nodes) {
      runner.runInstruction(node.instruction);
    }
  }
}

export default AST;
```

### Running the nodes

The `ASTNode` class will now be given expected to have an `instruction` property, instead of its previous `execute()` method. We can simply update the `nodeTypes` definitions and the `constructor` to make this happen:

```js [astNode.js]
const nodeTypes = {
  movePointer: {
    params: { offset: 0 },
    createInstruction(node) {
      const { offset } = node;
      return runner => {
        const { memory } = runner;
        memory.movePointer(offset);
      };
    }
  },
  updateCell: {
    params: { diff: 0 },
    createInstruction(node) {
      const { diff } = node;
      return runner => {
        const { memory } = runner;
        memory.set(memory.pointer, memory.get(memory.pointer) + diff);
      };
    }
  },
  clearCell: {
    params: {},
    createInstruction() {
      return runner => {
        const { memory } = runner;
        memory.set(memory.pointer, 0);
      };
    }
  },
  printValue: {
    params: {},
    createInstruction() {
      return runner => {
        const { memory, stdout } = runner;
        stdout.write(String.fromCharCode(memory.get(memory.pointer)));
      };
    }
  },
  readValue: {
    params: {},
    createInstruction() {
      return runner => {
        const { memory, stdin } = runner;
        const value = stdin.read(1)?.charCodeAt(0) ?? 0;
        memory.set(memory.pointer, value);
      };
    }
  },
  loop: {
    params: { nodes: null },
    createInstruction(node) {
      const { nodes } = node;
      return runner => {
        const { memory } = runner;
        while (memory.get(memory.pointer) !== 0) nodes.execute(runner);
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

      this.instruction = nodeTypes[type].createInstruction(this);
    }
  }
}

export default ASTNode;
```

Not much of a change, except for semantics. The `Runner` can now handle most of the heavy lifting and allow for debugging, early termination and additional configuration.

## Command-line interface

Before we go, I want to tidy up the project, by providing a couple of **command-line scripts**, one for parsing and one for code execution.

### Parser

The parser script is a simple one-liner which reads a **brainfuck program string** and produces an **AST**. We'll use the `parse` function from the previous article to do this.

```js [parser.js]
#!/usr/bin/env node
import { argv } from 'node:process';

import Parser from '#src/parser.js';

const [, , ...args] = argv;

if (args.length === 0) throw new Error('No input provided');

const [input] = args;

const ast = Parser.parse(input);
process.stdout.write(JSON.stringify(ast, null, 2));
```

```sh
$ chmod +x parser.js
$ ./parser.js '+++++++>[-]'
# Produces the AST
```

### AST deserialization

Before we move forwards, I want to point out that we can write our AST to a file (e.g. via piping the output to a file), but we have no way of recreating it from that file yet. We'll add a `fromJSON` method to both the `AST` and `ASTNode` classes to that end.

```js [ast.js]
import ASTNode from './astNode.js';

class AST {
  // ...

  static fromJSON(json) {
    const ast = new AST();
    json.nodes.forEach(node => ast.addNode(ASTNode.fromJSON(node)));
    return ast;
  }
}

export default AST;
```

```js [astNode.js]
import AST from './ast.js';

class ASTNode {
  // ...

  static fromJSON(json) {
    const { type, ...params } = json;
    if (type === 'loop') {
      return new ASTNode(type, { nodes: AST.fromJSON(params.nodes) });
    } else {
      return new ASTNode(type, params);
    }
  }
}

export default ASTNode;
```

### Executer

The executer script is much more complex. We'll give it a few **flags** to allow it to configure the input, memory, debug mode and finally parse code, read from a file or accept an AST as input.

```js [execute.js]
#!/usr/bin/env node
import { argv } from 'node:process';
import { readFileSync } from 'node:fs';

import Parser from '#src/parser.js';
import Runner from '#src/runner.js';
import AST from '#src/ast.js';

const [, , ...args] = argv;

if (args.length === 0) throw new Error('No input provided');

const executionParams = {
  stdin: process.stdin,
  stdout: process.stdout,
  memory: null,
  maxInstructionCount: null,
  debug: false,
};

let ast = null;

const [...params] = args;

params.forEach(param => {
  if (!param.includes('=') && !param.startsWith('-')) {
    const inputData = readFileSync(param, 'utf-8');
    ast = AST.fromJSON(JSON.parse(inputData));
    return;
  }

  const [key, value] = param.split('=');
  switch (key) {
    case '--input':
    case '-i':
      executionParams.input = value;
      break;
    case '--memory':
    case '-m':
      executionParams.memory = value;
      break;
    case '--debug':
    case '-d':
      executionParams.debug = true;
    case '--count':
    case '-c':
      executionParams.maxInstructionCount = value;
      break;
    case '--parse':
    case '-p':
      ast = Parser.parse(value);
      break;
    case '--bf':
    case '-b':
      const inputData = readFileSync(value, 'utf-8');
      ast = Parser.parse(inputData);
      break;
  }
});

const runner = new Runner(ast, executionParams);
runner.run();
```

We can pass a file pointing to an **AST as input** or use some of the **options** for the code parsing and input, instead. The options are as follows:

- `--input` or `-i` to provide input for the program
- `--memory` or `-m` to provide initial memory
- `--debug` or `-d` to enable debug mode
- `--count` or `-c` to set the maximum instruction count
- `--parse` or `-p` to parse a string as input
- `--bf` or `-b` to read a file as input

```sh
$ chmod +x executer.js
$ ./executer.js -b program.bf --input 'Hello, World!'
# Executes the program in program.bf with the input 'Hello, World!'
```

## Conclusion

Wow! That was quite a long journey, but we've finally reached the end. We've built a **Brainfuck interpreter** from the ground up, using **Abstract Syntax Trees** to represent the program and a simple **virtual machine** to execute it. We've also added some **command-line scripts** to parse and run Brainfuck programs. I really hope you enjoyed these articles and that you've learned something new. I'll be back soon with more interesting topics, so stay tuned!

> [!NOTE]
>
> You can find the codebase for this entire project in [this GitHub repository](https://github.com/Chalarangelo/bf-interpreter). Feel free to clone it and play around with it! Give it a star if you like it, too!
