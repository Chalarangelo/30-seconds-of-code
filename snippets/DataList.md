---
title: DataList
tags: components,beginner
---

Renders a list of elements from an array of primitives.

- Use the value of the `isOrdered` prop to conditionally render an `<ol>` or a `<ul>` list.
- Use `Array.prototype.map()` to render every item in `data` as a `<li>` element with an appropriate `key`.

```jsx
const DataList = ({ isOrdered = false, data }) => {
  const list = data.map((val, i) => <li key={`${i}_${val}`}>{val}</li>);
  return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>;
};
```

```jsx
const names = ['John', 'Paul', 'Mary'];
ReactDOM.render(<DataList data={names} />, document.getElementById('root'));
ReactDOM.render(
  <DataList data={names} isOrdered />,
  document.getElementById('root')
);
```
