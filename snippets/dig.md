### dig

Return the value in a nested JSON object by the key.

Given the key name (or target), it will loop through each key/value in the object and look for object type.
If value is an object, dig is called recusively until the first matching key/value is found.

```
const dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object
        .values(obj)
        .reduce((acc, val) => {
          if (acc !== undefined) return acc;
          if (typeof val === 'object') {
            const v = dig(val, target);
            return v === undefined ? undefined : v;
          }
        }, undefined);
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
