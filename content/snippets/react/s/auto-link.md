---
title: Automatic text linking in React
language: react
tags: [components,fragment,regexp]
cover: red-petals
excerpt: Ever wondered how to detect links in plaintext strings and make them clickable? A little ingenuity combined with React can get you there.
listed: true
dateModified: 2024-06-12
---

Have you ever wondered how to **detect links in plaintext strings** and make them clickable? A little ingenuity combined with React can get you there.

All you need to use is a very thorough **regular expression** to match URLs in the string. Then, you can render the string as plaintext, converting the URLs to clickable links.

To check the expression for matches, you'll need to use `String.prototype.split()` and `String.prototype.match()`. The regular expression should be able to match URLs **with or without a protocol prefix**. If the URL doesn't have a protocol prefix, you can add it before rendering the link.

Matched URLs can then be rendered as `<a>` elements, while the rest of the string can be rendered as plaintext.

> [!CAUTION]
>
> Beware of potential **security vulnerabilities** presented by generating links on the fly, especially if you are rendering **user-generated content**.

```jsx
const AutoLink = ({ text }) => {
  const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;

  return (
    <>
      {text.split(delimiter).map(word => {
        const match = word.match(delimiter);
        if (match) {
          const url = match[0];
          return (
            <a href={url.startsWith('http') ? url : `http://${url}`}>{url}</a>
          );
        }
        return word;
      })}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AutoLink text="foo bar baz http://example.org bar" />
);
```
