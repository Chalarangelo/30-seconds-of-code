---
title: closure
tags: function,intermediate
---
##### A closure is an inner function that has access to the variables in the outer (enclosing) function’s scope chain. The closure has access to variables in three scopes; specifically:
- ##### variable in its own scope, 
- ##### variables in the enclosing function’s scope, and
- ##### global variables.

##### Here is an example:-


```var globalVar = "xyz";

(function outerFunc(outerArg) {
    var outerVar = 'a';
    
    (function innerFunc(innerArg) {
    var innerVar = 'b';
    
    console.log(
        "outerArg = " + outerArg + "\n" +
        "innerArg = " + innerArg + "\n" +
        "outerVar = " + outerVar + "\n" +
        "innerVar = " + innerVar + "\n" +
        "globalVar = " + globalVar);
    
    })(456);
})(123);
```

##### In the above example, variables from ```innerFunc```, ```outerFunc``` and the global namespace are <b>all</b> in scope in the ```innerFunc``` .  The above code will therefore produce the following output:

```
outerArg = 123
innerArg = 456
outerVar = a
innerVar = b
globalVar = xyz
```
