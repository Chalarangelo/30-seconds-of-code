---
title: Can I validate an email address in JavaScript?
shortTitle: Email address validation
type: question
tags: javascript,string,regexp
expertise: advanced
author: chalarangelo
cover: blog_images/blank-card.jpg
excerpt: Email address validation can be much trickier than it sounds. Here's why and my advice on how to approach this problem.
firstSeen: 2022-10-05T05:00:00-04:00
---

One of the most frequent code snippet requests I get is about a function that can validate email addresses. While it sounds easy, I’ve been putting off writing about this topic for a while. The reason is that there are **no great solutions to this sort of problem**.

Theoretically, email addresses can be validated using a regular expression. After all, there are a couple of simple rules, such as the presence of the at (`@`) symbol and an appropriate domain, right? Yes, but there are tons of valid email address that don’t look exactly like that. In fact, there’s a whole standard, [RFC 2822](https://www.rfc-editor.org/rfc/rfc2822#section-3.4.1), that defines what email addresses can look like. Then, there’s the issue of what different mail servers will allow. Gmail, for example, will not allow underscores (`_`) or more than one period (`.`) in a row.

Additionally, even if you could validate an email address, there’s **no way of knowing if this address is in fact currently in use**. The only way to do so, is to send an email and check the response. This is why most websites and apps nowadays send you a confirmation email in the first place.

Finally, even if you used a regular expression that is compliant with RFC 2822, it wouldn’t be without issues. Understanding how it works or figuring out if it works correctly for each and every case would be pretty difficult. More importantly, though, it could be prone to **regular expression denial of service (ReDoS) attacks**, if implemented incorrectly.

By now, you should be starting to figure out why I’ve been hesitant to showcase a solution to the problem of email validation. While solutions do exist, the implications of each one must be considered carefully.

My suggestion would be to **check for basic structural elements** on the frontend, then **send a confirmation email** from your server to check that the email address is in use. It’s easy to implement and gets the job done. Going back to the original idea, here’s a simple function that checks for the most common syntax errors.

```js
const isEmailValid = address => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);

isEmailValid('abcd@site.com'); // true
isEmailValid('ab_c@site.com'); // true
isEmailValid('ab.c@site.com'); // true
isEmailValid('a@my.site.com'); // true
isEmailValid('ab c@site.com'); // false
isEmailValid('ab@c@site.com'); // false
isEmailValid('abcde@sitecom'); // false
isEmailValid('abcdesite.com'); // false
```

This regular expression is pretty short, yet it validates the following conditions:

- No whitespace characters anywhere in the email address
- Presence of a single at (`@`) character before the domain part
- At least one dot (`.`) character in the domain part
