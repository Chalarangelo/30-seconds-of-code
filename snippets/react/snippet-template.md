---
title: Component Name
type: snippet
language: react
tags: [hooks]
cover: image
dateModified: 2021-06-13T05:00:00-04:00
---

Explain briefly what the snippet does.

- Explain briefly how the snippet works.
- Use bullet points for your snippet's explanation.
- Try to explain everything briefly but clearly.

```jsx
const ComponentName = props => {
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    setState(0);
  });
  return <div>{props}</div>;
}
```

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <ComponentName />
);
```
