### sumPower

Returns the sum of the powers of all the numbers from `start`(default to 1) to `end`

```js
const sumPower = (end,power = 2,start = 1)
  Array(end - start).fill(0).map((x,i) => (i+start) ** power).reduce((a,b) => a+b,0)
```

```js
sumPower(10); // 385
sumPower(10,3); //3025
sumPower(10,3,5); //2925
sumPower(10,undefined,5); //355
```
