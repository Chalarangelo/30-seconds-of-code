### isHappyNumber

Determines if the provided number is a [Happy Number](https://en.wikipedia.org/wiki/Happy_number) or not.

```js
const isHappyNumber = num => {
    let occured = []
    let loop = true
    while(loop){
    let arr = `${num}`.split('')
    let sum = arr.reduce((acc,val) => acc + (parseInt(val)**2),0)
    if (sum === 1) return true
    else if(occured.includes(sum)) return false
    else {
        num = sum
        occured.push(sum)
    }
}
}
```

```js
isHappyNumber(10); // true
isHappyNumber(999); // false
```
