---
title: Progressive enhancement with Web Components
shortTitle: Progressive enhancement with Web Components
language: javascript
tags: [browser]
cover: san-francisco-skyline
excerpt: Dive into Web Components with me and learn how I used them to create modular interactive components to progressively enhance my website.
listed: true
dateModified: 2025-05-03
---

In recent days, I've been sinking a lot of time on this website, as some of you may be well aware. One of the fundamental challenges I set out to solve was **interactivity** in articles authored in Markdown. I know MDX exists, but loading React seemed like overkill to me, especially given how little interactivity I actually needed.

I also really wanted to double down on **progressive enhancement**, something that often gets overlooked. At the core of my philosophy is the belief that the web should be accessible to everyone, regardless of their device, browser capabilities, or otherwise. So, I set out to find a solution to my particular problem and, by oh boy, did I find one!

> [!TIP]
>
> You may catch a glimpse of the solution implementation in the actual custom components I have built and use on this page. Feel free to use the browser's Inspector to check them out!

## Goals & limitations

For a hobby project, which is what this website ultimately is, I had quite a lot of limitations and goals to meet. Let's break them down.

### Authoring in Markdown

First and foremost, I like the experience of **writing Markdown in VSCode**, so I didn't want any fancy tools or stacks of components to build something plain and simple. I wanted to sprinkle interactivity as part of my regular authoring process, where I could more or less wrap something in a few lines of markup and have it become interactive in the browser. For example:

```md {3,11}
This is some content I am writing.

<InteractiveContent>

I can write **regular** Markdown in here.

| I can also write tables |
| --- |
| Which are a huge pain to write in HTML |

</InteractiveContent>

And I can keep writing my content here.
```

### Progressive enhancement

The second and most important goal was to ensure that the content I created would be **accessible to everyone**, everywhere, in every format. This technically meant making sure that content would be supported in the following scenarios:

1. **GitHub Markdown previews** should be readable, even if some functionality and styling would be lost.
2. The website should be readable in **browsers that do not support JavaScript**, or where it is disabled, or if there's any sort of error to prevent the component from becoming interactive.
3. The website should be fully readable and interactive in modern **browsers with JavaScript enabled**.

For the first two points, I had to make sure that the custom element would be **minimally invasive**. This meant that the content inside this interactive wrapper should be **proper Markdown/HTML content** and that it would translate well in any scenario for the user, regardless of their environment.

### No dependencies

It's not that I dislike any framework in particular, but I think that **the fewer the dependencies the better**. Naturally, I wanted to steer away from the likes of MDX and React, due to that, and I wanted to use a solution that was dependency-free.

I recognized, however, that this way I wouldn't be able to tap into potentially premade components that are readily available around the web. I was very keen on using the [Baseline status component](https://web.dev/blog/show-baseline-status), for example.

<figure>

![KaTeX on Bundlephobia](./illustrations/katex-bundlephobia.svg)

<figcaption>KaTeX on Bundlephobia</figcaption>
</figure>

I also wanted to support [LaTeX](https://en.wikipedia.org/wiki/LaTeX) for math equations, but didn't want to load MathJax or KaTeX and prerendering the result was slow. Thus, I needed a way to load these components only when they were on the page, which brings me to my next point.

### Modularity

**Modularity** was another major concern. As I explore new topics, I may end up with dozens of interactive components, bogging down the page if loaded all at once. This would be especially true for components that were inherently complex and required third-party libraries that I couldn't do without (e.g. KaTeX).

This meant that I had to use **modular JavaScript** to load components only when needed, and I had to make sure that the components were **self-contained** and could be **loaded independently** of each other.

## The solution

At this point, an idea had started to form right then and there: Web Components would fit the bill quite nicely. In fact, combining them with JavaScript modules would allow me to achieve all of the aforementioned goals.

### Web Components

<baseline-support featureId="autonomous-custom-elements">
</baseline-support>

Much to my delight, [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) are **valid HTML markup**, meaning that if your Markdown environment supports HTML, they're also supported. This would translate well into all of the environments I wanted to support:

- **Markdown** authoring would work and I would get the correct highlighting in VSCode.
- **GitHub** would render the content correctly, as it would be valid HTML, but treat the custom element as a `div` element, meaning that the content inside would be rendered as regular HTML.
- **Browsers that do not support JavaScript** would render the content inside the custom element as regular HTML and treat the custom element as a `div` element, meaning that the content inside would be accessible, but not interactive.
- **Browsers that support JavaScript** would load the custom element and make it interactive, providing the best experience for the user.

<code-tabs>

```md title="Markdown with HTML" {3,13}
This is some content I am writing.

<interactive-component>

I can write **regular** Markdown in here.


| I can also write tables |
| --- |
| Which are a huge pain to write in HTML |


</interactive-component>

And I can keep writing my content here.
```

```html title="GitHub Preview" {3,13}
<p>This is some content I am writing.</p>

<div>
  <p>I can write <strong>regular</strong> Markdown in here.</p>
  <table>
    <thead>
      <tr><th>I can also write tables</th></tr>
    </thead>
    <tbody>
      <tr><td>Which are a huge pain to write in HTML</td></tr>
    </tbody>
  </table>
</div>

<p>And I can keep writing my content here.</p>
```

```html title="Browser" {3,13}
<p>This is some content I am writing.</p>

<interactive-component>
  <p>I can write <strong>regular</strong> Markdown in here.</p>
  <table>
    <thead>
      <tr><th>I can also write tables</th></tr>
    </thead>
    <tbody>
      <tr><td>Which are a huge pain to write in HTML</td></tr>
    </tbody>
  </table>
</interactive-component>

<p>And I can keep writing my content here.</p>
```

</code-tabs>

### JavaScript modules

<baseline-support featureId="js-modules">
</baseline-support>

Having found a way to author interactive content in Markdown, I now needed a way to actually **make the content interactive** for the user, while maintaining my goals of modularity and avoiding dependencies. This is where [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) came in. By using the `type="module"` attribute on the script tag, I could load the custom element only when needed.

<baseline-support featureId="import-assertions">
</baseline-support>

I could also combine this with [import attributes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with) to load any styles I needed alongside the JavaScript. If you squint really hard, you may see how these three things can create self-contained components, but let's break it down a little more.

A very simple example of this would look like this:

```html ins={3}
<p>This is some content I am writing.</p>

<script type="module" src="/components/interactive-component.mjs"></script>

<interactive-component>
  <p>I can write <strong>regular</strong> Markdown in here, and it will be rendered as such.</p>

  <table>
    <thead>
      <tr><th>I can also write tables</th></tr>
    </thead>
    <tbody>
      <tr><td>Which are a huge pain to write in HTML</td></tr>
    </tbody>
  </table>
</interactive-component>

<p>And I can keep writing my content here.</p>
```

```js title="components/interactive-component.mjs"
import styles from './interactive-components.css' with { type: 'css' };

class InteractiveComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Set up the component as needed...
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.adoptedStyleSheets.push(styles);
  customElements.define('interactive-component', InteractiveComponent);
});
```

What these two code snippets do is quite simple, really. The first snippet loads the JavaScript module. The magical things about modules is that they are **only executed once**. This means that if you have multiple instances of the same component on the page, the JavaScript will only be executed once, causing no issues, saving you a lot of headaches.

The second snippet is a little more involved. We define a Web Component and register it via `CustomElementRegistry.define()`, linking it to the `<interactive-component>` tag. The `connectedCallback()` method is called when the component is **added to the DOM**, and this is where we can set up the component as needed.

Finally, we use `Document.adoptedStyleSheets` to **add the styles to the document**, which is a new feature that allows us to use CSS modules in a very elegant way. This allows us to load the styles alongside the JavaScript and add them to the document, making them available to the component, too.

> [!IMPORTANT]
>
> Notice that I don't mention **Shadow DOM** and all that jazz in this post. That's because I don't use Shadow DOM at all in this setup.
>
> _Why?_ Because it would make things far too complex for my use case and it would make styling a hassle in some cases. Maybe it's my lack of familiarity with it, but I find this approach a lot easier to work with for the time being.

### Non-interactive first

The last piece of the puzzle was to **optimize for non-interactive scenarios** first. Writing content that can work without the interactive wrapper is good, but sometimes you need to know if the wrapper is interactive or not to style it correctly. This was especially true in some cases where I would replace the original markup with something slightly different.

Luckily, my setup allowed me to **inject an attribute** to all components before sending them to the browser. A simple `interactive="false"` would do the trick.

```html {5}
<p>This is some content I am writing.</p>

<script type="module" src="/components/interactive-component.mjs"></script>

<interactive-component interactive="false">
  <p>I can write <strong>regular</strong> Markdown in here, and it will be rendered as such.</p>

  <table>
    <thead>
      <tr><th>I can also write tables</th></tr>
    </thead>
    <tbody>
      <tr><td>Which are a huge pain to write in HTML</td></tr>
    </tbody>
  </table>
</interactive-component>

<p>And I can keep writing my content here.</p>
```

Then, I could use my JavaScript to update this attribute when the component was loaded and interactive. This would allow me to **style the component** differently depending on whether it was interactive or not.

```js title="components/interactive-component.mjs" {10}
import styles from './interactive-components.css' with { type: 'css' };

class InteractiveComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Set up the component as needed...
    this.setAttribute('interactive', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.adoptedStyleSheets.push(styles);
  customElements.define('interactive-component', InteractiveComponent);
});
```

Finally, I could select the custom element tag in CSS, just like any other element, and style it by checking for the `interactive` attribute. This would allow me to style the component differently depending on whether it was interactive or not.

```css
interactive-component[interactive="false"] {
  /* Styles for non-interactive components */
}

interactive-component[interactive="true"] {
  /* Styles for interactive components */
}
```

Ideally, I would **split those two styles**, so that the non-interactive styles would be loaded in the first place, and then the interactive styles would override them when loaded from the JavaScript module. That way, I could also avoid loading the interactive styles if the component was not interactive, saving me a few bytes in the process.

## Conclusion

This is a fairly simple example of how I managed to create a modular, dependency-free, progressive enhancement-friendly setup for my website. I hope it was enlightening about how such problems can be approached and solved, without resorting to overly complex solutions and third-party tooling, unless absolutely necessary.

See you in the next one! 🚀
