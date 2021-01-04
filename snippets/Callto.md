---
title: Callto
tags: components,beginner
unlisted: true
---

Renders a link formatted to call a phone number (`tel:` link).

- Use `phone` to create a `<a>` element with an appropriate `href` attribute.
- Render the link with `children` as its content.

```jsx
const Callto = ({ phone, children }) => {
  return <a href={`tel:${phone}`}>{children}</a>;
};
```

```jsx
ReactDOM.render(
  <Callto phone="+302101234567">Call me!</Callto>,
  document.getElementById('root')
);
```
