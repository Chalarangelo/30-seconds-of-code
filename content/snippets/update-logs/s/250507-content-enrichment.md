---
title: Content enrichment
tags: [updatelog]
cover: paper-card
excerpt: I've been working on new content authoring tools behind the scenes and I'm excited to share them with you!
listed: false
dateModified: 2025-05-07
---

Hey there! <span class="wave">👋</span>

You may be wondering what I've been up to lately, unless you've been following the repository on GitHub, in which case you already know. It's a lot of work, mostly under the hood, but I'm really excited to share it with you!

## Rich content authoring

One of the things that I haven't really been able to do in the past is to create **truly rich content**. So, as usual, I decided to make my own tools to fit my needs.

After a lot of fiddling around, I managed to create a system around Web Components, allowing me to **progressively enhance content** with interactive elements, such as **code tabs**, **LaTeX expressions**, **Baseline support** and **interactive visualizations**. It's not much yet, but I'm hoping to grow this library of components over time to fit the needs of the content I write.

## Code highlighting

Up until a while ago, I was using **Prism** for code highlighting, but I found it to be a little restrictive in some aspects, while its highlighting wasn't perfect in some cases.

Most websites nowadays use **Shiki**, so, naturally, I gave it a try and I was pleasantly surprised. It's a fair bit slower, but the output quality is much better, while I can now support new functionality that wasn't possible before, such as **line highlighting** or **bracket colorization**.

I kept Prism around for the development environment to provide a frictionless experience when hot reloading during editing, but other than that you should never really see Prism in the current setup. It may make a comeback in the future, if I ever get around to adding interactive code editing, but that may be a while.

## Article embedding

On top of these changes, I worked out a way to embed article previews inside other articles. These appear similar to article previews in listings, so they should be familiar. I also made sure to make them as least intrusive as possible, so they should not be too distracting.

Their purpose is to provide a way to interlink articles and provide a better reading experience. They are tagged with keyword-like prompts, such as **Quick refresher**, **Further reading**, or **You might also like**, depending on the context.

I'm working to retroactively add these to older articles, but it takes a long time, so you may not see them all over the place just yet.

---

Quite a lot of work has gone into these changes, but there may be the occasional bug here and there. If you notice anything, please let me know.

Until next time! 🍻
