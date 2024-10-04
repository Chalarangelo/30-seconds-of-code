---
title: Email and callable telephone links
language: react
tags: [components]
cover: rabbit-call
excerpt: Render links formatted to send an email (`mailto:` link) or call a phone number (`tel:` link).
listed: true
dateModified: 2024-06-21
---

Contact links are just about one of the most ubiquitous elements on the web. They are used to provide a quick way for users to get in touch with you. The most traditional ones are email and phone links, both of which are natively supported by browsers.

## Email link

For the **email link**, you'll use a link (`<a>`) element with the `mailto:` scheme. This scheme allows you to create a link that, when clicked, will open the user's **default email client** with the recipient's email address already filled in. You can also pre-fill the `subject` and `body` of the email.

Then, you'll use the `encodeURIcomponent` function to safely encode the `subject` and `body` into the link URL. Finally, you'll render the link with `children` as its content.

```jsx
const Mailto = ({ email, subject = '', body = '', children }) => {
  let params = subject || body ? '?' : '';
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

  return <a href={`mailto:${email}${params}`}>{children}</a>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Mailto email="foo@bar.baz" subject="Hello & Welcome" body="Hello world!">
    Mail me!
  </Mailto>
);
```

## Callable telephone link

Similar to the email link, the **callable telephone link** uses a link (`<a>`) element with the `tel:` scheme. This scheme allows you to create a link that, when clicked, will open the user's **default phone app** with the recipient's phone number already filled in.

As this is a simple link, you only need to provide the `phone` number and render the link with `children` as its content.

```jsx
const Callto = ({ phone, children }) => {
  return <a href={`tel:${phone}`}>{children}</a>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Callto phone="+302101234567">Call me!</Callto>
);
```
