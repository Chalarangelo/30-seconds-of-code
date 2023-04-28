---
title: How do you review CSS code in Pull Requests?
shortTitle: CSS code reviews
type: story
tags: [css,webdev]
author: chalarangelo
cover: green-css
excerpt: Reviewing CSS code is a skill that takes time to master. Here are some tips from my personal experience to help you get started.
dateModified: 2023-05-21T05:00:00-04:00
---

Reviewing CSS code is a bit different than reviewing JavaScript code. In fact, many developers pay little attention to CSS, which can lead to problems down the line. Yet, many developers don't know how to review CSS code properly. In this post, we'll go over some of the things you should look for when reviewing CSS code in Pull Requests.

### Visual check

The very first step when reviewing CSS is to check if the **result looks right**. This might mean comparing the end result to a **design mockup** or checking if every interaction behaves according to the animation principles the team has agreed upon. **Responsiveness** is also a key factor to consider, so you should check if the page looks right on **different screen sizes**. The visual check is probably the most straightforward and important step, but unfortunately many developers stop there.

### Code style

Your team should have set up a **linter and formatter** for CSS and, if you haven't, you should do it as soon as possible. This will help you enforce a consistent code style and make the code easier to read and maintain. Provided that's the case, you should check for **conventions** that the linter can't automatically enforce. These often include naming conventions, proper documentation or the use of CSS custom properties in place of hard-coded values.

### Specificity

CSS selectors can be easily abused, causing headaches later down the line. Having clear conventions usually resolves a lot of issues, but things can slip through the cracks. Ensuring specificity is **as low as possible** and that selectors are **not too generic or overly complex** will help increase the code's maintainability.

### Leftovers

In an ideal scenario, the Pull Request author has a clear vision of the CSS they are writing and everything works out perfectly the first time. As you know, that's rarely the case, meaning experimentation and changes will happen during development. As the code changes, some **old code** might hang around without contributing anything to the page. One of the most common examples I've stumbled upon are flexbox-related properties for non-flexbox elements. These take a bit of time to spot, but they can be easily removed, saving you problems in the future.

### Performance

CSS performance is very often overlooked. Simple rules, deduplication and minimum overrides are some of the things that can be done to improve performance. Understandably, this sort of opportunity is **hard to spot**, but it's worth keeping an eye out for. That being said, don't go overboard with performance optimizations. If you're not sure if something is worth it, you should probably leave it as is.

