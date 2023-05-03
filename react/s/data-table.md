---
title: Data table
type: snippet
language: react
tags: [components]
cover: armchair
dateModified: 2020-11-03T21:26:34+02:00
---

Renders a table with rows dynamically created from an array of primitives.

- Render a `<table>` element with two columns (`ID` and `Value`).
- Use `Array.prototype.map()` to render every item in `data` as a `<tr>` element with an appropriate `key`.

```jsx
const DataTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((val, i) => (
          <tr key={`${i}_${val}`}>
            <td>{i}</td>
            <td>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

```jsx
const people = ['John', 'Jesse'];
ReactDOM.createRoot(document.getElementById('root')).render(
  <DataTable data={people} />
);
```
