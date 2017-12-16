### JSON to date

Use `Date()`, to convert dates in JSON format to readable format (`dd/mm/yyyy`).

```js
const jsonToDate = arr => {
  const dt = new Date(parseInt(arr.toString().substr(6)));
  return `${ dt.getDate() }/${ dt.getMonth() + 1 }/${ dt.getFullYear() }`
};
// jsonToDate(/Date(1489525200000)/) -> "14/3/2017"
```
