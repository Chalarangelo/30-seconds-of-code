---
title: System font stack
tags: visual,beginner
---

Uses the native font of the operating system to get close to a native app feel.

- Define a list of fonts using `font-family`.
- The browser looks for each successive font, preferring the first one if possible, and falls back to the next if it cannot find the font (on the system or defined in CSS).
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
