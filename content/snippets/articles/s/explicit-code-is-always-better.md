---
title: Explicit code is always better
language: javascript
tags: [webdev]
cover: laptop-notes-2
excerpt: A thesis on why magic abstractions are harmful to codebases and teams.
listed: true
dateModified: 2025-11-04
---

I recently had the misfortune of working with a little-known JavaScript library and boy did I hate it! From naming conventions that are hard to follow to abstractions that feel like black magic, in my mind it's exactly what's wrong with overengineered tools and a justification for a move back to explicit, albeit potentially verbose and boilerplate-heavy, code.

I know what you may be thinking but hear me out: explicit code _is_ always better. It beats magic. It makes intent obvious. It reduces time spent chasing down nasty bugs.

## Readable by design

Implicit behavior can feel clever. It can also be a silent **source of mistakes**. When a framework maps files to routes or renames properties automatically, you must remember the transformation. You must trace it across files and sometimes across languages.

Explicit code shows the path. An explicit import, export, or variable name tells the reader where a value comes from and how it is used. That **clarity** is worth a few extra lines.

```js
// Hard to follow
const result = data.
  map(item => item.value).
  filter(v => v > 10).
  reduce((a, b) => a + b, 0);

// Easier to follow
const values = data.map(item => item.value);
const filteredValues = values.filter(v => v > 10);
const result = filteredValues.reduce((a, b) => a + b, 0);
```

When writing code with **maintainability** in mind, prefer a named intermediate variable to a long chain of anonymous transforms. The name becomes a breadcrumb for future readers. Remember that clever one-liners can be elegant. But, they can also be cryptic. Favor **explicit, readable implementations over terseness** when clarity matters. It also makes the code **easier to test and reuse**.

@[You may also like](/js/functional-programming)

## Types for clarity

I've recently dabbled in Go and I was surprised how intuitive I found its **type system** and how much use I got out of it. While I used to dislike the rigidity of static types, I have now come to appreciate their value in making code more **predictable** and easier to maintain.

**Static typing documents intent**. It signals which fields are required and which are optional. It narrows the space of valid values and makes refactors safer.

```ts
type User = {
  id: string;
  name: string;
  email?: string;
};

function findUser(id: string): User | null {
  // implementation
  return null;
}
```

Sure, I'm not a fan of TypeScript, but my gripes with it are entirely separate from the value of types in general. **Types make a contract explicit**. You do not have to search for implicit assumptions across modules.

@[Further reading](/js/s/complete-guide-to-js-type-checking)

## Traceable imports and exports

We often despise adding all the wiring, boilerplate and ceremony. Sure, it's **verbose** and it can feel mind-numbingly boring. But, those lines are **discovery points** for anyone who reads the code later, including our future selves.

Go forces **explicit imports** and **simple module boundaries**. That constraint is, oddly enough, an advantage. It makes dependencies obvious. It lowers the barrier to entry for new contributors.

```js
// Explicit imports
import express from 'express';
import userRoutes from './routes/user.js';

const app = express();
app.use('/users', userRoutes);

// Explicit exports
export default app;
```

Explicit wiring creates followable links. You can **trace imports, types, and function calls** back to the source. That makes it easier to find where a value is created or transformed.

You'll eventually have to trace back through the code to find _something_. And, when you do, you'll be grateful that you did the work upfront, spending those minutes that felt like a waste to write something more explicitly.

## Conventions increase cognitive load

**Conventions** can be useful. They cut boilerplate, but they also hide behavior. When naming conventions travel from the server to client code, or when build tools transform property names, those mappings become **invisible mental work**.

**Context switching between languages** already costs attention. Adding implicit transforms multiplies that cost. Choose **explicit transformations** when you can. If you must sprinkle some magic, **document** it and **add tests** that show the mapping.

```js
import { deepCamelizeKeys } from './deepCamelizeKeys.js';
// server response: { user_id: 1, user_name: 'Alice' }

// Implicit transformation, via convention
const user = fetch('/api/user')
  .then(res => res.json())
  .then(deepCamelizeKeys);

// Explicit transformation, key by key
const user = fetch('/api/user')
  .then(res => res.json())
  .then(data => ({
    userId: data.user_id,
    userName: data.user_name,
  }));
```

Every hidden rule increases the **mental model** a developer must hold. Projects with many implicit rules slow down **onboarding**. They make **debugging** and **refactoring** riskier. They also make **code reviews** harder.

**Make explicit code the default** and only reach for conventions when they provide a clear benefit. Ensure they are few, well documented, and widely understood.

> [!TIP]
>
> As a rule of thumb, if a convention feels like magic and obscures behavior, avoid it. The short term gain rarely justifies long term cost.

## Abstractions as barriers to entry

**Abstractions remove repetition**. They also **hide details**. As a library grows, the abstraction surface usually expands. That expansion increases the **cost of learning and debugging**.

Junior developers and newcomers face the steepest penalty. Do not reject boilerplate reflexively. If repeated, explicit code becomes a **productivity** sink, build a small, well documented abstraction.

```js
// Implicit state management, hidden state
const countert = (initial = 0) => {
  let value = initial;
  return {
    increment: () => { value += 1; },
    decrement: () => { value -= 1; }
  };
}

// Explicit state management, more visible state
class Counter {
  constructor(initial = 0) {
    this.value = initial;
  }

  increment() {
    this.value += 1;
  }

  decrement() {
    this.value -= 1;
  }
}
```

Explicit languages, like Go, tend to encourage **careful abstraction**. Teams only reach for abstraction when the repetition justifies it. Reach for an abstraction when it provides a clear benefit. **Keep abstractions small**. Document their invariants. Add tests and provide examples. Keep an **escape hatch** so developers can bypass the abstraction when necessary.

## Practical rules to apply today

- **Prefer explicit exports and imports** in your code to make it easier to trace dependencies and follow data flow.
- **Use static types**, if possible, or at least **add type checks** whenever they make sense to help clarify intent and catch mistakes.
- **Avoid cross language implicit transformations** that add cognitive load, unless they are few, truly necessary, and thoroughly documented.
- **Prefer readable functions and named variables** over clever one-liners and chains of anonymous transforms.
- **Document** any convention that behaves like magic and **add tests** showing the mapping to reduce the barrier to entry.

## Closing thoughts

I hope I have at least changed your mind about the value of explicit code. It may feel like a chore to write, but it pays off in the long run. Make clarity your default. Start explicit. Add convenience when it is necessary and safe. When you do, document and test the shortcut so future readers do not have to guess.


