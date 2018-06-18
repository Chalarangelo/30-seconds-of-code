const factors = (num, primes = false) => {
const isPrime = num => {
const boundary = Math.floor(Math.sqrt(num));
for (var i = 2; i <= boundary; i++) if (num % i === 0) return false;
return num >= 2;
};
const isNeg = num < 0;
num = isNeg ? -num : num;
let array = Array.from({ length: num - 1 })
.map((val, i) => (num % (i + 2) === 0 ? i + 2 : false))
.filter(val => val);
if (isNeg)
array = array.reduce((acc, val) => {
acc.push(val);
acc.push(-val);
return acc;
}, []);
return primes ? array.filter(isPrime) : array;
};
module.exports = factors;