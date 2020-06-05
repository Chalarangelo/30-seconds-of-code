---
title: cartesianProduct
tags: array,sets,intermediate
---

Generates the cartesian product of two sets.

After passing in the 2 sets, it is checked if the sets are empty or not. If it is `null` is returned, otherwise we instantiate a product set. We then loop through the first and second set to form all possible pairs and the product is `pushed` to the `product` set.

```js
const cartesianProduct = (setA, setB) =>
  {
        if (!setA || !setB || !setA.length || !setB.length) {
            return null; 
        } 
        const product = []; 
        for (let indexA = 0; indexA < setA.length; indexA += 1) {
            for (let indexB = 0; indexB < setB.length; indexB += 1) {
            // Add current product pair to the product set. 
            product.push([setA[indexA], setB[indexB]]); 
            } 
        } 
        return product; 
  }
```

```js
cartesianProduct([5,6],[7,8]); // [[5,7], [5,8], [6,7], [6,8]]
cartesianProduct([1,2,3],[4,5,6]); // [[1,4], [1,5], [1,6], [2,4], [2,5], [2,6], [3,4], [3,5], [3,6]]
```