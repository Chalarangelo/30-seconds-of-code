# pluralize

If `num` is greater than `1` returns the plural form of the given string, else return the singular form.

Check if `num` is positive. Throw an appropriate `Error` if not, return the appropriate string otherwise.
Omit the third argument, `items`, to use a default plural form same as `item` suffixed with a single `'s'`.

``` js
const pluralize = (num, item, items = item+'s') => 
  num <= 0 ? (() => {throw new Error(`'num' should be >= 1. Value povided was ${num}.`)})() : num === 1 ? item : items;
```

```js
pluralize(1,'apple','apples'); // 'apple'
pluralize(3,'apple','apples'); // 'apples'
pluralize(2,'apple'); // 'apples'
pluralize(0,'apple','apples'); // Gives error
pluralize(-3,'apple','apples'); // Gives error
```
