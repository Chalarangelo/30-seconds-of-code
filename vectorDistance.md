### VectorDistance

Explain briefly what the snippet does.

Explain briefly how the snippet works.

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
