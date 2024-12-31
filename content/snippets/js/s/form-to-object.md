---
title: How can I convert the data from an HTML form to a JavaScript object?
shortTitle: Form to object
language: javascript
tags: [browser,object]
cover: down-the-stream
excerpt: Convert the data from an HTML form into a JavaScript object or serialize it into a query string.
listed: true
dateModified: 2024-01-21
---

HTML forms are the most basic and the recommended way to ask the user for input. But when it's all said and done, how do you actually get the data from the form into your JavaScript code? Here's how!

## Convert form data to an object

The `FormData` interface provides a way to easily construct a set of **key/value pairs** representing form fields and their values, which can then be easily converted to an object. Using the `FormData()` constructor with a reference to the **form element** will return the appropriate result.

After getting a `FormData` object, we need only convert it to an object, using `Object.fromEntries()`. This results in a **plain JavaScript object** with the form field names as keys and their values as values.

```js
const formToObject = form => Object.fromEntries(new FormData(form));

formToObject(document.querySelector('#form'));
// { email: 'test@email.com', name: 'Test Name' }
```

## Serialize form data to a query string

If, instead of an object, you need to **serialize the data** from a form into a query string, you need to make a few adjustments to the previous code snippet.

After creating a `FormData` object, you can use `Array.from()` to create an **array of the entries**. Using the second argument of the function, you can specify how each entry should be mapped. In this case, we want to map each entry to a string, where the key and value are joined by an `=` sign and apply `encodeURIComponent()` to each part.

Finally, we can use `Array.prototype.join()` to join the array of strings into a **query string**, using `&` as the separator.

```js
const serializeForm = form =>
  Array.from(new FormData(form), field =>
    field.map(encodeURIComponent).join('=')
  ).join('&');

serializeForm(document.querySelector('#form'));
// 'email=test%40email.com&name=Test%20Name'
```
