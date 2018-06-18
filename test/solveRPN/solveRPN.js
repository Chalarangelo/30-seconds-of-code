const solveRPN = rpn => {
const OPERATORS = {
'*': (a, b) => a * b,
'+': (a, b) => a + b,
'-': (a, b) => a - b,
'/': (a, b) => a / b,
'**': (a, b) => a ** b
};
const [stack, solve] = [
[],
rpn
.replace(/\^/g, '**')
.split(/\s+/g)
.filter(el => !/\s+/.test(el) && el !== '')
];
solve.forEach(symbol => {
if (!isNaN(parseFloat(symbol)) && isFinite(symbol)) {
stack.push(symbol);
} else if (Object.keys(OPERATORS).includes(symbol)) {
const [a, b] = [stack.pop(), stack.pop()];
stack.push(OPERATORS[symbol](parseFloat(b), parseFloat(a)));
} else {
throw `${symbol} is not a recognized symbol`;
}

if (stack.length === 1) return stack.pop();
else throw `${rpn} is not a proper RPN. Please check it and try again`;
};
module.exports = solveRPN;