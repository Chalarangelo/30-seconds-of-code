---
title: 'Tip: Protect your users from malicious websites when using target="_blank"'
type: tip
tags: javascript,browser,security
authors: chalarangelo
cover: blog_images/laptop-with-code.jpg
excerpt: Opening a link in a new tab comes with a security vulnerability that you may not be aware of. Protect your users with this simple trick.
---

Oftentimes, when linking to an external resource from our websites, we use `target="_blank"` to open the linked page in a new tab or window. But there is a security risk we should be aware of. The new tab gains limited access to the linking page (i.e. our website) via `window.opener`, which it can then use to alter the linking page's URL via `window.opener.location` (this is known as tabnabbing).

This might be a problem if the external resource is not trustworthy, might have been hacked, the domain has changed owners over the years etc. There is no guarantee that a third-party resource, no matter how trustworthy, can be actually trusted with our users' security and we, as developers, should always be aware of this risk.

```html
<!-- Bad: susceptible to tabnabbing -->
<a href="https://externalresource.com/some-page" target="_blank">
  External resource
</a>

<!-- Good: new tab cannot cause problems  -->
<a
  href="https://externalresource.com/some-page"
  target="_blank"
  rel="noopener noreferrer"
>
  External resource
</a>
```

In order to prevent a link that is opened in a new tab from causing any trouble, we should always add the `rel="noopener noreferrer"` attribute to all of our `target="_blank"` links.

**Image credit:** [James Harrison](https://unsplash.com/@jstrippa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
