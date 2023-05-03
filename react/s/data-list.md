---
title: Data list
type: snippet
language: react
tags: [components]
cover: interior-14
dateModified: 2020-11-03T21:26:34+02:00
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
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <DataList data={names} />
    <DataList data={names} isOrdered />
  </>
);
```
