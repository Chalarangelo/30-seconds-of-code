### postfixToInfix


``` js
const postfixToInfix = RPN => {
  let convert = RPN.replace(/\^/g,'**').split(/\s+/g).filter(el => !/\s+/.test(el) && el !== '')
  let stack = []
  let result = []
  let precedence = {null : 4 ,'**':3 ,'/' : 2,'*': 2,'+':1,'-':1 }
  convert.forEach(symbol => {
    let stra,strb
    if(!isNaN(parseFloat(symbol)) && isFinite(symbol)){
      result.push(symbol)
      stack.push(null)
    }
    else if (Object.keys(precedence).includes(symbol)) {
      let [a,b,opa,opb] = [result.pop(),result.pop(),stack.pop(),stack.pop()]
      if(precedence[opb] < precedence[symbol]) {
         strb = `(${b})`
      }
      else{
         strb = `${b}`
      }
      if((precedence[opa] < precedence[symbol]) || ((precedence[opa] === precedence[symbol]) && ["/","-"].includes(symbol) )){
         stra = `(${a})`
      }
      else {
         stra = `${a}`
      }
      result.push(strb +symbol + stra)
      stack.push(symbol)
  }
    else throw `${symbol} is not a recognized symbol`
  })
  if(result.length === 1) return result.pop()
  else throw `${RPN} is not a correct RPN`
}
```
```js

```
