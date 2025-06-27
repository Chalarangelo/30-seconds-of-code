---
title: The art of writing great code
shortTitle: Writing great code
language: javascript
tags: [webdev,career,programming,jobs]
cover: coffee-drip-2
excerpt: Writing great code is more than writing code that works, requiring discipline and a focus on testability, maintainability, and readability.
listed: true
dateModified: 2025-09-02
---

Writing great code is both an art and a discipline. Over the years, I've learned that the best code isn't just code that works, but **code that's easy to read, maintain, and test**. In this article, I'll share some practical tips and examples to help you write code that stands the test of time, focusing on testability, maintainability, and readability.

@[Suggested reading](/js/s/naming-conventions)

## State is the enemy

State is at the heart of many bugs and headaches. Poor **state management** considerations can often lead to unexpected results and make your code hard to reason about, maintain and test.

**Mutable state** is one of, if not the most, common source of bugs. Try to **avoid it whenever possible**. When you mutate an object or array, you change its state, which can lead to unexpected results elsewhere in your code.

```js
let user = { name: 'Alice', age: 25 };
const birthday = user => {
  user.age++;
};
```

This example's function mutates the original object, which can lead to side effects, affecting other parts of your code. It's a whole lot easier to reason about code that doesn't mutate state. Instead, prefer passing state as parameters and returning new values. Then, you can return a new object with the updated state. Changes such as these makes your function pure and predictable.

```js
const birthday = user => { ...user, age: user.age + 1 };
```

> [!NOTE]
>
> Object immutability is pretty hard in JavaScript and, this example only scratches the surface. There's plenty of relevant content, if you feel like diving deeper into the topic.

@[Learn more](/js/immutability)

## Control your flow

**Complex flow control** such as deeply nested `if` statements, or loops within loops, make code hard to follow and even harder to test. A simple example of **nested logic** can look something like the following.

```js
const processOrder = order => {
  if (order.paid) {
    if (order.items.length > 0) {
      for (let item of items) {
        if (item.active) {
          if (item.value > 10) {
            // ...
          }
        }
      }
    }
  }
};
```

Readability may seem ok for a simple example like this, but as complexity grows, it adds to the cognitive load. Instead, **extract logic into smaller functions** to improve clarity, reusability and testability.

```js
const isItemActiveAndValuable = item =>
  item.active && item.value > 10;

const processItems = items => {
  for (let item of items) {
    if (isActiveAndValuable(item)) {
      // ...
    }
  }
};

const isOrderProcessable = order =>
  order.paid && order.items.length > 0;

const processOrder = order => {
  if (isOrderProcessable(order))
    processItems(order.items);
};
```

@[Further reading](/js/functional-programming)

## Less is more

**Large functions** are hard to read, test, and maintain. There are plenty of rules of thumb for function size and it really depends on the context, but I strive to keep functions below, say, 20 lines, with the occasional exception. If a function is getting too big, try and **break it down**.

> [!TIP]
>
> There is no such thing as a one-size-fits-all rule for things such as function length or complexity. It will depend on your team, the project, and the context, so try to get a feel for what works best for you and your team. The key is to keep functions small enough to be easily understood, but not so small that they become meaningless.

```js
const calculateInvoice = (items, taxRate) => {
  let subtotal = 0;
  for (let item of items)
    subtotal += item.price * item.quantity;
  const tax = subtotal * taxRate;
  return subtotal + tax;
}l
```

If you add discounts, shipping, or other logic, this function will balloon. Instead, extract each step into its own function, with a clear and descriptive name. This not only makes the code easier to read, but also simplifies testing.

```js
const calculateSubtotal = items =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const calculateTax = (subtotal, taxRate) => subtotal * taxRate;

const calculateInvoice = (items, taxRate) => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + tax;
};
```

@[You may also like](/articles/s/code-modularization)

## Be responsible for one thing

A function should do one thing, and do it well. If a function does two things, break it down. For example, the following function violates the **Single Responsibility Principle (SRP)** by mixing validation and saving logic:

```js
const saveUser = user => {
  if (!user.name) throw new Error('Name is required');
  database.save(user);
};
```

Instead, **break it down into separate functions**, each with a single responsibility. It's most likely true that, at some point, you'll have to call both functions together, but you can test them independently and reuse code if you separate concerns. It also helps readability, as explained in previous sections.

```js
const validateUser = user => {
  if (!user.name) throw new Error('Name is required');
};

const saveUser = user => {
  database.save(user);
};
```

@[You may also like](/js/s/vocal-fails-silencing-errors)

## Even tests need good code

It's **nearly impossible to write good tests for bad code**. If your code is a tangled mess of hidden state, mixed responsibilities and complicated logic, testing becomes an uphill battle. As a rule of thumb, write code as if you will need to test every single line. This mindset often leads to better design.

> [!TIP]
>
> I'm not a fan of code coverage over everything, as it's a single metric and tests are only as good as your understanding of the code. Still, code coverage may help you identify blind spots. After all, no tests are worse than bad tests, so try to make testing seamless, before focusing on coverage.

Testable code is code that's predictable and has clear inputs and outputs. You should avoid hidden dependencies and side effects, as shown in previous examples, but let's take a look at yet one more example for clarity.

```js
let config = { debug: false };
const log = message => {
  if (config.debug) console.log(message);
};
```

Here, testing `log` requires fiddling with `config`, a hidden dependency, also often referred to as **hidden state**. Instead, you should use **dependency injection** to make your code more predictable and easier to test:

```js
const log = (message, debug = false) => {
  if (debug) console.log(message);
};
```

Now, you can easily test `log` by passing different values for `debug` and it's a whole lot easier to reason about what the method does and why.

@[You may also like](/js/tdd-library-design)

## Conclusion

Writing great code is about more than making things work. It's about making your code easy to read, maintain, and test. Manage state carefully, keep your functions small and focused, avoid hidden dependencies, and always strive for clarity. By following these simple principles, you'll write code that you and others will enjoy working with and maintaining for years to come!
