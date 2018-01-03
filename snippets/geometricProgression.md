### geometricProgression

Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive and the ratio between two terms is `step`.

Use Array(Math.floor(Math.log(end/start)/Math.log(step))+1) to create an array of the desired length, Array.map() to fill with the desired values in a range. 
You can omit `start` to use a default value of 1.
You can omit `step` to use a default value of 2.
Returns a error when you try to use `step = 1` 
``` js
const geometricProgression = (end, start = 1,step = 2) =>
  Array.from({ length:Math.floor(Math.log(end/start)/Math.log(step))+1}).map((v, i) => start * (step ** (i)) )
```

```js
geometricProgression(256); // [1, 2, 4, 8, 16, 32, 64, 128, 256]
geometricProgression(256,3); //[3, 6, 12, 24, 48, 96, 192]
geometricProgression(256,1,4); //[1, 4, 16, 64, 256]
geometricProgression(256,2,1); //Gives error
```
