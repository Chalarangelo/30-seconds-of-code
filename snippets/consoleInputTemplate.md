---
title: consoleInputTemplate
tags: cli,competitive-coding,javaScript,i/o,intermediate
---

JS / Node.JS how to take input from command line.

- Provides array of Input values, line by line.
- Useful in CLI based applications.
- If you are looking to start competitive coding with the only language you know `JS` / `Node.JS` then here you go.

```js
let index=0;
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk){
  arr = chunk.split('\n');
});

process.stdin.on('end', function() {
    let T = Number(arr[index++]); // Number of testcases (Optional)
    // Input is in arr array and Here your code goes.
});
```

```bash
1
2 3 4 5
1 7
1 6

# output testcases T = 1; input values arr = ["1","2 3 4 5","1 7","1 6"];
```
