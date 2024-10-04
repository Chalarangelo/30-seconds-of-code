---
title: Use JavaScript to prefix a CSS property based on the browser
shortTitle: Prefix CSS property
language: javascript
tags: [browser,css]
cover: cancel-typographer
excerpt: Not sure if you need to prefix a CSS property in order to use it? Here's a simple way to figure it out!
listed: true
dateModified: 2023-10-20
---

Sometimes, you want to use a **CSS property** that is **not yet supported by all browsers**. Browsers often support these properties by using a **vendor prefix**, which is a string that is prepended to the property name. For example, Safari uses `-webkit-`, Firefox uses `-moz-` etc.

But how can you **detect if a browser supports a certain CSS property**? And how can you prefix a CSS property based on the current browser? Luckily, the `CSSStyleDeclaration` interface exposes dashed and camel-cased attributes for all supported CSS properties.

In order to use this interface, you can access the `style` property of the `Document.body` object. Then, you can **check if the property is defined** as-is or with a vendor prefix.

```js
// Check if the 'appearance' property is defined
typeof document.body.style.appearance !== 'undefined';

// Check explicitly for the 'webkitAppearance' property
typeof document.body.style.webkitAppearance !== 'undefined';
```

This is pretty simple to check for a specific property or browser environment, but it's a hassle to do this for multiple properties and browsers. As **browser prefixes are well-known**, you can use an array of prefixes to check against each one of them.

```js
// Known browser prefixes (empty string for the default property)
const prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
```

Prefixed properties can be checked, using the **camel-cased attribute** of the `CSSStyleDeclaration` interface. You can use `String.prototype.charAt()` and `String.prototype.toUpperCase()` to **capitalize the property name**, which will be appended to the vendor prefix string.

```js
const prop = 'appearance';
const prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);

prefixes.map(prefix => (prefix ? prefix + capitalizedProp : prop));
// [
//  'appearance',
//  'webkitAppearance',
//  'mozAppearance',
//  'msAppearance',
//  'oAppearance'
// ]
```

Finally, you can use `Array.prototype.findIndex()` to check if `Document.body` has one of the prefixed properties defined in its `CSSStyleDeclaration` object. If it does, you can return the prefixed property, otherwise you can return `null`.

```js
const prefix = prop => {
  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);
  const prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
  const i = prefixes.findIndex(
    prefix =>
      typeof document.body.style[prefix ? prefix + capitalizedProp : prop] !==
      'undefined'
  );
  return i !== -1 ? (i === 0 ? prop : prefixes[i] + capitalizedProp) : null;
};

prefix('appearance');
// 'appearance' on a supported browser, otherwise 'webkitAppearance',
//   'mozAppearance', 'msAppearance' or 'oAppearance'
```
