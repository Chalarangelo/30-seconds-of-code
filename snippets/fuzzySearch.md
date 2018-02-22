### fuzzySearch

Determines if the `pattern` matches with `str`

Loops through `str` and determines if it contains all characters of `pattern` and in the correct order. Both the strings are converted to lower case.

Adapted from [here](https://github.com/forrestthewoods/lib_fts/blob/80f3f8c52db53428247e741b9efe2cde9667050c/code/fts_fuzzy_match.js#L18).
``` js
const fuzzySearch = (pattern, str) =>
	[...str].reduce(
		(matchIndex, char) => char.toLowerCase() === (pattern[matchIndex]  || '').toLowerCase() ? matchIndex + 1 : matchIndex, 0
	) === pattern.length ? true : false;
```


``` js
fuzzySearch('rt','Rohit'); // true
fuzzySearch('tr','Rohit'); // false
```
