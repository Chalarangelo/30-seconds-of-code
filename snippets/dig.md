### dig

Return the value in a nested JSON object by the key.

Given the key name (or target), it will map through each key in the object and look for object type.
If value is an object, dig is called recusively until the first matching key/value is found.

```
const dig = (obj, target) => {
  return obj[target] ?
    obj[target] :
    Object.keys(obj).map(key => {
     if (typeof(obj[key]) === "object") {
        return dig(obj[key], target);
      }
    }).filter(defined=>defined)[0]
};
```

```
const data = {
  level1:{
    level2:{
      level3: "some data"
    }
  }
};

dig(data, 'level3'); // "some data"
dig(data, 'level4'); // undefined
```
