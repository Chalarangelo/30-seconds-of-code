---
title: CSS Print Stylesheet
language: css
tags: [visual]
cover: cozy-desk-setup
excerpt: A short opinionated print stylesheet to make your websites look great on paper.
listed: true
dateModified: 2023-06-11
---

While it's not that often we physically print content from the web, **print stylesheets shouldn't be overlooked**. They can be used to make sure that the content of your website is presented in a legible and print-friendly manner. Here's a simple, opinionated print stylesheet that you can use as a base for your own:

```css
@media print {
  @page {
    size: A4;
  }

  body {
    margin: 0;
    padding: 0;
  }

  body, p, h1, h2, h3, h4, h5, h6, li {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12pt;
    font-weight: normal;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: 24pt;
  }

  h2 {
    font-size: 18pt;
  }

  h3 {
    font-size: 14pt;
  }

  a:any-link {
    color: #0000FF;
    text-decoration: none;
  }

  a:any-link::after {
    content: " [" attr(href) "] ";
  }

  img {
    width: 100%;
  }

  header, footer, nav, aside, form, iframe, script {
    display: none;
  }
}
```

- `@media print` - The print media query is used to apply styles when the page is printed.
- `@page`:
  - `size` - Specify the page size.
- `body`:
  - `margin` - Remove the default margin.
  - `padding` - Remove the default padding.
- `body, p, h1, h2, h3, h4, h5, h6, li`:
  - `font-family` - Use print-friendly fonts.
  - `font-size` - Use a legible font size.
  - `font-weight` - Reset the font weight.
- `h1, h2, h3, h4, h5, h6`:
  - `font-weight` - Make headings bold.
  - `margin-bottom` - Add some space between headings and the content below them.
- `h1`-`h3`:
  - `font-size` - Use a larger font size for headings.
- `a:any-link`:
  - `color` - Use a print-friendly color for links.
  - `text-decoration` - Remove the underline from links.
- `a:any-link::after`:
  - `content` - Add the link URL after the link.
- `img`:
  - `width` - Make images fill the page width.
- `header, footer, nav, aside, form, iframe, script`:
  - `display` - Remove unnecessary elements from the page.
