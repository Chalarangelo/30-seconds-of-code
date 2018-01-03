# pluralize

Checks if the provided `num` is 

``` js
const pluralize = (num, item, items) => (
  num > 0 ? throw new Error(`num takes value greater than equal to 1. Value povided was ${num} `)
	num === 1 ? item : items
)
```
