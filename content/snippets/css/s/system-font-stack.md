---
title: Define a system font stack in CSS
shortTitle: System font stack
language: css
tags: [visual]
cover: lavender-shelf
excerpt: Learn how to leverage the native fonts of the operating system to get close to a native app feel.
listed: true
dateModified: 2024-03-01
---

Using a **font stack** refers to the practice of defining a list of fonts in the `font-family` property of a CSS rule. The browser looks for each successive font, preferring the first one if possible, and falls back to the next if it cannot find the font (on the system or defined in CSS).

A **system font stack** is a list of fonts that are used to get close to a native app feel. It uses the native font of the operating system to render text, which is a great way to make your web app feel more native.

## Using `system-ui`

`system-ui` is a recently introduced generic font family that uses the **system's default UI font**. It's a great way to get a native feel across all operating systems and its browser support is quite impressive. Using `system-ui` with a **fallback** to `sans-serif` is the recommended way to define a system font stack.

```css
.system-font-stack {
  font-family: system-ui, sans-serif;
}
```

> [!NOTE]
>
> Technically speaking, `system-ui` is still in **working draft status** and not yet a standard. However, it's already supported by all major browsers and doesn't seem like it's going anywhere.

## Using a custom system font stack

If you want to **support older browsers** or are reluctant to use `system-ui`, you can simply build your own system font stack. In order to do so, you'll have to include the system fonts for all **major operating systems**, as well as a fallback. Here's a quick rundown of the most common system fonts:

- `-apple-system` is San Francisco, used on iOS and macOS (not Chrome however).
- `BlinkMacSystemFont` is San Francisco, used on macOS Chrome.
- `'Segoe UI'` is used on Windows 10.
- `Roboto` is used on Android.
- `Oxygen-Sans` is used on Linux with KDE.
- `Ubuntu` is used on Ubuntu (all variants).
- `Cantarell` is used on Linux with GNOME Shell.
- `'Helvetica Neue'` and `Helvetica` is used on macOS 10.10 and below.
- `Arial` is a font widely supported by all operating systems.
- `sans-serif` is the fallback sans serif font if none of the other fonts are supported.

```html
<p class="system-font-stack">This text uses the system font.</p>
```

```css
.system-font-stack {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
}
```
