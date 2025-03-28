---
title: Quality of life improvements
tags: [updatelog]
cover: workspace-with-speaker
excerpt: "New search, hotkeys, and more! Also: a clarification on community contributions."
listed: false
dateModified: 2025-04-04
---

Hello there! <span class="wave">👋</span>

These past few weeks I've been deep in the weeds of the codebase, working on some **quality of life improvements** that I think you'll really enjoy. Let's take a look at what's new and also discuss a few things that have been on my mind lately.

## New search

The previous search was an arbitrary mess of an implementation, and I was never really happy with it. I'm committed to building things on my own, but I also want things to be done right. The previous implementation was quite buggy at places and very bad at finding matches, as it only used a simple stemmer and substring matching. So I decided to take a step back and rework the entire thing from the ground up.

The **new search** is still homegrown, but it uses **natural language processing** (NLP) techniques to find matches. On top of stemming, I added a better stop words list, some better filtering, a document indexing system, TF-IDF scoring and an inverse index to make the search fast and effective.

The main issue I had with this setup is the **size of the search index** that is sent to the browser. Luckily, after one very long sleepless night and a lot of trial and error, I figured out a solution to this optimization problem. The new search index is about **3x** the size of the previous one, but the search results are much better than before and the speed is comparable, if not better.

This new setup also allows me to work on more complex ideas, such as Latent Dirichlet Allocation (LDA) topic modeling, which I plan to take for a spin in the future, maybe to power the recommendation system. It also enabled search in the development environment's console, which was a long-standing wishlist item.

## UI enhancements

On top of the new and improved search, I took the time to improve the **UI and interactions** a little bit. Pressing <kbd>⌘</kbd> or <kbd>Ctrl</kbd> will now show you three little **keyboard shortcuts** in the top right area, corresponding to the three main actions you can take on the website: home, collections and search. The hope is that this may help you navigate a little more easily.

Additionally, I added a **"scroll spy"** feature to articles with **tables of contents**. This means that as you scroll through the article, the corresponding section in the table of contents will be highlighted. This is a small but nice touch that I think will help you navigate long articles more easily, especially given that I'm writing a lot more long-form content these days.

## Community contributions

**Community contributions are still closed** and will remain that way for the foreseeable future. I've explained why in the past (see [this post](/update-logs/s/231020-content-creator-vs-content-curator)), but I want to make a couple of clarifications on top of that, regarding collaboration, sponsorships and the like.

First off, I want you all to know that sending me ideas, suggestions and **requests via mail** isn't really a viable solution. I get a few mails like that each month and they really never get answered. These should go in the [Issue tracker](https://github.com/Chalarangelo/30-seconds-of-code/issues) instead, if you want to have a productive discussion.

Second, **collaborations**, paid or otherwise, are out of the question. This is especially important for people mailing me about sponsored posts. I used to run ads on this website in the past, and, quite frankly, I hated it. I don't want to be tied to any one company's or sponsor's terms, and I don't want to be beholden to anyone but myself. I want to own all of my content and I want to be able to write about whatever I want, whenever I want. So, with all due respect, **I will not be accepting any sponsored posts or collaborations**, and please stop asking me about them.

---

That's all for today. See you around! 🍻
