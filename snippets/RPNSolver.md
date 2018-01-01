### RPNSolver

Solves the given reverse polish notation
```js
const RPNSolver = RPN => {
  const isNumeric = str => !isNaN(parseFloat(str)) && isFinite(str);
  const isOperator = str => ['*','-','+','/','**'].includes(str)
  let stack = [];
  let solve  = RPN.replace(/\^/g,'**').split(/\s+/g);
  solve.forEach(symbol => {
    isNumeric(symbol) ? stack.push(symbol) :
          isOperator(symbol) ?
          (a = stack.pop(),
          b = stack.pop(),
          stack.push(eval(a + symbol + b))) : Console.log('Wrong RPN')
  }
)
return stack.pop()
}
```

```js

```
