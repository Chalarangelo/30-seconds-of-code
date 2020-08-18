---
title: What is the difference between cookies, local storage, and session storage?
type: question
tags: javascript,browser,webdev
authors: chalarangelo
cover: blog_images/three-vases.jpg
excerpt: Learn the difference between cookies, local storage and session storage and start using the correct option for your needs.
---

**Cookies**

Cookies store small amounts of data that has to be sent back to the server with subsequent requests and their expiration can be set from either server or client. They are primarily used for server-side reading.

- Capacity: 4KB
- Accessible from: Any window
- Expiration: Manually set
- Storage location: Browser and server
- Sent with requests: Yes
- Blockable by users: Yes
- Editable by users: Yes

**Local storage**

Local storage stores a larger amount of data on the client's computer in a key-value pair format and has no expiration date. Data is never transferred to the server and is accesible via JavaScript and HTML5.

- Capacity: 10MB
- Accessible from: Any window
- Expiration: Never
- Storage location: Browser only
- Sent with requests: No
- Blockable by users: Yes
- Editable by users: Yes

**Session storage**

Session storage stores a larger amount of data on the client's computer only for the current session, expiring the data on tab close. Data is never transferred to the server and is accessible client-side from the same tab.

- Capacity: 5MB
- Accessible from: Same tab
- Expiration: On tab close
- Storage location: Browser only
- Sent with requests: No
- Blockable by users: Yes
- Editable by users: Yes

![Cookies vs localStorage vs sessionStorage](./blog_images/cookie-local-storage-session.png)

**Image credit:** [Jonathan Pielmayer](https://unsplash.com/@jonathanpielmayer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
