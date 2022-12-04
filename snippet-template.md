---
title: Component Name
tags: components,state,effect
cover: blog_images/image.jpg
firstSeen: 2021-06-13T05:00:00-04:00
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
ReactDOM.render(<ComponentName />, document.getElementById('root'));
```
