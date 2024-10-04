---
title: Use data attributes instead of HTML classes to represent state
shortTitle: Data attributes as state
language: html
tags: [css,javascript]
cover: pineapple-on-the-rocks
excerpt: Learn how to use data attributes to represent UI state and level up your HTML and CSS game.
listed: true
dateModified: 2023-11-13
---

## The problems with HTML classes

More often than not, when representing **UI state in HTML**, we use classes. This often translates into React components or JavaScript code that check a handful of conditions and **add or remove classes** accordingly. Let's look at an example:

```html
<div id="order">
  <!-- Order summary content -->
</div>
```

```js
const orderData = {
  loading: false,
  completed: false,
  errorMessage: null
};

const order = document.querySelector('#order');

order.className = `order-summary
  ${orderData.completed ? 'completed' : ''}
  ${orderData.loading ? 'loading' : ''}
  ${orderData.errorMessage ? 'error' : ''}`;
```

In this example, we're modeling an element for an order summary. The element can be in one of three states: _loading_, _completed_, or _error_. We're using classes to represent these states, and we're using JavaScript to add or remove these classes based on the state of the order.

Figuring out the state of the order from the UI should also be straightforward. We can simply **check which classes are present** on the element:

```js
const order = document.querySelector('#order');

const isCompleted = order.classList.contains('completed');
const isLoading = order.classList.contains('loading');
const hasError = order.classList.contains('error');
```

This feels a little cumbersome, but working with DOM elements in JavaScript often is. Let's take a look at some CSS that could be used to style our three states:

```css
.order-summary.completed {
  background-color: green;
}

.order-summary.loading {
  background-color: yellow;
}

.order-summary.error {
  background-color: red;
}
```

Pretty simple and easy to understand. What if, however, by some twist of fate, we end up with some faulty data from the server? What if the order is both loading and completed? Perhaps it's completed but also contains an error? What will the UI look like then? CSS will use its **cascading** nature to determine which styles to apply, and that will probably make a mess of thing.

So, to summarize, when representing UI state with classes, we're faced with these issues:

- Manually mapping state to class names using JavaScript.
- Checking class name presence on an element to determine its state.
- Potentially conflicting styles when multiple states are present.

## A better approach using data attributes

What if I told you there's a better way? And it has been there all along, for many years. I'm talking about **data attributes**. Let's take a look at how we can use them to represent the state of our order summary:

```html
<div
  id="order"
  class="order-summary"
  data-state="completed"
  data-loading="false"
>
  <!-- Order summary content -->
</div>
```

At a glance, we've only **moved the state from a JavaScript object to the DOM**. But this makes a big difference. For one, we don't really have to map state from JavaScript to the DOM anymore. We can simply set the data attributes on the element and be done with it:

```js
// Suppose we want to change the state of the order to loading
const order = document.querySelector('#order');

order.dataset.state = 'loading';
order.dataset.loading = 'true';
```

We can also check the state of the order by **checking the values of the data attributes**:

```js
const order = document.querySelector('#order');

const isCompleted = order.dataset.state === 'completed';
const isLoading = order.dataset.loading === 'true';
const hasError = order.dataset.error === 'true';
```

The JavaScript values are easily retrievable from the DOM, there's **no hidden state** and it's easy to make changes. But what about styling with CSS? Well, we only need to make a few small changes:

```css
.order-summary[data-state="completed"] {
  background-color: green;
}
.order-summary[data-state="loading"] {
  background-color: yellow;
}
.order-summary[data-state="error"] {
  background-color: red;
}
```

Instead of a class, we're now using a **data attribute selector**. This allows us to target the element based on the value of the data attribute. This is a lot more flexible than using classes, as we can now have multiple states on the same element without having to worry about conflicting styles.

But what's even more interesting is we can't run into the previous issue of having two states on the same element. This is because **the data attribute selector needs to match exactly**, otherwise it won't work. So, if we have an element with something like `data-state="loading completed"`, it won't match any of our CSS selectors and won't be styled. It will also be pretty easy to spot from the DOM and figure out that's something is wrong.

## Conclusion

As you can see, using data attributes to represent state in HTML is more **flexible** and **scalable** than using classes. It forces us to be more **explicit** and more **debuggable**. I think it's a great alternative to using classes, and I hope you'll consider using it in your next project.
