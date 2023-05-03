---
title: Recommended HTML head links
shortTitle: HTML head links template
type: story
tags: [webdev,html,browser]
author: chalarangelo
cover: boutique-home-office-4
excerpt: Make your HTML documents more SEO-friendly by including these lines in your `<head>` element.
dateModified: 2023-01-26T05:00:00-04:00
---

The `<head>` element of an HTML document is where you can include links to external resources such as CSS stylesheets and JavaScript files. Some `<link>` elements, however, are important for SEO and metadata purposes. Here's a list of a few really important ones I like to include:

```html
<head>
  <link rel="canonical" href="https://samplesite.com/page.html">
  <link rel="sitemap" type="application/xml" href="https://samplesite.com/sitemap.xml">
  <link rel="alternate" type="application/rss+xml" title="RSS" href="https://samplesite.com/rss.xml">
  <link rel="search" type="application/opensearchdescription+xml" title="Search" href="https://samplesite.com/search.xml">
</head>
```

- The `canonical` link element tells search engines which URL is the **canonical version** of the page. This helps prevent duplicate content issues and ensures that the correct page is indexed.
- The `sitemap` link element tells search engines where to find the **sitemap** for the website. Sitemaps are XML files that contain a list of all the pages on the website and their metadata. They are used by search engines to index the website and display it in search results.
- The `alternate` link element tells search engines where to find the **RSS feed** for the website. RSS feeds are XML files that contain a list of the most recent posts on the website. They are used by search engines to display the website's content in search results, as well as by RSS readers to display the website's content in a more convenient format.
- The `search` link element is used by browsers to display a **search box** in the browser's address bar. This allows users to search the website directly from the address bar, instead of having to navigate to the search page.
