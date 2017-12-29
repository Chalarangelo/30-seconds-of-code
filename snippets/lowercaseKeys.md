### lowercaseKeys

Creates a new object from the specified object, where all the keys are in lowercase.

Use `Object.keys()` and `Array.reduce()` to create a new object from the specified object.
Convert each key in the original object to lowercase, using `String.toLowerCase()`.

```js
const lowercaseKeys = obj =>
  Object.keys(obj).reduce((acc,key) => {acc[key.toLowerCase()] = obj[key]; return acc;},{});
```

```js
let myObj = {Name: 'Adam', sUrnAME: 'Smith'};
let myObjLower = lowercaseKeys(myObj);
console.log(myObj); // {Name: 'Adam', sUrnAME: 'Smith'};
console.log(myObjLower); // {name: 'Adam', surname: 'Smith'};
```
