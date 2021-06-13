---
title: "Tip: You can get the value of an input element as a number"
type: tip
tags: javascript,browser,input
authors: chalarangelo
cover: blog_images/mac-and-coffee.jpg
excerpt: Ever wanted to get the value of an HTML input element as a number? Learn an easy way to do it with this handy trick.
firstSeen: 2020-11-20T09:19:24+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Most of the time, when accessing the value of an `HTMLInputElement` in an event listener, we use something along the lines of `e.target.value`. This is fine in most cases, but when we want the numeric value of an input field, we have to parse it and check if the value is actually valid etc. That can get very annoying, especially when working with larger forms that have many input fields.

What if I told you there's an easier way to get the numeric value from an input field? Meet `HTMLInputElement.valueAsNumber`, a handy attribute that will return a numeric value if the input field's value can be converted to a number or `NaN` if the conversion is not possible.

```js
const quantityInput = document.getElementById('quantity-input');
let quantity;
// Bad: parseFloat() converts the string to a number
quantity = parseFloat(quantityInput.value);
// Good: returns a numeric value
quantity = quantityInput.valueAsNumber;
```

As usual, this comes with a caveat which is that it only works for `type="number"` inputs (although that's probably where you need it the most). On a side note, you can also use `HTMLInputElement.valueAsDate` to get a `Date` object from a `type="date"` input, which might also come in handy in some cases.
