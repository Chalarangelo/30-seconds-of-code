### plurals

Returns the plural form of the provided `word`. Takes an optional argument of `dictionary` for irregular nouns.

```js
const plurals = (word,dictionary) => {
  let value = word.replace(/(s|x|z|ch|sh)$/g,'$1es').replace(/([aeiou])y$/g,'$1ys').replace(/([^aeiou])y$/,'$1ies')
  return  (typeof(dictionary) !== 'undefined' && dictionary[word] !== undefined) ? dictionary[word] :
     value === word ? word + 's' : value
}
```

```js
plurals("french fry")
plurals("day")
plurals("match")
plurals("people", {"people":"person"})
```
