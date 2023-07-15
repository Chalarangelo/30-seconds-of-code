---
title: How Javascript Code Runs ?
type: question
language: javascript
tags: [browser,architecture]
author: hamdankalyar
cover: architectural
dateModified: 2023‐07‐14T17:51:20−07:00
---
 
**There are two main things in the code running** 

 1. Thread Execution  	
 2. Memory

first explain these two terms 

 - ***Thread Execution*** is go through the code line by line and runs or execute each line.
 - ***Memory*** saves data like strings and arrays so we can use that data later  in its memory and functions also save in the memory  when we initialize it for later use.



  

```js

const number = 5; 
function multiplyBy3 (inputNumber){ 
const result = inputNumber*3; 
return result; 
} 
const output = multiplyBy3(number); 

```

 - first thread goes to the first line and save the number into the
    memory with value 5
    
 - thread goes to the second line save that function multiplyBy3() into the memory 
 - jump to the line last line and save const output to memory and start finding the value by invoking the multiplyBy3() function 
 - now thread goes into the function and here come concept of execution context 

***Execution context*** -   Created to run the code of a function and it has 2 parts we have already seen them! -

-   It seems like the functions is like program so it has its own memory and thread of execution and its block is called as **local block** and outer block is called as the **global block**

continue explaining the above code..

 - thread goes into the function and first save the inputNumber = 5 in the local memory of function 
 - then evaluate the result which is 15 and store that into the memory 
 - on return the value of result returns and get store on the output.

One more concept of **call the stack** 
-   JavaScript keeps track of what function is currently running (where’s the thread of execution)
    
-   Run a function - add to call stack (by call () fun )
    
-   Finish running the function - JS removes it from call stack (return use to finish)
    
-   Whatever is top of the call stack - that’s the function we’re currently running
    

-   As all functions run in the stack there is global function which is the function in which all code runs is known as the global() function in which all other functions run
    
-   Where our thread of execution is we can see it by the call stack.
