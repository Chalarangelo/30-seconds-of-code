### System font stack

Uses the native font of the operating system to get close to a native app feel.

#### HTML

```html
<p class="system-font-stack">This text uses the system font.</p>
```

#### CSS

```css
.system-font-stack {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```

#### Demo

#### Explanation

The browser looks for each successive font, preferring the first one if possible, and
falls back to the next if it cannot find the font (on the system or defined in CSS).

1. `-apple-system` is San Francisco, used on iOS and macOS (not Chrome however)
2. `BlinkMacSystemFont` is San Francisco, used on macOS Chrome
3. `Segoe UI` is used on Windows 10
4. `Roboto` is used on Android
5. `Oxygen-Sans` is used on Linux with KDE
6. `Ubuntu` is used on Ubuntu (all variants)
7. `Cantarell` is used on Linux with GNOME Shell
8. `"Helvetica Neue"` and `Helvetica` is used on macOS 10.10 and below (wrapped in quotes because it has a space)
9. `Arial` is a font widely supported by all operating systems
10. `sans-serif` is the fallback sans-serif font if none of the other fonts are supported

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

<!-- tags: visual -->
