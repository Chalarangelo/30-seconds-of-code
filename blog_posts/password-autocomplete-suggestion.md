---
title: "Tip: Adding autocomplete to a password field"
type: tip
tags: webdev
authors: chalarangelo
cover: blog_images/padlocks.jpg
excerpt: Use the HTML `autocomplete` attribute to create more secure and accessible password fields.
---

The HTML `autocomplete` attribute provides a wide variety of options for `<input>` fields. One of these is the `new-password` value, which can be used when the user is asked to create a new password (e.g. signup or reset password forms). This value ensures that the browser will not accidentally fill in an existing password, while it also allows the browser to suggest a secure password:

```html
<form action="signup" method="post">
  <input type="text" autocomplete="username">
  <input type="password" autocomplete="new-password">
  <input type="submit" value="Sign up">
</form>
```

Additionally, if the form contains a second password field asking the user to retype the newly created password, `autocomplete="new-password"` should be used for both of the password fields.
