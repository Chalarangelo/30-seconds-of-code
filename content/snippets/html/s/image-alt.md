---
title: What is the purpose of the alt attribute on images?
shortTitle: Image alt attribute
language: html
tags: [image,accessibility]
cover: sailing-alone
excerpt: Learn how to correctly use the `alt` attribute on images in HTML.
listed: true
dateModified: 2023-06-25
---

The `alt` attribute provides **alternative information** for an image if a user cannot view it. This can be due to connectivity issues, browser limitations, HTTP errors, or if the user is using a screen reader. Not providing an `alt` attribute will result in a poor user experience for those who cannot view the image.

```html
<img src="image.jpg" alt="Alternative text">
```

## How to write good alt text

The `alt` attribute should be used to describe the image in a way that makes sense to **someone who cannot see it**. Descriptions must be accurate and concise. Some screen readers are known to cut off descriptions after **125 characters**, so it is best to keep descriptions short.

Let's look at an example. Imagine that you want to describe an image of a boat sailing on the ocean. You could use the following `alt` attribute:

```html
<img src="boat.jpg" alt="A boat sailing on the ocean">
```

In this example, we've tried to describe the image as if we were describing to someone over the phone. Notice how we didn't use the word "picture" or "image" in the description. Additionally, we didn't simply say "boat" because that doesn't provide enough context.

## What if the image is purely decorative?

If an image is **purely decorative**, then it is best to leave the `alt` attribute **empty**. This will tell screen readers to skip over the image.

```html
<img src="decorative.jpg" alt="">
```

Notice in this example that we still included the `alt` attribute, but we left it empty. This is different from not including the `alt` attribute at all. If you don't include the `alt` attribute, then screen readers will read the image's file name instead.
