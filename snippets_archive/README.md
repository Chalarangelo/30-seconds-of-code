![Logo](/logo.png)
# Snippets Archive
These snippets, while useful and interesting, didn't quite make it into the repository due to either having very specific use-cases or being outdated. However we felt like they might still be useful to some readers, so here they are.
## Table of Contents
* [`JSONToDate`](#jsontodate)
* [`squareSum`](#squaresum)
* [`binarySearch`](#binarysearch)
* [`celsiusToFahrenheit`](#celsiustofahrenheit)
* [`cleanObj`](#cleanobj)
* [`collatz`](#collatz)
* [`countVowels`](#countvowels)
* [`factors`](#factors)
* [`fahrenheitToCelsius`](#fahrenheittocelsius)
* [`fibonacciCountUntilNum`](#fibonaccicountuntilnum)
* [`fibonacciUntilNum`](#fibonacciuntilnum)
* [`heronArea`](#heronarea)
* [`howManyTimes`](#howmanytimes)
* [`httpPut`](#httpput)
* [`isArmstrongNumber`](#isarmstrongnumber)
* [`isSimilar`](#issimilar)
* [`kmphToMph`](#kmphtomph)
* [`levenshteinDistance`](#levenshteindistance)
* [`mphToKmph`](#mphtokmph)
* [`pipeLog`](#pipelog)
* [`quickSort`](#quicksort)
* [`removeVowels`](#removevowels)
* [`solveRPN`](#solverpn)
* [`speechSynthesis`](#speechsynthesis)
* [`httpDelete`](#httpdelete)

---
### JSONToDate

Converts a JSON object to a date.

Use `Date()`, to convert dates in JSON format to readable format (`dd/mm/yyyy`).

```js
const JSONToDate = arr => {
  const dt = new Date(parseInt(arr.toString().substr(6)));
  return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
};
```

<details>
<summary>Examples</summary>

```js
JSONToDate(/Date(1489525200000)/); // "14/3/2017"
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### squareSum

Squares each number in an array and then sums the results together.

Use `Array.prototype.reduce()` in combination with `Math.pow()` to iterate over numbers and sum their squares into an accumulator.

```js
const squareSum = (...args) => args.reduce((squareSum, number) => squareSum + Math.pow(number, 2), 0);
```

<details>
<summary>Examples</summary>

```js
squareSum(1, 2, 2); // 9
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### binarySearch

Use recursion. Similar to `Array.prototype.indexOf()` that finds the index of a value within an array.
The difference being this operation only works with sorted arrays which offers a major performance boost due to it's logarithmic nature when compared to a linear search or `Array.prototype.indexOf()`.

Search a sorted array by repeatedly dividing the search interval in half.
Begin with an interval covering the whole array.
If the value of the search is less than the item in the middle of the interval, recurse into the lower half. Otherwise recurse into the upper half.
Repeatedly recurse until the value is found which is the mid or you've recursed to a point that is greater than the length which means the value doesn't exist and return `-1`.

```js
const binarySearch = (arr, val, start = 0, end = arr.length - 1) => {
  if (start > end) return -1;
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] > val) return binarySearch(arr, val, start, mid - 1);
  if (arr[mid] < val) return binarySearch(arr, val, mid + 1, end);
  return mid;
};
```

<details>
<summary>Examples</summary>

```js
binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 6); // 2
binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 21); // -1
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### celsiusToFahrenheit

Celsius to Fahrenheit temperature conversion.

Follows the conversion formula `F =  1.8C + 32`.

```js
const celsiusToFahrenheit = degrees => 1.8 * degrees + 32;
```

<details>
<summary>Examples</summary>

```js
celsiusToFahrenheit(33) // 91.4
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### cleanObj

Removes any properties except the ones specified from a JSON object.

Use `Object.keys()` method to loop over given JSON object and deleting keys that are not included in given array.
If you pass a special key,`childIndicator`, it will search deeply apply the function to inner objects, too.

```js
const cleanObj = (obj, keysToKeep = [], childIndicator) => {
  Object.keys(obj).forEach(key => {
    if (key === childIndicator) {
      cleanObj(obj[key], keysToKeep, childIndicator);
    } else if (!keysToKeep.includes(key)) {
      delete obj[key];
    }
  });
  return obj;
};
```

<details>
<summary>Examples</summary>

```js
const testObj = { a: 1, b: 2, children: { a: 1, b: 2 } };
cleanObj(testObj, ['a'], 'children'); // { a: 1, children : { a: 1}}
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### collatz

Applies the Collatz algorithm.

If `n` is even, return `n/2`. Otherwise, return `3n+1`.

```js
const collatz = n => (n % 2 === 0 ? n / 2 : 3 * n + 1);
```

<details>
<summary>Examples</summary>

```js
collatz(8); // 4
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### countVowels

Retuns `number` of vowels in provided string.

Use a regular expression to count the number of vowels `(A, E, I, O, U)` in a `string`.

```js
const countVowels = str => (str.match(/[aeiou]/gi) || []).length;
```

<details>
<summary>Examples</summary>

```js
countVowels('foobar'); // 3
countVowels('gym'); // 0
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### factors

Returns the array of factors of the given `num`.
If the second argument is set to `true` returns only the prime factors of `num`.
If `num` is `1` or `0` returns an empty array.
If `num` is less than `0` returns all the factors of `-int` together with their additive inverses.

Use `Array.from()`, `Array.prototype.map()` and `Array.prototype.filter()` to find all the factors of `num`.
If given `num` is negative, use `Array.prototype.reduce()` to add the additive inverses to the array.
Return all results if `primes` is `false`, else determine and return only the prime factors using `isPrime` and `Array.prototype.filter()`.
Omit the second argument, `primes`, to return prime and non-prime factors by default.

**Note**:- _Negative numbers are not considered prime._

```js
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
```

<details>
<summary>Examples</summary>

```js
factors(12); // [2,3,4,6,12]
factors(12, true); // [2,3]
factors(-12); // [2, -2, 3, -3, 4, -4, 6, -6, 12, -12]
factors(-12, true); // [2,3]
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### fahrenheitToCelsius

Fahrenheit to Celsius temperature conversion.

Follows the conversion formula `C = (F - 32) * 5/9`.

```js
const fahrenheitToCelsius = degrees => (degrees - 32) * 5/9;
```

<details>
<summary>Examples</summary>

```js
fahrenheitToCelsius(32); // 0
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### fibonacciCountUntilNum

Returns the number of fibonnacci numbers up to `num`(`0` and `num` inclusive).

Use a mathematical formula to calculate the number of fibonacci numbers until `num`.

```js
const fibonacciCountUntilNum = num =>
  Math.ceil(Math.log(num * Math.sqrt(5) + 1 / 2) / Math.log((Math.sqrt(5) + 1) / 2));
```

<details>
<summary>Examples</summary>

```js
fibonacciCountUntilNum(10); // 7
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### fibonacciUntilNum

Generates an array, containing the Fibonacci sequence, up until the nth term.

Create an empty array of the specific length, initializing the first two values (`0` and `1`).
Use `Array.prototype.reduce()` to add values into the array, using the sum of the last two values, except for the first two.
Uses a mathematical formula to calculate the length of the array required.

```js
const fibonacciUntilNum = num => {
  let n = Math.ceil(Math.log(num * Math.sqrt(5) + 1 / 2) / Math.log((Math.sqrt(5) + 1) / 2));
  return Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );
};
```

<details>
<summary>Examples</summary>

```js
fibonacciUntilNum(10); // [ 0, 1, 1, 2, 3, 5, 8 ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### heronArea

Returns the area of a triangle using only the 3 side lengths, Heron's formula. Assumes that the sides define a valid triangle. Does NOT assume it is a right triangle.

More information on what Heron's formula is and why it works available here: https://en.wikipedia.org/wiki/Heron%27s_formula.

Uses `Math.sqrt()` to find the square root of a value.


```js
const heronArea = (side_a, side_b, side_c) => {
    const p = (side_a + side_b + side_c) / 2
    return Math.sqrt(p * (p-side_a) * (p-side_b) * (p-side_c))
  };
```

<details>
<summary>Examples</summary>

```js
heronArea(3, 4, 5); // 6
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### howManyTimes

Returns the number of times `num` can be divided by `divisor` (integer or fractional) without getting a fractional answer.
Works for both negative and positive integers.

If `divisor` is `-1` or `1` return `Infinity`.
If `divisor` is `-0` or `0` return `0`.
Otherwise, keep dividing `num` with `divisor` and incrementing `i`, while the result is an integer.
Return the number of times the loop was executed, `i`.

```js
const howManyTimes = (num, divisor) => {
  if (divisor === 1 || divisor === -1) return Infinity;
  if (divisor === 0) return 0;
  let i = 0;
  while (Number.isInteger(num / divisor)) {
    i++;
    num = num / divisor;
  }
  return i;
};
```

<details>
<summary>Examples</summary>

```js
howManyTimes(100, 2); // 2
howManyTimes(100, 2.5); // 2
howManyTimes(100, 0); // 0
howManyTimes(100, -1); // Infinity
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### httpPut

Makes a `PUT` request to the passed URL.

Use `XMLHttpRequest` web api to make a `put` request to the given `url`.
Set the value of an `HTTP` request header with `setRequestHeader` method.
Handle the `onload` event, by running the provided `callback` function.
Handle the `onerror` event, by running the provided `err` function.
Omit the last argument, `err` to log the request to the console's error stream by default.

```js
const httpPut = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("PUT", url, true);
  request.setRequestHeader('Content-type','application/json; charset=utf-8');
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send(data);
};
```

<details>
<summary>Examples</summary>

```js
const password = "fooBaz";
const data = JSON.stringify(password);
httpPut('https://website.com/users/123', data, request => {
  console.log(request.responseText);
}); // 'Updates a user's password in database'
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### isArmstrongNumber

Checks if the given number is an Armstrong number or not.

Convert the given number into an array of digits. Use the exponent operator (`**`) to get the appropriate power for each digit and sum them up. If the sum is equal to the number itself, return `true` otherwise `false`.

```js
const isArmstrongNumber = digits =>
  (arr => arr.reduce((a, d) => a + parseInt(d) ** arr.length, 0) == digits)(
    (digits + '').split('')
  );
```

<details>
<summary>Examples</summary>

```js
isArmstrongNumber(1634); // true
isArmstrongNumber(56); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### isSimilar

Determines if the `pattern` matches with `str`.

Use `String.toLowerCase()` to convert both strings to lowercase, then loop through `str` and determine if it contains all characters of `pattern` and in the correct order.
Adapted from [here](https://github.com/forrestthewoods/lib_fts/blob/80f3f8c52db53428247e741b9efe2cde9667050c/code/fts_fuzzy_match.js#L18).

```js
const isSimilar = (pattern, str) =>
  [...str].reduce(
      (matchIndex, char) =>
          char.toLowerCase() === (pattern[matchIndex] || '').toLowerCase()
              ? matchIndex + 1
              : matchIndex,
      0
  ) === pattern.length;
```

<details>
<summary>Examples</summary>

```js
isSimilar('rt','Rohit'); // true
isSimilar('tr','Rohit'); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### kmphToMph

Convert kilometers/hour to miles/hour.

Multiply the constant of proportionality with the argument.

```js
const kmphToMph = (kmph) => 0.621371192 * kmph;
```

<details>
<summary>Examples</summary>

```js
kmphToMph(10); // 16.09344000614692
kmphToMph(345.4); // 138.24264965280207
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### levenshteinDistance

Calculates the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) between two strings.

Calculates the number of changes (substitutions, deletions or additions) required to convert `string1` to `string2`. 
Can also be used to compare two strings as shown in the second example.

``` js
const levenshteinDistance = (string1, string2) => {
  if (string1.length === 0) return string2.length;
  if (string2.length === 0) return string1.length;
  let matrix = Array(string2.length + 1)
    .fill(0)
    .map((x, i) => [i]);
  matrix[0] = Array(string1.length + 1)
    .fill(0)
    .map((x, i) => i);
  for (let i = 1; i <= string2.length; i++) {
    for (let j = 1; j <= string1.length; j++) {
      if (string2[i - 1] === string1[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[string2.length][string1.length];
};
```

<details>
<summary>Examples</summary>

```js
levenshteinDistance('30-seconds-of-code','30-seconds-of-python-code'); // 7
const compareStrings = (string1,string2) => (100 - levenshteinDistance(string1,string2) / Math.max(string1.length,string2.length));
compareStrings('30-seconds-of-code', '30-seconds-of-python-code'); // 99.72 (%)
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### mphToKmph

Convert miles/hour to kilometers/hour.

Multiply the constant of proportionality with the argument.

```js
const mphToKmph = (mph) => 1.6093440006146922 * mph;
```

<details>
<summary>Examples</summary>

```js
mphToKmph(10); // 16.09344000614692
mphToKmph(85.9); // 138.24264965280207
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### pipeLog

Logs a value and returns it.

Use `console.log` to log the supplied value, combined with the `||` operator to return it.



```js
const pipeLog = data => console.log(data) || data;
```

<details>
<summary>Examples</summary>

```js
pipeLog(1); // logs `1` and returns `1`
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### quickSort

QuickSort an Array (ascending sort by default).

Use recursion.
Use `Array.prototype.filter` and spread operator (`...`) to create an array that all elements with values less than the pivot come before the pivot, and all elements with values greater than the pivot come after it.
If the parameter `desc` is truthy, return array sorts in descending order.

```js
const quickSort = ([n, ...nums], desc) =>
  isNaN(n)
    ? []
    : [
        ...quickSort(nums.filter(v => (desc ? v > n : v <= n)), desc),
        n,
        ...quickSort(nums.filter(v => (!desc ? v > n : v <= n)), desc)
      ];
```

<details>
<summary>Examples</summary>

```js
quickSort([4, 1, 3, 2]); // [1,2,3,4]
quickSort([4, 1, 3, 2], true); // [4,3,2,1]
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### removeVowels

Returns all the vowels in a `str` replaced by `repl`.

Use `String.prototype.replace()` with a regexp to replace all vowels in `str`.
Omot `repl` to use a default value of `''`.

```js
const removeVowels = (str, repl = '') => str.replace(/[aeiou]/gi, repl);
```

<details>
<summary>Examples</summary>

```js
removeVowels("foobAr"); // "fbr"
removeVowels("foobAr","*"); // "f**b*r"
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### solveRPN

Solves the given mathematical expression in [reverse polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation).
Throws appropriate errors if there are unrecognized symbols or the expression is wrong. The valid operators are :- `+`,`-`,`*`,`/`,`^`,`**` (`^`&`**` are the exponential symbols and are same). This snippet does not supports any unary operators.

Use a dictionary, `OPERATORS` to specify each operator's matching mathematical operation.
Use `String.prototype.replace()` with a regular expression to replace `^` with `**`, `String.prototype.split()` to tokenize the string and `Array.prototype.filter()` to remove empty tokens.
Use `Array.prototype.forEach()` to parse each `symbol`, evaluate it as a numeric value or operator and solve the mathematical expression.
Numeric values are converted to floating point numbers and pushed to a `stack`, while operators are evaluated using the `OPERATORS` dictionary and pop elements from the `stack` to apply operations.

```js
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
  });
  if (stack.length === 1) return stack.pop();
  else throw `${rpn} is not a proper RPN. Please check it and try again`;
};
```

<details>
<summary>Examples</summary>

```js
solveRPN('15 7 1 1 + - / 3 * 2 1 1 + + -'); // 5
solveRPN('2 3 ^'); // 8
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### speechSynthesis

Performs speech synthesis (experimental).

Use `SpeechSynthesisUtterance.voice` and `window.speechSynthesis.getVoices()` to convert a message to speech.
Use `window.speechSynthesis.speak()` to play the message.

Learn more about the [SpeechSynthesisUtterance interface of the Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance).

```js
const speechSynthesis = message => {
  const msg = new SpeechSynthesisUtterance(message);
  msg.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(msg);
};
```

<details>
<summary>Examples</summary>

```js
speechSynthesis('Hello, World'); // // plays the message
```

</details>

<br>[⬆ Back to top](#table-of-contents)

### httpDelete

Makes a `DELETE` request to the passed URL.

Use `XMLHttpRequest` web api to make a `delete` request to the given `url`.
Handle the `onload` event, by running the provided `callback` function.
Handle the `onerror` event, by running the provided `err` function.
Omit the third argument, `err` to log the request to the console's error stream by default.

```js
const httpDelete = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('DELETE', url, true);
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send();
};
```

<details>
<summary>Examples</summary>

```js
httpDelete('https://website.com/users/123', request => {
  console.log(request.responseText);
}); // 'Deletes a user from the database'
```

</details>

<br>[⬆ Back to top](#table-of-contents)

