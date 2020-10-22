---
title: keyify
tags: array,object,string,advanced
---

Converts an object into a flat array of all keys

- Use `Object.keys()` to get all keys from the object
- If array, make recursive call with the index and `.` as prefix
- If object, make recursive call with `.` as prefix
- Otherwise, add the element to the result array

```js
const keyify = (obj, prefix = '') => {
    return Object.keys(obj).reduce((res, el) => {
        if( Array.isArray(obj[el]) ) {
            return [...res, ...obj[el].map((item, index) => {
                return keyify(item, prefix + el + '.' + index + '.')
            }).flat()]
        } else if( typeof obj[el] === 'object' && obj[el] !== null ) {
            return [...res, ...keyify(obj[el], prefix + el + '.')]
        } else {
            return [...res, prefix + el]
        }
    }, [])
}
```

```js
keyify({
    a: {
        b: 'value'
    },
    aa: {
        c: [
            {key_1: 'value'},
            {key_2: 'value'},
        ]
    }
}) // ["a.b", "aa.c.0.key_1", "aa.c.1.key_2"]
```
