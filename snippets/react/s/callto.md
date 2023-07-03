---
title: Callable telephone link
type: snippet
language: react
tags: [components]
author: chalarangelo
unlisted: true
cover: rabbit-call
dateModified: 2021-01-04T12:32:47+02:00
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
ReactDOM.createRoot(document.getElementById('root')).render(
  <Callto phone="+302101234567">Call me!</Callto>
);
```
