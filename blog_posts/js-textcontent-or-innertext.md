---
title: How are HTMLElement.innerText and Node.textContent different?
shortTitle: Differences between innerText and textContent
type: question
tags: javascript,browser
author: chalarangelo
cover: dark-city
excerpt: While these two properties are very similar, there are some key differences that you should be aware of.
firstSeen: 2023-03-19T05:00:00-04:00
---

JavaScript provides two properties you can use to **access the text content of an element**: `Node.textContent` and `HTMLElement.innerText`. For the most part, these two appear to be interchangeable. In fact, many developers use them interchangeably, not knowing that there are important differences between the two.

### Similarities

I think it's helpful to identify the similarities of these two properties before diving into the differences. This will also clarify how they're used in most cases.

Suppose you have an HTML element, containing some text:

```html
<p id="greeting">Hi there! My name is <strong>Bubbles</strong>.</p>
```

Both of these properties will return the text content of the element, including the text content of any **child elements**. They will also **ignore any HTML tags** that may be present in the element's content. And, they can be used to **set the text content** of the element, too.

```js
const greeting = document.getElementById('greeting');

greeting.innerText; // "Hi there! My name is Bubbles."
greeting.textContent; // "Hi there! My name is Bubbles."

greeting.innerText = 'Hello!'; // <p id="greeting">Hello!</p>
greeting.textContent = 'Hi!'; // <p id="greeting">Hi!</p>
```

### Differences

So far, these two properties appear to do the exact same thing. In fact, they both offer some convenient features that make them very useful. However, they start to exhibit some differences when the element's content is a little more complex.

Take the following HTML element, for example:

```html
<div class="card">
  <style>
    p { color: red; }
    strong { text-transform: uppercase; }
    small { display: none; }
  </style>
  <p>Hi   there!<br />My name is <strong>Bubbles</strong>.</p>
  <small>And I'm a <strong>dog</strong>.</small>
</div>
```

Let's take a look at the output of each of these two properties and see how they differ.

```js
const card = document.querySelector('.card');

card.innerText;
/*
"Hi there!
My name is BUBBLES."
*/

card.textContent;
/*
"

    p { color: red; }
    strong { text-transform: uppercase; }
    small { display: none; }

  Hi   there!My name is Bubbles.
  And I'm a dog.
"
*/
```

It's drastically different in this case, right? `HTMLElement.innerText` is supposed to roughly **match what the user sees** in the browser. Another way to think of this is that its output should closely resemble what the user would get if they were to select the element's content and copy it to their clipboard.

The first thing to notice, based on this definition, is that **hidden elements are ignored**. This applies to elements that don't render, such as `<style>` and `<script>`, but also to elements that are hidden using CSS. In this example, the `<small>` element is hidden, so it's not included in the output of `HTMLElement.innerText`.

Secondly, the output of `HTMLElement.innerText` is **normalized**. This means that all whitespace is collapsed into a single space, and all line breaks are replaced with a single line break. If present, `<br>` tags are also respected, so they're replaced with a line break.

The final point I want to make is that `HTMLElement.innerText` applies **text transformations** to the element's content. In this case, the `<strong>` element is transformed to uppercase, so the output of `HTMLElement.innerText` reflects this.

On the other hand, `Node.textContent` returns the **exact text content** of the element, including any whitespace and line breaks. Yet, `<br>` tags are stripped without any sort of replacement. It also includes the text content of any hidden elements, such as `<style>` and `<script>` and no text transformations are applied.

### Performance

But, wait! There's more! While `HTMLElement.innerText` seems like the sensible choice, it comes with a performance caveat. In order to figure out what the browser renders, CSS has to be considered, triggering a [reflow](https://developer.mozilla.org/en-US/docs/Glossary/Reflow). This can be **computationally expensive**, and can create inadvertent performance bottlenecks.

In my opinion, a good rule of thumb is to prefer `Node.textContent` for plain text elements, if possible. For more complex elements, try identifying how they're affected by layout and user interactions. For example, a complex element that's rendered only once and never altered, would be a use case for `HTMLElement.innerText`, but you can store the output in a variable and reuse it.

### Conclusion

`HTMLElement.innerText` and `Node.textContent` are two very similar properties that can be used to access and manipulate the text content of an element. However, they differ in some important ways, and you should be aware of these differences to choose the one that best suits your needs. Always examine your use case and consider the performance implications of your choice.
