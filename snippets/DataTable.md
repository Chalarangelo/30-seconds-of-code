---
title: Data table
tags: components
cover: blog_images/armchair.jpg
firstSeen: 2018-11-29T11:13:59+02:00
lastUpdated: 2020-11-03T21:26:34+02:00
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
ReactDOM.render(<DataTable data={people} />, document.getElementById('root'));
```
