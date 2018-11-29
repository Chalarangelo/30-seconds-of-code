### DataList

Renders a list of elements from an array of primitives.

Use the value of the `isOrdered` prop to conditionally render a `<ol>` or `<ul>` list.
Use `Array.prototype.map` to render every item in `data` as a `<li>` element, give it a `key` produced from the concatenation of the its index and value.
Omit the `isOrdered` prop to render a `<ul>` list by default.

```jsx
function DataList({ isOrdered, data }) {
  const list = data.map((val, i) => (
    <li key={`${i}_${val}`}>{val}</li>
  ));
  return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>;
}
```

```jsx
const names = ['John', 'Paul', 'Mary'];
ReactDOM.render(<DataList data={names}/>, document.getElementById('root'));
ReactDOM.render(<DataList data={names} isOrdered/>, document.getElementById('root'));
```

<!-- tags: array,functional -->

<!-- expertise: 0 -->
