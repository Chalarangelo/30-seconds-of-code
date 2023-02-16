---
title: Typographic scale basics
type: story
tags: css,webdev,typography
author: chalarangelo
cover: typography
excerpt: Typography might seem intimidating, but you can quickly and easily create a simple typographic scale with this basic technique.
firstSeen: 2020-08-18T19:27:17+03:00
lastUpdated: 2021-11-07T16:34:37+03:00
---

Building a typographic scale might seem hard. Yet it's not all that difficult, as long as you learn some basic techniques and principles.

The first steps are to pick a **font family**, a starting value for the **font size** and a ratio which will serve as the **scaling factor**. Common values for these variables are the Roboto font family, a great choice due to its many different font weights, a starting font size of `18px` and a ratio of `1.618`, which is the golden ratio.

Based on these values, the basis of our typographic scale is an element with `font-size: 18px` and `line-height: 1.618`. Notice that the ratio is also applied to the line height. This allows the text to breathe a little more and makes it easier to read, while creating a consistent vertical rhythm.

Next, we are going to apply our ratio to **scale the font up or down**, as necessary. For example, we can multiply once by `1.618` for a sub heading, twice for a normal heading and three times for a large heading (e.g. our website's name on the home page). Similarly, we can scale the font down by dividing by our ratio to make elements less visually important (e.g. footnotes).

While this gives us a pretty solid setup, some elements might not look properly emphasized. To deal with this, we can use **font weight** to increase or decrease the visual importance of some elements. We could, for example, make headings bolder to make them more important. We could also make footnotes slightly bold to emphasize them as their font size is very small and they might get overlooked.

Putting it all together, we should end up with a typographic scale that looks similar to this:

![Typographic scale example](./illustrations/typography-example.png)

```css
:root {
  --font-family: 'Roboto', sans-serif;
  --font-size: 18px;
  --font-weight: 300;
  --line-height: 1.618;
}

* {
  font-family: var(--font-family);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: var(--line-height);
}

.sub-heading {
  --font-size: 1.618rem;
  --font-weight: 600;
}

.heading {
  --font-size: 2.618rem;
  --font-weight: 400;
}

.large-heading {
  --font-size: 4.236rem;
  --font-weight: 500;
}

.footnote {
  --font-size: 0.618rem;
  --font-weight: 500;
}
```

The above example is a very simple starting point to build your own typographic scale, applying some simple principles to create a visual hierarchy that feels natural and works well. Feel free to tweak the starting values of the variables and experiment to get the best result for your designs.
