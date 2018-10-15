### MappedTable

Renders a table with rows dynamically created from an array of data.

Use the value of the `headers` prop to conditionally render a table with a header. Use `Array.prototype.map` to render every item in `data` as a `<tr>` element and give it a `key`. `data` can either be an array of objects with the `id` and `name` properties or an array of primitives. Omit the `headers` prop to render a `table` without headers.

```jsx
function MappedTable({ headers, data }) {
  return (
    <table>
      <thead>
        {headers && (
          <tr>
            {headers.map((h, i) => (
              <th key={i}>h</th>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {data.map((v, i) =>
          (
            <tr obj={v} key={v.id ? v.id : i}>
              <td>v.id</td>
              <td>v.name</td>
            </tr>
          );
        )}
      </tbody>
    </table>
  );
}
```

```jsx
const people = [{ id: 841, name: 'John' }, { id: 241, name: 'Jesse' }];
const headers = ['id', 'name'];
ReactDOM.render(
  <MappedTable data={people} headers={headers} />,
  document.getElementById('root')
);
```

<!-- tags: (array,functional) -->

<!-- expertise: (1) -->
