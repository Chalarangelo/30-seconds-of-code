---
title: CracklePop
tags: string,divisibility,intermediate
firstSeen: 2021-06-13T05:00:00-04:00
lastUpdated: 2021-09-07T20:23:47+03:00
---

Program that prints out the numbers 1 to 100 (inclusive). If the number is divisible by 3, print Crackle instead of the number. If it's divisible by 5, print Pop. If it's divisible by both 3 and 5, print CracklePop.

- create empty string variable.
- add Crackle, Pop, both or none according to divisibility of a number.
- display output.

```js
for (var i=1; i<=100;i++){
    var result = "";

    if(i%3 === 0){
        result += "Crackle";
    }
    if(i%5 === 0){
        result += "Pop";
    }

    if(result === ""){
        result = i;
    }
    console.log(result);
}
```

```js
1
2
Crackle
4
Pop
Crackle
7
8
Crackle
Pop
11
Crackle
13
14
CracklePop
...
```
