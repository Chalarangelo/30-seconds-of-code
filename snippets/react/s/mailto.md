---
title: Email link
type: snippet
language: react
tags: [components]
author: chalarangelo
cover: digital-nomad-4
dateModified: 2020-11-16T15:17:26+02:00
---

Renders a link formatted to send an email (`mailto:` link).

- Use the `email`, `subject` and `body` props to create a `<a>` element with an appropriate `href` attribute.
- Use `encodeURIcomponent` to safely encode the `subject` and `body` into the link URL.
- Render the link with `children` as its content.

```jsx
const Mailto = ({ email, subject = '', body = '', children }) => {
  let params = subject || body ? '?' : '';
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

  return <a href={`mailto:${email}${params}`}>{children}</a>;
};
```

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <Mailto email="foo@bar.baz" subject="Hello & Welcome" body="Hello world!">
    Mail me!
  </Mailto>
);
```
