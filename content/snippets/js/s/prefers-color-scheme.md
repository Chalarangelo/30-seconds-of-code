---
title: Detect user color scheme preference in JavaScript
language: javascript
tags: [browser]
cover: dark-mode
excerpt: Use a media query to check if the user prefers a light or dark color scheme.
listed: true
dateModified: 2023-11-05
---

The recently introduced `prefers-color-scheme` media query allows us to check if the **user prefers a light or dark color scheme**. This can be a useful tool when implementing a dark mode for your website or web application.

## Check if user prefers a dark color scheme

Combining the media query with the `Window.matchMedia()` method allows us to check if the user has selected a dark color scheme (`'dark'`) in their operating system settings.

```js
const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;
```

## Check if user prefers a light color scheme

The same technique can be used for checking if the user prefers a light color scheme. Bear in mind, however, that `'light'` is the **default value** for the `prefers-color-scheme` media query. This means that it might also mean that the user has not expressed a preference.

```js
const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;
```
