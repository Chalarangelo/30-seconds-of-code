---
title: Iterate over object
tags: looping,Object,forloop,beginner
---

Iterate through object & print key & value

- Use `For in` loop to iterate through Object.
- Use `key in obj` gives a keys present in object.

```js
const iterate = obj => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          console.log(`${key} : ${obj[key]}`);
        }
    }
}
```

```js
let person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    ssn: '123-456-2356'
};

iterate(person);
```
