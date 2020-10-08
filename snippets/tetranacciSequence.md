---
title: tetranacciSequence
tags: maths,loop,intermediate
---

The Tetranacci Sequence is a sequence similar to Fibonacci's, every integer in this sequence is the sum of the last three elements. This snippet returns the nth element from the Tetranacci Sequence.

- Use `while` to loop from 0 to n-1 and calculate every element from the sequence.
- Returns the sum of the last three elements.

```js
const tetranacciSequence = n =>{
  let lasts = [-1,1,0];
  let cont = 0;
  while(cont<n){
      let a=lasts[2];
      let b=lasts[1];
      let c=lasts[0];
      lasts[2]=a+b+c;
      lasts[1]=a;
      lasts[0]=b;
      cont=cont+1;
  }
  return lasts[2]+lasts[1]+lasts[0]
}
```

```js
tetranacciSequence(0); // 0
tetranacciSequence(5); // 7
tetranacciSequence(25); // 1389537
```
