### DataTable

Renders a table with rows dynamically created from an array of primitives.

Render a `<table>` element with two columns (`ID` and `Value`).
Use `Array.prototype.map` to render every item in `data` as a `<tr>` element, consisting of its index and value, give it a `key` produced from the concatenation of the two.

```jsx
function DataTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((val, i) =>
          <tr key={`${i}_${val}`}>
            <td>{i}</td>
            <td>{val}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
```

```jsx
const people = ['John', 'Jesse'];
ReactDOM.render(
  <DataTable data={people} />,
  document.getElementById('root')
);
```

<!-- tags: array,functional -->

<!-- expertise: 0 -->
