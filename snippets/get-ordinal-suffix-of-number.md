### Get Ordinal Suffix of Number

Use the modulo operator (`%`) to find values of single and tens digits.
Find which ordinal pattern digits match.
If digit is found in teens pattern, use teens ordinal.

```js
const toOrdinalSuffix = int => {
	int = parseInt(int);
	var digits = [ (int % 10), (int % 100)];
	var ordinals = ["st", "nd", "rd", "th"];
	var oPattern = [1,2,3,4];
	var tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]

	return pattern.includes(digits[0]) && !teens.includes(digits[1]) ? int + suffix[digits[0]-1] : int + suffix[3];
}
// toOrdinalSuffix("123") -> "123rd"
```