---
title: removeEmpty
tags: object,recursion,intermediate
---

Return neat and clean Object, Remove all fields and  nested fields that hold unwanted values

Use `recursion` to find all un-used nested fields,
Use `Object.keys` to get all keys,
Use `typeof` to check object is nested or not,
Use `Array.isArray` to check field value is array or not

```js
const removeNestedEmpty = (initialObj) => {
  const obj = initialObj
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === 0 || obj[key] === '') delete obj[key]
    else if (Array.isArray(obj[key]) && obj[key].length === 0) delete obj[key]
    else if (Object.keys(obj[key]).length === 0 && obj[key].constructor === Object) delete obj[key]
    else if (obj[key] && typeof obj[key] === 'object') removeNestedEmpty(obj[key])
  })
  return obj
}
const removeEmpty = (obj) => {
  return removeNestedEmpty(removeNestedEmpty(obj))
}
```

```js
const person = {
  name: { lastName: "John", firstName: "Doe", middleName: "" },
  address: { streetNo: null, city: "", state: "foo" },
  family: [],
  married: 0,
  hobbies: [
    { name: "", time: null },
    { name: "Music", time: [] },
  ],
};

const part = {
    name:"foo",
    partNumber:'',
    values:[],
    owner:{
        name:'john',
        email:"github.com",
        address:null
    },
    presetValues:{}
}
removeEmpty(person); /*{
                          name: { lastName: 'John', firstName: 'Doe' },
                          address: { state: 'foo' },
                          hobbies: [ { name: 'Games' }, { name: 'Music' } ]
                        }
                     */

removeEmpty(part) // { name: 'foo', owner: { name: 'john', email: 'github.com' } }
```
