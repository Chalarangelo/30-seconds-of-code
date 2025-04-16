---
title: What happens when you call every() on an empty JavaScript array?
shortTitle: Empty array every()
language: javascript
tags: [array]
cover: blue-bird
excerpt: A few days ago, I stumbled upon a perplexing piece of JavaScript behavior. Let's break it down.
listed: true
dateModified: 2025-03-14
---

A few days ago, I stumbled upon a perplexing piece of JavaScript behavior. I was working on a project that involved checking if **all elements in an array met a certain condition**. Naturally, I used `Array.prototype.every()` to accomplish this task.

However, I noticed that when I called `Array.protoype.every()` on an **empty array**, it returned `true`. This behavior didn't necessarily seem wrong, but it made me wonder. _Had I done something wrong? Should I be checking for an empty array every time I call this method from here on out?_

## The documentation explanation

The **official MDN documentation**, that is linked above, states the following in regards to this scenario:

> `every` acts like the "for all" quantifier in mathematics. In particular, for an empty array, it returns `true`. (It is [vacuously true](https://en.wikipedia.org/wiki/Vacuous_truth) that all elements of the [empty set](https://en.wikipedia.org/wiki/Empty_set#Properties) satisfy any given condition.)

I didn't find this answer satisfying, but, hey, at least it's documented!

But that made me wonder, how does `Array.prototype.some()` behave in this scenario? Does it return `true` as well? Well...

> `some()` acts like the "there exists" quantifier in mathematics. In particular, for an empty array, it returns `false` for any condition.

Interesting, so these two methods behave opposite when it comes to empty arrays.

> [!NOTE]
>
> **Side note:** Don't you hate just how inconsistent the official documentation on MDN is? `every` and `some()` coexist on two relevant pages? Am I the only developer with a mild case of OCD that finds this annoying? 😅

## A developer's approach

As you may be able to tell at this point, I wasn't satisfied with the official answer. I felt that, intuitively, the result wasn't wrong, but the explanation was lacking. Thinking on this problem, I thought to implement the code myself and see where it takes me.

### Iterating over empty arrays

Imagine that you have an array with any number of elements and a predicate function that will result in either `true` or `false`. When you call `Array.prototype.every()` on this array, the method will **iterate over each element** and apply the predicate function to it.

The first element that returns `false` should **short-circuit** the method and return `false`. If every element returns `true`, the **end of the array** will eventually be reached and the method will return `true`.

Therefore, it stands to reason that the **default** result of the method should be `true`. This is because, in the absence of any elements, there are no elements that return `false`, and thus the method ends up returning `true`.

### A `for` loop analogy

If you think about it in terms of a `for` loop, it makes a little more sense:

```js {4}
const every = (arr, predicate) => {
  for (let val in arr)
    if (!predicate(val[i])) return false;
  return true;
};

every([], () => false); // true
```

As you can see, the method will return `true` if there are no elements to iterate over, even if the predicate function always returns `false`! I like to think that this is a more intuitive explanation for this behavior.

As a matter of fact, the [ECMAScript specification for `Array.prototype.every()`](https://tc39.es/ecma262/#sec-array.prototype.every) pretty much describes the same steps, albeit with a few more details that are taken care of.

### Extending the logic

We can extend this logic to `Array.prototype.some()` as well. As soon as one element returns `true`, the method will **short-circuit** and return `true`. If there are no elements to iterate over, the method will return `false`. Thus, the initial and **default** value of the method should be `false`.

Again, a `for` loop analogy can help clarify this:

```js {4}
const some = (arr, predicate) => {
  for (let val in arr)
    if (predicate(val[i])) return true;
  return false;
};

some([], () => true); // false
```

And, again, the [ECMAScript specification for `Array.prototype.some()`](https://tc39.es/ecma262/#sec-array.prototype.some) verifies this approach, while taking care of a few more details.

## Conclusion

After some digging, it makes sense that `Array.prototype.every()` returns `true` when called on an empty array. While described explicitly in both the ECMAScript specification and the MDN documentation, the explanation might not seem intuitive at first, but delving into how it works under the hood can help clarify things.

I'm guessing you may not have heard this one before, unless you stumbled upon an odd piece of code, like I did. I hope you found this little trip down the rabbit hole as interesting as I did and that you've learned something new today.
