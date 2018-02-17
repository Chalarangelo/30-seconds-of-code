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
module.exports = fuzzySearch;