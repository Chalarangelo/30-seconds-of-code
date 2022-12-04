---
title: CSS Reset
type: story
tags: css,visual
author: chalarangelo
cover: blog_images/pink-flower-tree.jpg
excerpt: A short, opinionated CSS reset to make your websites look great everywhere.
firstSeen: 2022-10-16T05:00:00-04:00
---

Browsers nowadays are much better at presenting HTML in a consistent manner, making CSS resets of the past largely unnecessary. However, **default browser styles are not particularly great** in most cases, which is why there are tons of CSS resets out there. Drawing inspiration from some of them, here's my opinionated CSS reset, along with an explanation of why I chose to include each rule.

```css
html {
  max-width: 70ch;
  margin: auto;
  padding: 3em 1em;
  font-family: system-ui, 'Segoe UI', Roboto, Cantarell,
    'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.25em;
  line-height: 1.75;
}

body {
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin: 3em 0 1em;
}

p, ul, ol {
  margin-bottom: 2em;
  color: #1d1d1d;
}

small {
  font-size: 80%;
}

sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

pre, code, kbd {
  font-family: monospace, monospace;
  font-size: 1em;
}
```

- `html`:
  - `max-width` - Use `ch` units to set the maximum width in the middle of the optimal readable range (60-80 characters).
  - `margin` - Center content on the page.
  - `padding` - Prevent edge-to-edge text on smaller viewports.
  - `font-family` - Use the [system font stack](/css/s/system-font-stack) to ensure the best possible font rendering. `system-ui` is a new generic font family that replaces `-apple-system` and `BlinkMacSystemFont`.
  - `font-size` - Use a larger font size for better readability and to keep up with recent design trends.
  - `line-height` - Use a larger line height to increase visual clarity.
- `body`:
  `margin` - Remove the default margin in all browsers.
- `h1`-`h6`:
  - `margin` - Use larger margins for headers to improve visual hierarchy.
- `p`, `ul`, `ol`:
  - `margin-bottom` - Add spacing between textual elements.
  - `color` - Soften text color to improve readability.
- `small`:
  - `font-size` - Correct font size discrepancies between browsers.
- `sub`, `sup`:
  - `font-size` - Correct font size discrepancies between browsers.
  - `line-height` - Prevent elements from affecting line height.
  - `position` - Position elements relative to parent.
  - `vertical-align` - Align elements to the baseline.
  - `bottom`, `top` - Correctly position elements.
- `pre`, `code`, `kbd`:
  - `font-family` - Use monospace fonts for code elements.
  - `font-size` - Correct font size discrepancies between browsers.
