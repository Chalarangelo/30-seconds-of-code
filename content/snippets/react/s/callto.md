---
title: Callable telephone link
type: snippet
language: react
tags: [components]
cover: rabbit-call
excerpt: Renders a link formatted to call a phone number (`tel:` link).
listed: false
dateModified: 2021-01-04
---

Renders a link formatted to call a phone number (`tel:` link).

- Use `phone` to create a `<a>` element with an appropriate `href` attribute.
- Render the link with `children` as its content.

```jsx
const Callto = ({ phone, children }) => {
  return <a href={`tel:${phone}`}>{children}</a>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Callto phone="+302101234567">Call me!</Callto>
);
```
