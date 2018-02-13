const permuteAll = (input) => {
const result = [];
let inputState = input;

if (typeof input === 'string') inputState = input.split('');
if (typeof input === 'number') inputState = (input).toString().split('');

const permute = (arr, m = []) => {
(arr.length === 0)
? result.push(m)
: arr.forEach((_, i) => {
let curr = arr.slice();
let next = curr.splice(i, 1);
permute(curr.slice(), m.concat(next));
});
};

permute(inputState);

return (typeof input === 'string')
? result.map(variant => variant.join(''))
: (typeof input === 'number')
? result.map(variant => parseFloat(variant.join('')))
: result;
};
module.exports = permuteAll;