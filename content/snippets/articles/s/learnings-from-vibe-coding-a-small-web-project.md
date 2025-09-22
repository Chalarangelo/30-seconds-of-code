---
title: What I learned from vibe coding a small web project with GitHub Copilot and GPT-5 mini
shortTitle: Vibe coding learnings
tags: [webdev,programming]
cover: interior-19
excerpt: A short summary of your story up to 140 characters long.
listed: true
dateModified: 2025-10-24
---

A few weeks ago, I decided to finally try **vibe coding**, mostly out of curiosity, but also due to necessity and a lack of time. The bet was to create a small web project using a coding assistant, without much manual coding.

## Setup

First things first, the tools I used for the job are what I'm most familiar with - **GitHub Copilot** and **VS Code's Agent Mode**. While I use GPT-4.1 as my daily driver (what a time to be alive, I'm calling an LLM my _daily driver_), I decided to give **GPT-5 mini** a go. Spoiler alert: both models seem to be on par, so we won't be focusing on that too much.

I'm not going to dive into the project details, but rather share some of the learnings and insights I gathered from this experience. All you need to know is the tech stack, which includes **Go** on the backend, **SQLite** for the database, and **React** with **Redux** and **Sass** on the frontend.

I should also mention that I'm familiar with all of these technologies, but I'm really a beginner in Go, so I could use the help in setting up the project structure and gluing things together.

## The good

Starting out with the good, the experience was surprisingly smooth. My little AI assistant was delightfully quick in setting up the **project structure** and **installing the dependencies** I wanted, without me having to lift a finger. Full disclaimer that I knew most of the toolkit I wanted to use, so it didn't have to guess much in the earlier stages.

I was pleasantly surprised by how well it handled **boilerplate setup** and **small refactors** I suggested. It was also very good at performing **basic tests** via `curl` commands and stuff like that to verify that the endpoints were working as expected.

Another thing I noticed is that I didn't need to dive too deep into the **documentation** of that many tools. As I'm sort of familiar with Go's ecosystem, I managed to find some dependencies that looked right. I didn't want to spend 40 hours **debugging** a live reloader and writing my database connection call, so I just asked the AI to do it for me. What would have taken me a day or two, took a couple of hours. Bonus points for not having to read through a ton of docs that I wouldn't need ever again during development of the project.

Last but not least, it was truly a **learning experience**. Seeing how the agent was restricted to **terminal commands** and the editor, I noticed how it did things I wouldn't have thought of or been used to. For example, I like how it used `curl` to test endpoints, or `lsof` to find process IDs, and actually picked up the trick myself after that!

## The bad

Ok, now onwards to what I didn't like. It's really **not that smart**! As soon as you have enough moving parts - and that's just a half a dozen things - it starts to **struggle, hallucinate, or get confused**. And don't even get me started on **indentation and formatting**, which is entirely impossible to get right on its part. I had to manually fix it in literally every single file it generated.

One example of its limitations became quite obvious when I was **debugging** one of the first endpoints in the project. The database was set up, there was a table with data and I had a working connection to it from Go. I even double checked via `sqlite3` on the terminal to see that everything was there. For some reason, the endpoint returned 404.

When I tried explaining it to Copilot, it **insisted** that the database connection was the problem, and suggested a fix that was completely off, almost erasing my database in the process. Yeah, I wasn't too happy about that!

I knew it wasn't database-related, so I prompted it a couple of times, but it kept insisting that the connection was the problem. I finally gave up and debugged it myself, realizing that the problem was actually in the live reloading tool. I told it where to focus and it sort of got it right, but not really, so I ended up patching the issue myself.

## The worse

This last example brings me to my next point, which is that, sadly, it gets even worse. Not only does the AI get stuck and obsessed over issues, **it won't even produce the correct fixes** in some cases, **update the right dependencies** or even **find the right documentation**.

I looked up the documentation of the live reloading package I was using and, as it turns out, CoPilot installed a fairly ancient and buggy version. I updated it and tried to fix the issue, only to realize that the configuration file it produced was very broken and, by some odd miracle, in the haze of terminal commands it ran before, it produced a working build just once.

I then proceeded to check my `package.json` file and, lo and behold, **every single dependency was outdated**. And I'm not even talking like minor versions here, it was older than a year. I understand this is reasonable, since the model was trained on data that is at least a few months old, but still, it was quite frustrating to have to update everything manually.

The worst part is it did try to list the latest versions of the dependencies on npm and then it proceeded to install older ones, presumably because it only had their documentation in its training data. Still, some of **the code it produced didn't even match the versions it installed**, resulting in a couple of simple, yet annoying issues here and there.

I won't even go into **best practices**, **security** issues and stuff like that, because it would take a whole other article to cover that. Just be aware that you should **always double check everything it produces**, as if it was a distracted junior developer with access to last year's internet.

## Other takeaways

Apart from having some fun and realizing how far AI has come, I also **learned a few solid programming things**, which is, I think, the most value I got from this experience.

Like I said before, I picked up the `lsof -i :8080 -t` trick to find the process ID of a server running on a specific port and `kill` it. I also spent some more time with tools like `sqlite3` and `curl`, due to the fact that the AI used them or prompted me to use them here and there. And, luckily, I refreshed my knowledge of some Go concepts and Makefiles, which I hadn't used in a little while.

I also like how it got me to focus on the project structure, tools, ecosystem and the big picture. As a beginner in Go, I would have struggled much more, resulting in me frustrated and thinking the ecosystem isn't there yet. Having said that, I still believe that I should have written the project in Ruby on Rails and not Go, as I'm not yet at the level where I could tackle it and maintain it properly. Still, I'm pretty sure I would have had a different outcome and perspective had I done it without the AI's assistance.

Finally, as I had the chance to experience a stack I haven't tried before, it solidified a couple of things in my head. The oddest one is that migrations, as a database concept, aren't limited to ORMs, but rather a general concept that can be applied to SQL databases, even on a low level. Yeah, I've been using them in Rails for a while, never thought about it that way. I also noticed how one sets up Overmind and Procfiles, which I had only seen in projects I had worked on, never set them up myself.

These small nuggets of knowledge or refreshers seem like **the most valuable takeaway for me and my growth** as a developer.

## Closing thoughts

If you are considering vibe coding, I would say give it a go, but it's quite the gamble. Be prepared for some frustration and for it to eventually become a hassle. LLMs are pretty helpful, but they definitely have a long way to go to replace a human developer, even a junior one. The best use case I could think of, writing boilerplate code, wasn't terrible, but anything more complex seems like a stretch right now.

Still, I think developers, especially junior and mid-level ones stand to gain a lot from watching the AI code and fill gaps in their knowledge. So, yeah, give it a go, but don't expect too much!
