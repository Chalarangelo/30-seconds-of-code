---
title: Recommended social tags for HTML head
shortTitle: HTML social tags template
type: story
tags: [webdev,html,browser]
author: chalarangelo
cover: boutique-home-office-2
excerpt: Ensure your HTML documents can be shared on social media by including these lines in your `<head>` element.
dateModified: 2023-01-22T05:00:00-04:00
---

Social media play an important role to any content's success. To ensure your content is properly shared on social media, you should include some essential tags in your `<head>` element:

```html
<head>
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description. No longer than 155 characters.">
  <meta property="og:image" content="https://samplesite.com/image.jpg">
  <meta property="og:site_name" content="Sample Site">
  <meta property="og:url" content="https://samplesite.com/page.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Page description. No longer than 155 characters.">
  <meta name="twitter:image" content="https://samplesite.com/image.jpg">
  <meta name="twitter:site" content="@samplesite">
</head>
```

The above snippet contains OpenGraph and Twitter tags. **OpenGraph tags** are used by Facebook and other social media platforms to display a preview of the page when it's shared. Similarly, Twitter uses **Twitter tags** for the same information. Here's a breakdown of each one:

- The `og:title` and `twitter:title` meta tags are used to display the page's title in the preview.
- The `og:description` and `twitter:description` meta tags are used to display a short description of the page in the preview.
- The `og:image` and `twitter:image` meta tags are used to display an image in the preview.
- The `og:site_name` meta tag is used to display the name of the site in the preview.
- The `og:url` meta tag is used to display the URL of the page in the preview.
- The `twitter:card` meta tag is used to display a preview of the page when it's shared. Available values are `summary`, `summary_large_image`, `app` and `player`.
- The `twitter:site` meta tag is used to display the Twitter handle of the site in the preview.
