---
title: Creating accordion-style content without JavaScript
shortTitle: Details accordion content
language: html
tags: [content,interactivity]
cover: flower-portrait-10
excerpt: Did you know you don't need JavaScript to create accordion-style content? Here's how to do it with the details element.
listed: true
dateModified: 2025-05-22
---

The `<details>` element is a great way to create interactive content without needing JavaScript. In its simplest form, it allows you to create **collapsible sections of content**.

```html
<details>
  <summary>Click to expand</summary>
  <p>This is the content that will be shown when the details are expanded.</p>
</details>
```

<baseline-support featureId="details">
</baseline-support>

But what if I told you that you can do so much more with it? The logical next thing that comes to mind is an **accordion-style component**. You know, the kind of component that allows you to expand one section while collapsing the others? Well, it turns out you can do that too!

All you really need for this to work is for all `<details>` elements to share the same `name` attribute. This way, when you click on one of them, the others will automatically collapse. This attribute essentially groups the `<details>` elements together, allowing only one to be open at a time.

https://codepen.io/chalarangelo/pen/myyJYrW

```html
<details>
  <summary>Section 1</summary>
  <p>This is the content of section 1.</p>
</details>

<details>
  <summary>Section 2</summary>
  <p>This is the content of section 2.</p>
</details>
```

And that's pretty much all you need. You can style the `<details>` and `<summary>` elements to your liking, and you can even add icons or animations to make it look more polished. The best part is that it works in all modern browsers, so you don't have to worry about compatibility issues.
