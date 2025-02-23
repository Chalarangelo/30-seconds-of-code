---
title: Create a math expression parser in JavaScript
shortTitle: Math expression parser
language: javascript
tags: [math,algorithm]
cover: colorful-pots
excerpt: Building on top of everything we've tried in past articles, we'll use the Earley parsing algorithm to parse and evaluate math expressions.
listed: true
dateModified: 2025-03-12
---

In previous articles, we've explored [how to tokenize math expressions](/js/s/math-expression-tokenizer) and [parsing using Abstract Syntax Trees](/js/s/brainfuck-interpreter-part-1). This time around, we're revisiting **math expressions**, to build a robust parsing and evaluation system combining the two techniques, and more.

## Context-free grammars

A **context-free grammar** (CFG) is a set of rules that define the structure of a language. It consists of a set of **terminal symbols**, **non-terminal symbols**, a **start symbol**, and a set of **production rules**. The production rules define how the non-terminal symbols can be replaced by a sequence of terminal and non-terminal symbols.

Let's look at an example of a simple CFG, representing **basic arithmetic expressions**:

| Rule | Production |
|------|------------|
| P    | S          |
| S    | S + M      |
| S    | M          |
| M    | M * T      |
| M    | T          |
| T    | number     |

These simple rules allow us to generate expressions like `2 + 3 * 4`. The start symbol `P` is replaced by `S`, which can be replaced by `S + M` or `M`. The process continues until we reach terminal symbols like `number`, which is any numeric value, in this example. Rules can also be written like `S → S + M` to indicate that `S` can be replaced by `S + M`.

## Earley parsing algorithm

The **Earley parsing algorithm** is a general context-free parsing algorithm, that uses **dynamic programming** to parse strings according to a CFG. It's a top-down, predictive parser that can handle any CFG, including ambiguous grammars.

The steps of the algorithm are as follows:

1. **Initialization**: Create a set of states, each representing a possible parsing state. The initial state is created with the start symbol at position 0. This is the starting point of the parsing process.
2. **Prediction**: For each state, predict possible next states based on the current state. This is done by looking at the next symbol in the production rule and creating a new state with the dot moved one position to the right.
3. **Scanning**: For each state, scan the next token in the input string. If the token matches the next symbol in the production rule, create a new state with the dot moved one position to the right.
4. **Completion**: For each state, complete the state by adding the state that predicted it. This is done by looking at the states that predicted the current state and checking if the dot is at the end of the production rule. If it is, create a new state with the dot moved one position to the right.

### Parsing example

Instead of going over the specifics of each step in detail, which I'm sure you can find in many other resources ([Wikipedia](https://en.wikipedia.org/wiki/Earley_parser) has a terrific lemma on the topic, that I based the below example on), we'll take a look at the example of parsing the expression `2 + 3 * 4`. Note that `•` represents the current position in the parsing process. If it's at the end of a production, it means that the production is **complete**.

<style>
  #replay {
    min-height: 24.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #replay > .table-wrapper:not(.selected) {
    display: none;
  }

  #replay > .table-wrapper.selected {
    display: grid;
  }

  #replay > .table-wrapper.selected > figcaption {
    order: -1;
    text-align: center;
    font-size: var(--font-md);
    font-weight: var(--font-weight-strong);
    border-color: var(--color-border-light);
    border-block-end-width: var(--border-width-thin);
    margin: var(--spacing-4) var(--spacing-2) 0;
    padding-block-end: var(--spacing-2);
  }

  @media (min-width: 40rem) {
    #replay > .table-wrapper.selected td:last-child {
      width: 20rem;
    }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const labels = [
      'S(0): • 2 + 3 * 4',
      'S(1): 2 • + 3 * 4',
      'S(2): 2 + • 3 * 4',
      'S(3): 2 + 3 • * 4',
      'S(4): 2 + 3 * • 4',
      'S(5): 2 + 3 * 4 •',
    ];

    const [prevButton, nextButton] = [
      ...document.querySelectorAll('#replay button')
    ];
    const steps = [
      ...document.querySelectorAll('#replay > .table-wrapper')
    ];
    steps.forEach((step, index) => {
      const caption = document.createElement('figcaption');
      caption.innerText = labels[index];
      step.appendChild(caption);
    });

    const stepCounter = document.querySelector('#replay p');
    const stepCount = steps.length;
    let selectedStep = 0;
    steps[0].classList.add('selected');

    const updateSelectedStep = newSelectedPage => {
      if (newSelectedPage < 0 || newSelectedPage >= stepCount) return;

      steps[selectedStep].classList.remove('selected');
      selectedStep = newSelectedPage;
      steps[selectedStep].classList.add('selected');
      prevButton.setAttribute('aria-disabled', selectedStep === 0);
      nextButton.setAttribute('aria-disabled', selectedStep === stepCount - 1);
      stepCounter.innerText = `Step ${selectedStep}`;
    }

    prevButton.addEventListener('click', () => {
      updateSelectedStep(selectedStep - 1);
    });
    nextButton.addEventListener('click', () => {
      updateSelectedStep(selectedStep + 1);
    });
  });
</script>

<figure id="replay">

| State No. | Production   | Origin | Comment                     |
|-----------|--------------|--------|-----------------------------|
| 1         | P → • S      | 0      | start rule                  |
| 2         | S → • S + M  | 0      | predict from (1)            |
| 3         | S → • M      | 0      | predict from (1)            |
| 4         | M → • M * T  | 0      | predict from (3)            |
| 5         | M → • T      | 0      | predict from (3)            |
| 6         | T → • number | 0      | predict from (5)            |

| State No. | Production   | Origin | Comment                     |
|-----------|--------------|--------|-----------------------------|
| 1         | T → number • | 0      | scan from S(0)(6)           |
| 2         | M → T •      | 0      | complete from (1) & S(0)(5) |
| 3         | M → M • * T  | 0      | complete from (2) & S(0)(4) |
| 4         | S → M •      | 0      | complete from (2) & S(0)(3) |
| 5         | S → S • + M  | 0      | complete from (4) & S(0)(2) |
| 6         | P → S •      | 0      | complete from (4) & S(0)(1) |

| State No. | Production   | Origin | Comment                     |
|-----------|--------------|--------|-----------------------------|
| 1         | S → S + • M  | 0      | scan from S(1)(5)           |
| 2         | M → • M * T  | 2      | predict from (1)            |
| 3         | M → • T      | 2      | predict from (1)            |
| 4         | T → • number | 2      | predict from (3)            |

| State No. | Production   | Origin | Comment                     |
|-----------|--------------|--------|-----------------------------|
| 1         | T → number • | 2      | scan from S(2)(4)           |
| 2         | M → T •      | 2      | complete from (1) & S(2)(3) |
| 3         | M → M • * T  | 2      | complete from (2) & S(2)(2) |
| 4         | S → S + M •  | 0      | complete from (2) & S(2)(1) |
| 5         | S → S • + M  | 0      | complete from (4) & S(0)(2) |
| 6         | P → S •      | 0      | complete from (4) & S(0)(1) |

| State No. | Production   | Origin | Comment                     |
|-----------|--------------|--------|-----------------------------|
| 1         | M → M * • T  | 2      | scan from S(3)(3)           |
| 2         | T → • number | 4      | predict from (1)            |

| State No. | Production   | Origin | Comment                     |
|-----------|--------------|--------|-----------------------------|
| 1         | T → number • | 4      | scan from S(4)(2)           |
| 2         | M → M * T •  | 2      | complete from (1) & S(4)(1) |
| 3         | M → M • * T  | 2      | complete from (2) & S(2)(2) |
| 4         | S → S + M •  | 0      | complete from (2) & S(2)(1) |
| 5         | S → S • + M  | 0      | complete from (4) & S(0)(2) |
| 6         | P → S •      | 0      | complete from (4) & S(0)(1) |

<figcaption aria-label="Replay steps">
  <button aria-disabled="true">Previous</button>
  <button>Next</button>
  <p>Step 0</p>
</figcaption>

</figure>

## Parsing mathematical expressions

Now that we have a basic understanding of the Earley parsing algorithm, let's implement a **parser for mathematical expressions** in JavaScript. We'll use the algorithm to parse the input string and build an **abstract syntax tree** (AST) representing the expression.

> [!NOTE]
>
> For the sake of brevity, a lot of **type checking** code has been omitted from the snippets. You can find the complete implementation of this project in [this GitHub repository](https://github.com/Chalarangelo/cfg-parser). Make sure to **give it a star** if you find it useful!

### Rules & symbols

Rules in a CFG are comprised of a **left-hand side** (LHS) and a **right-hand side** (RHS). The LHS is a **non-terminal symbol**, and the RHS is a **sequence of terminal and non-terminal symbols**. To facilitate this, we'll define a `Sym` class and a `Rule` class to represent symbols and rules, respectively.

```js [sym.js]
class Sym {
  static knownSymbols = new Set();

  static define(...names) {
    for (let name of names)
      if (!Sym.knownSymbols.has(name)) {
        Sym.knownSymbols.add(name);
        Object.defineProperty(Sym, name, { get: () => name });
      }
  }

  static isKnown(symbol) {
    return Sym.knownSymbols.has(symbol);
  }
}

export default Sym;
```

```js [rule.js]
class Rule {
  constructor(leftHandSide, rightHandSide) {
    this.leftHandSide = leftHandSide;
    this.rightHandSide = rightHandSide;
    this.isTerminal =
      rightHandSide.length === 1 &&
      (typeof rightHandSide[0] === 'string' ||
        rightHandSide[0] instanceof RegExp);
  }

  get tokenMatcher() {
    if (!this.isTerminal) return null;

    const [symbol] = this.rightHandSide;
    if (symbol instanceof RegExp) return symbol;

    const escapedSymbol = symbol.replace(/[.*+-?^${}()|[\]\\\/]/g, '\\$&');
    return new RegExp(`${escapedSymbol}`);
  }

  matches(token) {
    return this.isTerminal && this.tokenMatcher.test(token);
  }

  equals(otherRule) {
    return (
      this.rightHandSide.length === otherRule.rightHandSide.length &&
      this.rightHandSide.every((s, i) => s === otherRule.rightHandSide[i])
    );
  }

  includesRuleAt(index, otherRule) {
    return this.rightHandSide[index] === otherRule.leftHandSide;
  }

  get length() {
    return this.rightHandSide.length;
  }
}

export default Rule;
```

Having these two classes, we can now **define symbols and rules**, like so:

```js
Sym.define('P', 'S', 'M', 'T', '+', '*');

const rules = [
  // P → S
  new Rule(Sym.P, [Sym.S]),
  // S → S + M
  new Rule(Sym.S, [Sym.S, Sym['+'], Sym.M]),
  // S → M
  new Rule(Sym.S, [Sym.M]),
  // M → M * T
  new Rule(Sym.M, [Sym.M, Sym['*'], Sym.T]),
  // M → T
  new Rule(Sym.M, [Sym.T]),
  // T → number
  new Rule(Sym.T, [/\d+/]),
  // + → '+'
  new Rule(Sym['+'], ['+']),
  // * → '*'
  new Rule(Sym['*'], ['*']),
];
```

Notice how **literal tokens** like `+` and `*` need to be defined as their own symbols and are represented as **strings**. Similarly, **numeric values** are represented as **regular expressions**. This allows us to tokenize the input string and match tokens against the rules, as we'll see shortly.

### Context-free grammar

Given a set of rules, we can now define a context-free grammar (CFG) class to hold the rules and provide methods for working with them. We'll extract the rules, symbols and **token matchers** when creating the CFG to make them easily accessible.

```js [cfg.js]
class CFG {
  constructor(rules) {
    rules.forEach(rule => this.addRule(rule));
  }

  addRule(rule) {
    this.rules.push(rule);
    this.symbols.add(rule.leftHandSide);
  }

  hasSymbol(symbol) {
    return this.symbols.has(symbol);
  }

  get tokenMatchers() {
    let tokenMatchers = [];
    this.rules.forEach(rule => {
      if (rule.isTerminal) tokenMatchers.push(rule.tokenMatcher);
    });

    return tokenMatchers;
  }
}

export default CFG;
```

We can now create a CFG instance with the rules we defined earlier:

```js
const cfg = new CFG(rules);
```

### Tokenization

Having extracted the **token matchers** from the CFG, we can feed them to a **tokenizer** that will take an **input string** and produce an **array of tokens**. We'll then feed these tokens to the Earley parser to build the AST.

```js [tokenizer.js]
import CFG from './cfg.js';

class Tokenizer {
  constructor(cfg) {
    this.tokenMatchers = cfg.tokenMatchers;
  }

  tokenize(input) {
    let tokens = [], index = 0, inputLength = input.length;

    while (index < inputLength) {
      let token = this.tokenizeNextToken(input, index);
      if (!token) throw new Error(`Unexpected token at index ${index}`);

      const { token: tokenValue, index: tokenIndex } = token;
      tokens.push(tokenValue);
      index += tokenIndex + tokenValue.length;
    }

    return tokens;
  }

  tokenizeNextToken(input, index) {
    const slicedInput = input.slice(index);
    const token = this.tokenMatchers.reduce(
      (acc, tokenMatcher) => {
        let match = slicedInput.match(tokenMatcher);
        if (match) {
          const token = match[0];
          const index = match.index;
          if (acc.index === null || index < acc.index) {
            acc.token = token;
            acc.index = index;
          }
        }
        return acc;
      },
      { token: null, index: null }
    );

    if (!token.token) return null;
    return token;
  }
}

export default Tokenizer;
```

We can now create a tokenizer instance and tokenize an input string:

```js
const tokenizer = new Tokenizer(cfg);
const tokens = tokenizer.tokenize('2 + 3 * 4');
// ['2', '+', '3', '*', '4']
```

### AST nodes

Before we can write our parser, we'll have to define an `ASTNode` class, similar to the previous article, so that we can store the **parsed tokens** in a **tree-like structure**.

```js [astNode.js]
class ASTNode {
  constructor({ item, children }) {
    this.type = item.leftHandSide;

    if (
      item.isTerminal &&
      children.length === 1 &&
      typeof children[0] === 'string'
    ) {
      this.value = children[0];
    } else {
      this.children = children.map(child => new ASTNode(child));
    }
  }
}

export default ASTNode;
```

We'll see in a minute how this ties into the Earley parsing algorithm's results.

### Earley parser

Finally, we can implement the **Earley parser**, which will take the **tokens** produced by the tokenizer and build the AST using the CFG rules. The parser will return the **AST root node**, which we'll  use later to evaluate the expression.

```js [earleyParser.js]
import ASTNode from './astNode.js';

class EarleyParser {
  constructor(cfg) {
    this.cfg = cfg;
    this.rulePairs = [...cfg.rules].map(rule => {
      return { rule, position: 0, origin: 0 };
    });
  }

  parse(tokens) {
    const n = tokens.length;
    const states = Array.from({ length: n + 1 }).map(() => []);

    states[0].push(...this.rulePairs);

    for (let i = 0; i <= n; i += 1)
      for (let j = 0; j < states[i].length; j += 1) {
        this.predict(states, i, j);
        if (i < n) this.scan(states, i, j, tokens[i]);
        this.complete(states, i, j);
      }

    const rootStates = states
      .map(state => state.filter(item => item.position >= item.rule.length))
      .reduce(
        (newStates, state, i) => {
          state.forEach(item => {
            newStates[item.origin].push({ ...item, origin: i });
          });
          return newStates;
        },
        Array.from({ length: states.length }).map(() => [])
      );

    return new ASTNode(this.dfs(rootStates, tokens));
  }

  predict(states, i, j) {
    const curr = states[i][j];

    if (this.cfg.hasSymbol(curr.rule.rightHandSide[curr.position])) {
      [...this.cfg.rules].forEach(rule => {
        const stateHasItem =
          curr.position === 0 &&
            states[i].some(item => item.rule.equals(rule));

        if (!stateHasItem)
          states[i].push({ rule, position: 0, origin: i });
      });
    }
  }

  scan(states, i, j, token) {
    const curr = states[i][j];

    if (curr.rule.matches(token))
      states[i + 1].push({ ...curr, position: curr.position + 1 });
  }

  complete(states, i, j) {
    const curr = states[i][j];

    if (curr.position >= curr.rule.length) {
      states[curr.origin].forEach(earleyItem => {
        if (earleyItem.rule.includesRuleAt(earleyItem.position, curr.rule)) {
          const stateHasItem = states[i].some(
            ei =>
              ei.rule.equals(earleyItem.rule) &&
              ei.position === earleyItem.position + 1 &&
              ei.origin === earleyItem.origin
          );

          if (stateHasItem) return;
          states[i].push({ ...earleyItem, position: earleyItem.position + 1 });
        }
      });
    }
  }

  dfs(states, tokens) {
    const root = states[0].reduce((best, curr) => {
      if (best == null || curr.origin > best.origin) return curr;
      return best;
    }, null);

    if (root == null)
      throw new SyntaxError(`Parsing error near '${tokens[0]}' `);

    if (root.origin !== tokens.length)
      throw new SyntaxError(`Parsing error near '${tokens[root.origin]}' `);

    return {
      item: root.rule,
      children: this.dfsHelper(states, root, 0, 0, tokens),
    };
  }

  dfsHelper(states, root, state, depth, tokens) {
    let edges;

    if (state === root.origin && depth === root.rule.length) return [];

    if (depth === 0 && root.rule.matches(tokens[state])) {
      const subMatch =
        this.dfsHelper(states, root, state + 1, depth + 1, tokens);

      if (subMatch) return [tokens[state], ...subMatch];
    }

    edges = states[state]
      .filter(item => root.rule.includesRuleAt(depth, item.rule))
      .map(item => {
        const subMatch =
          this.dfsHelper(states, root, item.origin, depth + 1, tokens);

        if (subMatch)
          return [
            {
              item: item.rule,
              children: this.dfsHelper(states, item, state, 0, tokens),
            },
            ...subMatch,
          ];

        return null;
      })
      .filter(Boolean);

    return edges[0];
  }
}

export default EarleyParser;
```

That's a lot of code, but it's all necessary to implement the Earley parsing algorithm. We can now instantiate the parser and parse the tokens produced by the tokenizer:

```js
const parser = new EarleyParser(cfg);
const ast = parser.parse(tokens);
/*
  { type: 'S', children: [
    { type: 'S', children: [
      { type: 'M', children: [
        { type: 'T', value: '2' }
      ] },
    ] },
    { type: '+', value: '+' },
    { type: 'M', children: [
      { type: 'M', children: [
        { type: 'T', value: '3' }
      ] },
      { type: '*', value: '*' },
      { type: 'T', value: '4' }
      ] }
  ] }
*/
```

### Evaluation

With the AST in hand, we can now **evaluate the expression** by traversing the tree and performing the necessary operations. We'll add an `evaluator` to the `Rule` class, so that each rule can be evaluated, if an **evaluator function** is provided.

```js [rule.js]
class Rule {
  constructor(leftHandSide, rightHandSide, evaluator) {
    this.leftHandSide = leftHandSide;
    this.rightHandSide = rightHandSide;
    this.isTerminal =
      rightHandSide.length === 1 &&
      (typeof rightHandSide[0] === 'string' ||
        rightHandSide[0] instanceof RegExp);
    this.evaluate = evaluator ? ([...args]) => evaluator(...args) : null;
  }

  // ...
}

export default Rule;
```

We'll then update the `ASTNode` class to include an `evaluate` method that will **traverse the tree** and evaluate the nodes using the evaluator functions provided by the rules.

```js [astNode.js]
class ASTNode {
  constructor({ item, children }) {
    this.type = item.leftHandSide;

    if (
      item.isTerminal &&
      children.length === 1 &&
      typeof children[0] === 'string'
    ) {
      this.value = children[0];

      this.evaluate = item.evaluate
        ? () => item.evaluate([this.value])
        : () => this.value;
    } else {
      this.children = children.map(child => new ASTNode(child));

      this.evaluate = item.evaluate
        ? () => item.evaluate(this.children.flatMap(child => child.evaluate()))
        : () => this.children.flatMap(child => child.evaluate());
    }
  }
}

export default ASTNode;
```

Finally, we can update the rules to include evaluators for the arithmetic operations:

```js
const rules = [
  // P → S
  new Rule(Sym.P, [Sym.S]),
  // S → S + M
  new Rule(Sym.S, [Sym.S, Sym['+'], Sym.M], (left, _, right) => left + right),
  // S → M
  new Rule(Sym.S, [Sym.M]),
  // M → M * T
  new Rule(Sym.M, [Sym.M, Sym['*'], Sym.T], (left, _, right) => left * right),
  // M → T
  new Rule(Sym.M, [Sym.T]),
  // T → number
  new Rule(Sym.T, [/\d+/], (value) => Number.parseFloat(value, 10)),
  // + → '+'
  new Rule(Sym['+'], ['+']),
  // * → '*'
  new Rule(Sym['*'], ['*']),
];
```

With the updated rules, we can now evaluate the AST:

```js
const result = ast.evaluate();
// 14
```

### A more complex example

Our parser is now capable of parsing and evaluating expressions, based on a context-free grammar. Thus, we can write a more complex grammar to handle mathematical expressions with parentheses, negative numbers and even some well-known math functions, such as `sin`, `cos`, `tan`, and `sqrt`.

```js
Sym.define(
  'Expression',
  'Operator',
  'Term',
  'ParenthesesOpen',
  'ParenthesesClose',
  'Function',
  'NegativeSign'
);

const rules = [
  // Non-terminal rules
  // E -> T
  new Rule(Sym.Expression, [Sym.Term]),
  // E -> E op E
  new Rule(
    Sym.Expression,
    [Sym.Expression, Sym.Operator, Sym.Expression],
    (left, operator, right) => {
      switch (operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return left / right;
      }
    }
  ),
  // T -> f(T)
  new Rule(Sym.Expression, [Sym.Function, Sym.Term], (func, expression) => {
    switch (func) {
      case 'sin':
        return Math.sin(expression);
      case 'cos':
        return Math.cos(expression);
      case 'tan':
        return Math.tan(expression);
      case 'sqrt':
        return Math.sqrt(expression);
    }
  }),
  // T -> -T
  new Rule(Sym.Term, [Sym.NegativeSign, Sym.Term], (_, term) => -term),
  // T -> (E)
  new Rule(
    Sym.Term,
    [Sym.ParenthesesOpen, Sym.Expression, Sym.ParenthesesClose],
    (open, expression, close) => expression
  ),

  // Terminal rules
  // op -> + | - | * | / (terminal operator matcher)
  new Rule(Sym.Operator, [/[\+\-\*\/]/]),
  // T -> n (terminal number matcher)
  new Rule(Sym.Term, [/\d+/], token => Number.parseFloat(token)),
  // f -> sin | cos | tan | sqrt (terminal function matcher)
  new Rule(Sym.Function, [/(sin|cos|tan|sqrt)/]),
  // - -> - (terminal negative sign matcher)
  new Rule(Sym.NegativeSign, ['-']),
  // ( -> ( (terminal parentheses open matcher)
  new Rule(Sym.ParenthesesOpen, ['(']),
  // ) -> ) (terminal parentheses close matcher)
  new Rule(Sym.ParenthesesClose, [')']),
];

const cfg = new CFG(rules);
const tokenizer = new Tokenizer(cfg);
const parser = new EarleyParser(cfg, Sym.E);

const expression = '((1 + 20) * -3) / sqrt(9 * (3+6))';
const tokens = tokenizer.tokenize(expression);
const ast = parser.parse(tokens);
const result = ast.evaluate();
// -7
```

> [!NOTE]
>
> If you couldn't tell, **I'm not very good at creating CFGs**. The above grammar is likely incorrect, but it should give you an idea of how you can extend the parser to handle more complex expressions.

## Conclusion

In this article, we took a deep dive into the world of context-free grammars and the Earley parsing algorithm. We implemented a parser for mathematical expressions using these concepts, building an abstract syntax tree (AST) that we could evaluate to get the result of the expression. We also took a quick look at how a more complex grammar could be used to parse and evaluate more complex expressions.

I hope you've learned something, because I sure did! See you in the next one! <span class="wave">👋</span>
