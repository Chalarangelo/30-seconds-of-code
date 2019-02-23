### VectorDistance

Returns the distance between two points.

Splits the arguments array into two points. Use `Array.prototype.reduce()`,`Math.pow()` and `Math.sqrt()` to calculate the Euclidean distance between two vectors.

```js
const vectorDistance = (...coords) => {
    let length = Math.trunc(coords.length/2);
    let sum = coords.slice(0,length).reduce((accumulator,currentValue,currentIndex) => accumulator + (Math.pow(currentValue-coords[length+currentIndex],2)),0);
    return Math.sqrt(sum);
}
```

```js
vectorDistance(10,0,5,20,0,10) //11.180339887498949
```
