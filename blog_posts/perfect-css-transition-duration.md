---
title: "Tip: The perfect duration for CSS transitions"
type: tip
tags: css,interactivity,visual,animation
authors: chalarangelo
cover: blog_images/perfect-timing.jpg
excerpt: Learn how to make your CSS transitions feel perfect when users interact with elements on the page with this simple tip.
---

We have all experienced a website interaction that feels sluggish or otherwise off on account of poor transition or animation duration and timing. However, there is a very simple "golden rule" to help you avoid this poor user experience, called **Doherty Threshold:**

> Productivity soars when a computer and its users interact at a pace (<400ms) that ensures that neither has to wait on the other.

The **magic number** of `0.4s` sounds like a very reasonable threshold, but take a look at any of your favorite websites and you'll notice that most `transition-duration` or `animation-duration` values are closer to `0.3s`. This might have something to do with our more recent expectation of what a fast interaction should feel like - after all the relevant research paper was published in 1982.
