---
title: formatStringOfNames
tags: array,intermediate,string,formatting
---

Given: an array containing hashes of names

Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.
 
 - Will only contain A-Z, a-z, '-' and '.'.
 - map only names in new array(names).
 - remove last element of names a assign to a variable.
 - if array has values return name joins with the last value else return last name.
```js

function formatStringOfNames(names) {
  let namesFormat = names.map(p => p.name)
  let lastName = namesFormat.pop()
  return namesFormat.length ? namesFormat.join(", ") + " & " + lastName : lastName || ""
}
```

```js
formatStringOfNames([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
// returns 'Bart, Lisa & Maggie'

formatStringOfNames([ {name: 'Bart'}, {name: 'Lisa'} ])
// returns 'Bart & Lisa'

formatStringOfNames([ {name: 'Bart'} ])
// returns 'Bart'

list([])
// returns ''
```