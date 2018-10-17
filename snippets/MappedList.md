### MappedList

Renders a list of elements from an array of data.

Use the value of the `isOrderedList` prop to conditionally render a `<ol>` or `<ul>` list.
Use `Array.prototype.map` to render every item in `data` as a `<li>` element and give it a `key`.
`data` can either be an array of objects with the `id` and `value` properties or an array of primitives.
Omit the `isOrderedList` prop to render a `<ul>` list by default.

```jsx
function MappedList({ isOrderedList, data}) {
  const list = data.map((v, i) => (
    <li key={v.id ? v.id : i}>{v.value ? v.value : v}</li>
  ));
  return isOrderedList ? <ol>{list}</ol> : <ul>{list}</ul>;
}
```

```jsx
const names = ['John', 'Paul', 'Mary'];
ReactDOM.render(<MappedList data={names}/>, document.getElementById('root'));
const users = [ { id: 8, value: 'john' }, { id: 3, value: 'paul' }];
ReactDOM.render(
  <MappedList data={users} isOrderedList />,
  document.getElementById('root')
);
```

<!-- tags: array,functional -->

<!-- expertise: 1 -->
