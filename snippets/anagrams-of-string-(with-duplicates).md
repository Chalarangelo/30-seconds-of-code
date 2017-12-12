### Anagrams of string (with duplicates)

Use recursion.
For each letter in the given string, create all the partial anagrams for the rest of its letters.
Use `map()` to combine the letter with each partial anagram, then `reduce()` to combine all anagrams in one array.
Base cases are for string `length` equal to `2` or `1`.

```js
const anagrams = str => {
  if(str.length <= 2)  return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce( (acc, letter, index) => {
    anagrams(str.slice(0, index) + str.slice(index + 1)).map( value => acc.push(letter + value) );
    return acc;
  }, []);
}
// anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
```
