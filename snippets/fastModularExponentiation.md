---
title: fastModularExponentiation
tags: math,intermediate
---
Calculates exponential of a value of a number raised to another number

Uses iterations:<br>
If input is a^b%c then value of b is divided into powers of 2 by using it in binary form.<br>
Now we calculate mod c of the powers of two <= b.<br>
Use the modular multiplication properties to combine the calculated mod c values.<br>
_Example_:
Let a = 5, b = 117 and c = 19<br>
Step 1 - Divide b into powers of 2
```
		117 = 1110101 in binary
```
Step 2 - Calculate mod c of the powers of two <= b
```
		5 ^ 1 % 19 = 5
		5 ^ 2 % 19 = (5^1 * 5^1) % 19 
				   = (5^1%19 * 5^1%19) % 19
				   = 25 % 19 = 6

		Continue this step for all values
		5 ^ 4 % 19 = 17
		5 ^ 8 % 19 = 4
		5 ^ 16 % 19 = 16
		5 ^ 32 % 19 = 9
		5 ^ 64 % 19 = 5
```
Step 3 - Use the modular multiplication properties to combine the calculated mods.
```
		5 ^ 117 % 19 = (5^1 * 5^4 * 5^16 * 5^32 * 5^64) % 19
		5 ^ 117 % 19 = (5^1%19 * 5^4%19 * 5^16%19 * 5^32%19 * 5^64%19) % 19
		Substituting values acquired from step 2
		5 ^ 117 % 19 = (5 * 17 * 16 * 9 * 5) % 19
		5 ^ 117 % 19 = 1
```
Snippet does the same thing as explained above
```js
const fastModularExponentiation = (base, exponent, modulus) => {
	let result = 1;
	base = base % modulus;
	while(exponent > 0) {
		if(exponent % 2 === 1) { // odd number
			result = (result * base) % modulus;
		}
		base = (base * base) % modulus;
		exponent = exponent >> 1; // divide by two
	}
	return result;
}
```
```js
fastModularExponentiation(5, 117, 9); // 1
fastModularExponentiation(7, 13, 19); // 7
```