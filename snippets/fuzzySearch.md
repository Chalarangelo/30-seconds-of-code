### fuzzySearch

Determines if the `patrn` matches with `str`

Loops through `str` and determines if it contains all characters of `patrn` and in the correct order. Both the strings are converted to lower case.

Taken from [here](https://github.com/forrestthewoods/lib_fts/blob/80f3f8c52db53428247e741b9efe2cde9667050c/code/fts_fuzzy_match.js#L18).
``` js
const fuzzySearch = (pattern, str) =>
	[...str].reduce(
		(acc, char) => char.toLowerCase() === (pattern[acc]  || '').toLowerCase() ? acc + 1 : acc, 0
	) === pattern.length ? true : false;
```


``` js
fuzzySearch('rt','Rohit'); // true
fuzzySearch('tr','Rohit'); // false
```
