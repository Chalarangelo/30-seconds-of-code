
const anagrams = str => {
  if(str.length <= 2)  return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce( (acc, letter, i) =>
    acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map( val => letter + val )), []);
}
// anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']


const average = arr =>
  arr.reduce( (acc , val) => acc + val, 0) / arr.length;
// average([1,2,3]) -> 2


const bottomVisible = _ => 
  document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight;
// bottomVisible() -> true


const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
// capitalizeEveryWord('hello world!') -> 'Hello World!'


const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest? str.slice(1).toLowerCase() : str.slice(1));
// capitalize('myName', true) -> 'Myname'


const chainAsync = fns => { let curr = 0; const next = () => fns[curr++](next); next(); }
/*
chainAsync([
  next => { console.log('0 seconds'); setTimeout(next, 1000); },
  next => { console.log('1 second');  setTimeout(next, 1000); },
  next => { console.log('2 seconds'); }
])
*/


const palindrome = str =>
  str.toLowerCase().replace(/[\W_]/g,'').split('').reverse().join('') === str.toLowerCase().replace(/[\W_]/g,'');
// palindrome('taco cat') -> true
 

const chunk = (arr, size) =>
  Array.apply(null, {length: Math.ceil(arr.length/size)}).map((v, i) => arr.slice(i*size, i*size+size));
// chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],5]


const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3


const currentUrl = _ => window.location.href;
// currentUrl() -> 'https://google.com'


const curry = (f, arity = f.length, next) =>
  (next = prevArgs =>
    nextArg => {
      const args = [ ...prevArgs, nextArg ];
      return args.length >= arity ? f(...args) : next(args);
    }
  )([]);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2


const deepFlatten = arr =>
  arr.reduce( (a, v) => a.concat( Array.isArray(v) ? deepFlatten(v) : v ), []);
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]


const difference = (arr, values) => arr.filter(v => !values.includes(v));
// difference([1,2,3], [1,2]) -> [3]


const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
// distance(1,1, 2,3) -> 2.23606797749979


const isDivisible = (dividend, divisor) => dividend % divisor === 0;
// isDivisible(6,3) -> true


const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// escapeRegExp('(test)') -> \\(test\\)


const isEven = num => Math.abs(num) % 2 === 0;
// isEven(3) -> false


const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
// factorial(6) -> 720


const fibonacci = n => 
  Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),[]);
// fibonacci(5) -> [0,1,1,2,3]


const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]


const flatten = arr => arr.reduce( (a, v) => a.concat(v), []);
// flatten([1,[2],3,4]) -> [1,2,3,4]


const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10


const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1


const getType = v =>
  v === undefined ? "undefined" : v === null ? "null" : v.constructor.name.toLowerCase(); 
// getType(new Set([1,2,3])) -> "set"


const getScrollPos = (el = window) =>
  ( {x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
   y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop} );
// getScrollPos() -> {x: 0, y: 200}


const gcd = (x , y) => !y ? x : gcd(y, x % y);
// gcd (8, 36) -> 4


const hammingDistance = (num1, num2) =>
  ((num1^num2).toString(2).match(/1/g) || '').length;
// hammingDistance(2,3) -> 1


const head = arr => arr[0];
// head([1,2,3]) -> 1


const initial = arr => arr.slice(0,-1);
// initial([1,2,3]) -> [1,2]


const initializeArrayRange = (end, start = 0) =>
  Array.apply(null, Array(end-start)).map( (v,i) => i + start );
// initializeArrayRange(5) -> [0,1,2,3,4]


const initializeArray = (n, value = 0) => Array(n).fill(value);
// initializeArray(5, 2) -> [2,2,2,2,2]


const last = arr => arr.slice(-1)[0];
// last([1,2,3]) -> 3


const timeTaken = callback => {
  const t0 = performance.now(), r = callback();
  console.log(performance.now() - t0);
  return r;
}
// timeTaken(() => Math.pow(2, 10)) -> 1024 (0.010000000009313226 logged in console)


const median = arr => {
  const mid = Math.floor(arr.length / 2), nums = arr.sort((a,b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}
// median([5,6,50,1,-5]) -> 5
// median([0,10,-2,7]) -> 3.5


const objectFromPairs = arr => arr.reduce((a,v) => (a[v[0]] = v[1], a), {});
// objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}


const percentile = (arr, val) => 
  100 * arr.reduce((acc,v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length;
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55
 

const pipe = (...funcs) => arg => funcs.reduce((acc, func) => func(acc), arg);
// pipe(btoa, x => x.toUpperCase())("Test") -> "VGVZDA=="


const powerset = arr =>
  arr.reduce( (a,v) => a.concat(a.map( r => [v].concat(r) )), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]


const promisify = func =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) =>
        err ? reject(err) : resolve(result))
    );
// const delay = promisify((d, cb) => setTimeout(cb, d))
// delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s


const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2


const randomInRange = (min, max) => Math.random() * (max - min) + min;
// randomInRange(2,10) -> 6.0211363285087005


const randomizeOrder = arr => arr.sort( (a,b) => Math.random() >= 0.5 ? -1 : 1);
// randomizeOrder([1,2,3]) -> [1,3,2]


const redirect = (url, asLink = true) =>
  asLink ? window.location.href = url : window.location.replace(url);
// redirect('https://google.com')


const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'


const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// rgbToHex(255, 165, 1) -> 'ffa501'


const series = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// series([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete


const scrollToTop = _ => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if(c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c/8);
  }
}
// scrollToTop()


const shuffle = arr => {
  let r = arr.map(Math.random);
  return arr.sort((a,b) => r[a] - r[b]);
}
// shuffle([1,2,3]) -> [2, 1, 3]


const similarity = (arr, values) => arr.filter(v => values.includes(v));
// similarity([1,2,3], [1,2,4]) -> [1,2]


const sortCharactersInString = str =>
  str.split('').sort( (a,b) => a.localeCompare(b) ).join('');
// sortCharactersInString('cabbage') -> 'aabbceg'


const sum = arr => arr.reduce( (acc , val) => acc + val, 0);
// sum([1,2,3,4]) -> 10


[varA, varB] = [varB, varA];
// [x, y] = [y, x]


const tail = arr => arr.length > 1 ? arr.slice(1) : arr;
// tail([1,2,3]) -> [2,3]
// tail([1]) -> [1]


const truncate = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num-3 : num) + '...' : str;
// truncate('boomerang', 7) -> 'boom...'


const unique = arr => [...new Set(arr)];
// unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]


const getUrlParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))?/g).reduce(
    (a,v) => (a[v.slice(0,v.indexOf('='))] = v.slice(v.indexOf('=')+1), a), {}
  );
// getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}


const uuid = _ =>
  ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace( /[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
// uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'


const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n);
// validateNumber('10') -> true


const valueOrDefault = (value, d) => value || d;
// valueOrDefault(NaN, 30) -> 30


