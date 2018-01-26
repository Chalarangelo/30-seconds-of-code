### bindAll

Explain briefly what the snippet does.

Use `Array.forEach()` to return a `function` that uses `Function.apply()` to apply the given context (`obj`) to `fn` for each function specified.

```js
const bindAll = (obj, ...fns) =>
  fns.forEach(
    fn =>
      (obj[fn] = function() {
        return fn.apply(obj);
      })
  );
```

```js
var view = {
  'label': 'docs',
  'click': function() {
    console.log('clicked ' + this.label);
  }
};
bindAll(view, 'click');
jQuery(element).on('click', view.click); // Logs 'clicked docs' when clicked.
```
