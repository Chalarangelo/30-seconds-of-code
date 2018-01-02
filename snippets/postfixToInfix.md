const postFix = RPN => {
  let convert = RPN.replace(/\^/g,'**').split(/\s+/g).filter(el => !/\s+/.test(el) && el !== '')
  let stack = []
  let result = []
  let friends = {"+" : ["+","-","*","/"],"-":[],"/":["*"],"*":["/","*"],"**":["+","-","*","/"]}
  convert.forEach(symbol => {
    if(!isNaN(parseFloat(symbol)) && isFinite(symbol)){
      result.push(symbol)
    }
    else if (Object.keys(friends).includes(symbol)) {
      a = result.pop()
      b = result.pop()
      if(stack.length !==0){
          if(friends[symbol].includes(stack.pop())){
            result.push(`${b} ${symbol} ${a}`)
            stack.push(symbol)
          }
          else{
            result.push(`(${b}) ${symbol} ${a}`)
            stack.push(symbol)
          }
      }
      else {result.push(`${b} ${symbol} ${a}`);stack.push(symbol)}
    }
    else throw `${symbol} is not a recognized symbol`
  })
  if(result.length === 1) return result.pop()
  else throw `${RPN} is not a correct RPN`
}
