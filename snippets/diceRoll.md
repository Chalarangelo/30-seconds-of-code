---
title: diceRoll
tags: math,number,beginner
---

Returns the result of `x` dice rolls with a `y` sided dice.

- The `y` sided dice results is filled in a `aux[x]` array then printed.

```js
const diceRoller = (x,y) =>{
  
  const aux = [];
  for (var i = 0; i < x; i++){
    aux.push(Math.floor((Math.random() * y)+1));
  }
  console.log(aux);
}
 
```

```js
  diceRoller(3,6);; // [ 4, 1, 1 ]
  diceRoller(4,20);; // [ 2, 17, 13, 12 ]
```
