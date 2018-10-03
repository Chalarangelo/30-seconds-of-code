###bubbleSort

Sorts an array using Bubblesort algorithm.

This sorting algorithm is comparison-based algorithm in which each pair of adjacent elements is compared and the elements are swapped if they are not in order.

```js
function bubbleSort(arr){
  let uniqueArr = [...new Set(arr)];
  
  for(let i=0; i<uniqueArr.length; i++){
    let swapped = false;
    
      for(let j=0; j<uniqueArr.length-1-i; j++){
        if(uniqueArr[j] > uniqueArr[j+1]){
            let temp = uniqueArr[j];
            uniqueArr[j] = uniqueArr[j+1];
            uniqueArr[j+1] = temp;
            swapped = true;
        }
      }
      if(!swapped){
        break;
      }
  }
   return uniqueArr;
}

```
<details>

<summary>Examples</summary>

```js
bubbleSort([44, 11, 7, 20, 12, 90, 35, 5]); // [5,7,11,12,20,35,44,90]
```
</details>
