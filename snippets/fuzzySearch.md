### fuzzySearch

Determines if the `patrn` matches with `str`

Loops through `str` and determines if it contains all characters of `patrn` and in the correct order. Both the strings are converted to lower case.

Taken from [here](https://github.com/forrestthewoods/lib_fts/blob/80f3f8c52db53428247e741b9efe2cde9667050c/code/fts_fuzzy_match.js#L18).
``` js
fuzzySearch = (patrn, str) => {
    const pattern = patrn;
    const string = str; 
    let patternIdx = 0;
    let strIdx = 0;
    let patternLength = pattern.length;
    let strLength = string.length;

    while (patternIdx !== patternLength && strIdx !== strLength) {
        let patternChar = pattern[patternIdx].toLowerCase();
        let strChar = string[strIdx].toLowerCase();
        if (patternChar === strChar)
            ++patternIdx;
        ++strIdx;
    }

    return patternLength !== 0 && strLength !== 0 && patternIdx === patternLength ? true : false;
}
```


``` js
fuzzySearch('rt','Rohit'); // true
fuzzySearch('tr','Rohit'); // false
```