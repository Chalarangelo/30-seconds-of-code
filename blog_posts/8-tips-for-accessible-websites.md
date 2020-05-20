---
title: 8 tips for accessible websites
type: list
tags: javascript,accessibility,webdev
authors: chalarangelo
cover: blog_images/a11y-cover.jpg
excerpt: Accessibility (a11y) can improve your website and attract new users. Learn how to get started with these 8 quick tips.
---

1. Use semantic HTML
HTML5 introduced a variety of new semantic HTML elements to help replace the much dreaded `<div>`, such as `<section>`, `<main>`, `<article>`, `<nav>` etc. When developing a website, you should understand what each part of your layout represents and try to use the appropriate element for it.

2. Use color correctly
[WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) specifies a minimum contrast ratio of `4.5:1` between text and background (viewable in Chrome Developer Tools), so you should always design with that in mind. Additionally, remember that color should be used meaningfully and sparsely to avoid confusion and information overload.

3. Caption images and video
Try to provide `alt` attributes for your `<img>` elements, so that screenreaders don't read the `src` attribute. You can use empty `alt` attributes for decorative images, which will inform screenreaders to skip them. Similarly, try to provide closed captions for any video content on your website.

4. Show and tell
Using icons and colors to indicate state, highlight or provide context is very common and provides a nice user experience. However, icons and colors alone might not be accessible for everyone, so make sure to support them with the appropriate text literals, catering to all of your users in the process.

5. Be consistent
Elements with similar meaning and/or functionality should look similar across your website. This is especially true for `<a>` and `<button>` elements and their respective states as users will have to be able to identify easily what elements they can interact with and anticipate their behavior.

6. Label your inputs
Any kind of `<input>` element should be labelled appropriately, using either a `<label>` wrapper, the `for` attribute or an `aria-label` attribute. Do not rely on `placeholder` attributes to convey meaning about your `<input>` elements as this will cause problems for users on screenreaders.

7. Design responsively
Responsiveness is often thought in terms of screen size or mobile vs desktop, but there are many different devices where a user could browse your website. Try catering to any and all of them by providing ways to navigate and use your application via mouse, keyboard, thumb or any combination of the three.

8. Organize your content
A website's layout should be easy to scan, understand and find the content that is relevant to the user. Good organization with clear sections and properly groupped content provides a better user experience for all users, regardless of device or accessibility needs.

**Image credit:** [AbsolutVision](https://unsplash.com/@freegraphictoday?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
