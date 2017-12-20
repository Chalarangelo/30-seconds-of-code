### stringToArrayOfWords

Converts a given string into an array of words

First create an array of dirt that you want to remove from the string. Then replace each dirt with an empty string. Use `String.split(' ')` to conver the string to an array with the space as a delimiter.

```js
const stringToArrayOfWords = str => {
	[".", ",", "?", "!", "& ", "(", ")", "[", "]"].map(d => str = str.split(d).join(""));
	return str.split(/[\W_]+/);
}

// stringToArrayOfWords("I love javaScript!!") -> ["I", "love", "javaScript"]
// stringToArrayOfWords("python, javaScript & coffee") -> ["python", "javaScript", "coffee"]
```