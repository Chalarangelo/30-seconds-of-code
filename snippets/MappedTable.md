---
title: MappedTable
tags: components,array,object,intermediate
---

Renders a table with rows dynamically created from an array of objects and a list of property names.

- Use `Object.keys()`, `Array.prototype.filter()`, `Array.prototype.includes()` and `Array.prototype.reduce()` to produce a `filteredData` array, containing all objects with the keys specified in `propertyNames`.
- Render a `<table>` element with a set of columns equal to the amount of values in `propertyNames`.
- Use `Array.prototype.map()` to render each value in the `propertyNames` array as a `<th>` element.
- Use `Array.prototype.map()` to render each object in the `filteredData` array as a `<tr>` element, containing a `<td>` for each key in the object.

_This component does not work with nested objects and will break if there are nested objects inside any of the properties specified in `propertyNames`_

```jsx
const MappedTable = ({ data, propertyNames }) => {
  let filteredData = data.map(v =>
    Object.keys(v)
      .filter(k => propertyNames.includes(k))
      .reduce((acc, key) => ((acc[key] = v[key]), acc), {})
  );
  return (
    <table>
      <thead>
        <tr>
          {propertyNames.map(val => (
            <th key={`h_${val}`}>{val}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((val, i) => (
          <tr key={`i_${i}`}>
            {propertyNames.map(p => (
              <td key={`i_${i}_${p}`}>{val[p]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

```jsx
const people = [
  { name: 'John', surname: 'Smith', age: 42 },
  { name: 'Adam', surname: 'Smith', gender: 'male' }
];
const propertyNames = ['name', 'surname', 'age'];
ReactDOM.render(
  <MappedTable data={people} propertyNames={propertyNames} />,
  document.getElementById('root')
);
```
