# pluralize

Checks if the provided `num` is equal to `1`. If yes return 

``` js
const pluralize = (num, item, items) => {
 if (num <= 0)  throw new Error(`num takes value greater than equal to 1. Value povided was ${num} `)
	else  return num === 1 ? item : items
}
```

```js
pluralize(1,'apple','apples'); //'apple'
pluralize(3,'apple','apples'); //'apples'
pluralize(0,'apple','apples'); //Gives error
pluralize(-3,'apple','apples'); //Gives error
```
