### keyValuePair

Returns the `key-value` pairs for an object.
 
```js
const keyValuePair = obj => {
    const unzip = arr =>
      arr.reduce(
        (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
        Array.from({
          length: Math.max(...arr.map(x => x.length))
        }).map(x => [])
      );
    return unzip([Object.keys(obj),Object.values(obj)])
}
```
```js
let someObject = {
name : "rohit",
income : "$1000000"
}

keyValuePair(someObject); // [["name", "rohit"],["income","$1000000"]]
```
