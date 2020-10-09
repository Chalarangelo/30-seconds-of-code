---
title: replaceAllInQuery
tags: DOM,element,replace,query,beginner
---

runs the replace function on all the results of the document query.

- use [document.querySelectorAll](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll) to select the elements.
- then runs the [queryResult.innerText.replaceAll](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/replaceAll) on all the results to replace by regex.
- finally assign it to the [queryResult.innerText](https://www.w3schools.com/jsref/prop_node_innertext.asp)
```js
const replaceAllInQuery = (query, toReplace, toReplaceWith) =>
  {
    document.querySelectorAll(query).forEach((queryResult) =>{
      queryResult.innerText = queryResult.innerText.replaceAll((toReplace), toReplaceWith);
    })
  }
```

```js
replaceAllInQuery('.test', "world", "hello"); // 'null', replaces all the words "world" by the word "hello" in the elements that has "test" class
```
