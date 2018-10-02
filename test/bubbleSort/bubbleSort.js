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

module.exports = bubbleSort;
