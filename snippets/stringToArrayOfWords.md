### stringToArrayOfWords

Converts a given string into an array of words

First create an array of dirt that you want to remove from the string. Then replace each dirt with an empty string. Use `String.split(' ')` to conver string to array with the space a delimiter.

```js
const stringToArray = str =>{
	[".", ",", "?", "!", "& ", "(", ")", "[", "]"].map(d => str = str.replace(d, ""));
	return str.split(" ");
}

// stringToArrayOfWords("I love javaScript!!") -> ["I", "love", "javaScript"]
```