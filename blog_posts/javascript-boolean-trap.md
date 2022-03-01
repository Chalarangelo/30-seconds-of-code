---
title: Boolean traps and how to avoid them
type: story
tags: javascript,function,type,boolean
expertise: intermediate
author: chalarangelo
cover: blog_images/lighthouse.jpg
excerpt: Boolean traps can cause readabiltiy and maintainability issues in your code. Learn what they are, how to spot and fix them in this article.
firstSeen: 2021-07-11T05:00:00-04:00
---

I recently came across the concept of **Boolean traps** and it instantly resonated with me due to the volume of Google searches I've performed because of it. In this article, I'll try to explain what it is, why it's somewhat of an anti-pattern, how to spot it in your code and ways to refactor around it.

### Boolean trap - What's in a name?

While the name **Boolean trap** might be unfamiliar to some, I'm pretty certain the concept it represents isn't. The simplest form of a boolean trap is a function that takes a boolean argument.

The **trap** in the name might throw you off if you stick to this definition, but it serves its purpose. Let's look at two simple examples to get a better grasp of things:

```js
// What does `false` stand for?
results.reload(false);

// What does `true` stand for?
const user = new User(true);
```

The first example suffers in terms of readability due to an obvious contradiction. A function named `reload` expects a boolean argument. `false` in this context must surely mean that no reloading should happen. Except that might not be the case.  This argument might be anything from performing the operation immediately (i.e. `immediate`) to some side effect such as animation to even the no-op we suspected. I've stumbled upon similar cases of ambiguous arguments in many libraries in the past.

The second example is also hard to decipher without looking at some documentation. Here, the constructor expects a boolean argument that might mean literally anything. Would you have guessed that it's a flag indicating if the user should have administrative privileges? Probably not. The point is there is no way to tell what this argument means without looking at the documentation.

### Red flag or red herring?

At this point, you might be asking yourself why this is actually bad. Reading through the documentation is expected. After all, that's what it's there for. Except this starts to become a waste of time on return visits. If you're working with a library and look up a boolean argument over and over because it's not obvious, it becomes a bit of a hassle.

Moreover, code is read many times by many people. The author might be familiar with the library and API and have no need for documentation altogether. But the next person who comes along will have to visit the same documentation and figure it out for themselves. That harms readability and wastes tons of time in the long run, due to a single boolean argument.

A bonus point here is the potential of further reducing readability by increasing cognitive load. There are valid use-cases for boolean arguments,  but there are situations where the name of the function, being in itself a negative, with a negative (i.e. falsy) value makes the reader stop and pause to parse what's happening. For example:

```js
// Real quick: Is this valid or invalid?
input.setInvalid(false);
```

### Not all booleans will trap you

As with most things, there is no universal best practice here. Even though I often find boolean arguments hard to read, I understand there are cases where you might want to use them.

```js
// It should be obvious that `true` makes the element disabled
element.setProperty('disabled', true);
// Could be equivalent to `element.disabled = true;`
```

In this example, it's pretty straightforward what `true` does. Notice that the double negative from before might still make this slightly hard to read, but it makes sense to use a boolean in this context. Why? Well, it's essentially a setter function and passing the actual value of the property isn't such a bad idea.

### Mitigating the problem

We've already established what a boolean trap is and why it's bad. But how do we fix it? Even if we can spot the anti-pattern, it might be hard to change it before it affects a lot of code and developers. Some languages support named arguments and that usually solves the problem quite easily. JavaScript on the other hand doesn't, but there's always the option to pass an options object.

Let's take a look at the two examples from before and how that would work:

```js
// Ok, so reload but not immediately
results.reload({ immediate: false });

// Create a new user without administrator privileges
const user = new User({ isAdministrator: false });
```

Without huge changes to the API, we could have avoided the boolean trap altogether. All we needed was a plain JavaScript object. This also has the added benefit of making the function more extensible in the future. Objects are quite flexible, so if we want to add a second boolean (e.g. `animate` for `reload` or `active` for `User`), we need only add a key to the object.

On a side note, while comments seem an appropriate solution, they will inevitably become stale and out of touch with the API. It's best to leave this kind of information to the official documentation or source code, instead.

### Conclusion

To summarize, boolean arguments in functions can be the source of a lot of wasted time and the cause for low code readability if used incorrectly. They're sometimes considered an anti-pattern as they increase cognitive load and reduce maintainability of shared code. Luckily, they're very easy to spot and fix using plain JavaScript option objects.
