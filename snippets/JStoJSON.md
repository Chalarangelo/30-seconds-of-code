---
title: JStoJSON
tags: javascript, convert, json
firstSeen: 2021-05-09T12:37:00-03:00
---

Converts a JS script to a JSON file. 

- That's usefull if you need to POST an JSON file that will be interpreted by some engine.
- That's an example that i use in my job, but anything inside the variable 'myFuncion' will be converted
- Someday i needed this to convert bigger functions(readable with the backticks) to JSON, that doesn't work with backticks and need a whole line to write the function

```js
const { stringify } = require("querystring");
const fs = require("fs");

const myFunction = { $js: `(arr, params)=> { 
  return arr.documents.reduce((arr, doc) => {
    let tags = params.tags.reduce((tags, tag) => {
          if (tag.entity_id === doc.id) tags.push(tag.tag_name);
          return tags;
        }, []);
    arr.push({
          ...doc.data,
          created_at: doc.created_at,
          tags: tags,
        })
    return arr
  }, [])
};` }

fs.writeFile('myFunction.json', JSON.stringify(myFunction), 'utf8',  function(err) {
    if (err) throw err;
    console.log('success');
    });
```

```js
node app // Runs the script
success  // Now your JS function is written inside a JSON file
```
