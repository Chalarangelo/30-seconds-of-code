### RPNSolver

Solves the given reverse polish notation
```js
const RPNSolver = RPN => {
  const isNumeric = str => !isNaN(parseFloat(str)) && isFinite(str);
  const isOperator = str => ['*','-','+','/','**'].includes(str)
  let stack = [];
  let solve  = RPN.replace(/\^/g,'**').split(/\s+/g);
  solve.forEach(symbol => {
    if(isNumeric(symbol)) {stack.push(symbol)}
          else if (isOperator(symbol)){
          a = stack.pop();
          b = stack.pop();
          if(symbol === "+") {
                    stack.push(parseFloat(a) + parseFloat(b));
                } else if(symbol === "-") {
                    stack.push(parseFloat(b) - parseFloat(a));
                } else if(symbol === "*") {
                    stack.push(parseFloat(a) * parseFloat(b));
                } else if(symbol === "/") {
                    stack.push(parseFloat(b) / parseFloat(a));
                } else if(symbol === "**") {
                    stack.push(parseFloat(a) ** parseFloat(b));
                }
        } else { console.log('Wrong RPN')}
  }
)
return stack.length === 1 ? stack.pop() : console.log("error")
}
```

```js

```
