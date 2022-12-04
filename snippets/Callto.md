---
title: Callable telephone link
tags: components
author: chalarangelo
unlisted: true
cover: blog_images/rabbit-call.jpg
firstSeen: 2020-10-04T00:07:37+03:00
lastUpdated: 2021-01-04T12:32:47+02:00
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
