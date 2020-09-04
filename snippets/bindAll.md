---
title: bindAll
tags: object,function,intermediate
---

Binds methods of an object to the object itself, overwriting the existing method.

Use `Array.prototype.forEach()` to return a `function` that uses `Function.prototype.apply()` to apply the given context (`obj`) to `fn` for each function specified.

```js
const bindAll = (obj, ...fns) =>
  fns.forEach(
    fn => (
      (f = obj[fn]),
      (obj[fn] = function() {
        return f.apply(obj);
      })
    )
  );
```

```js
var view = {
  label: 'docs',
  click: function() {
    console.log('clicked ' + this.label);
  }
};
bindAll(view, 'click');
document.body.addEventListener('click', view.click); // Log 'clicked docs' when clicked.
```
