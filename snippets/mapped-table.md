### MappedTable

Generate a table with dynamic rows based on passed array of data. Optionally include headers.

Conditionaly check weather to include table headers or not. Use `Array.prototype.map` to map over array of data and return `<tr>` for each entry.

```jsx
function MappedTable(props) {
  return (
    <tbody>
      {props.headers ? return(<tr>{props.headers.map((h, i)=> (<th key={i}>h</th>))}</tr>) : return null}
      {props.data.map((v, i) => {
        return (
          <tr obj={v} key={v.id ? v.id : i}>
            <td>v.name</td>
          </tr>
        );
      })}
    </tbody>
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

<!-- tags: (functional,array) -->

<!-- expertise: (0) -->
