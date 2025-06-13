---
title: Design systems rarely survive contact with the real world
shortTitle: Design systems
tags: [webdev]
cover: tranquil-riverscape
excerpt: Design systems are often seen as the holy grail of design and development, but there are a few issues that can arise in the real world.
listed: true
dateModified: 2025-06-14
---

Over the years, both as a professional and as a hobbyist, I've used, maintained and developed a number of **design systems**. While the promise of a unified, reusable set of components is alluring, my personal experience has shown that design systems rarely survive contact with the real world. Instead of being a panacea, they often become a source of friction, slowing teams down and introducing new challenges that are rarely discussed outside of closed-door retrospectives.

> [!IMPORTANT]
>
> **This is an opinion piece**. The views expressed here are my own and may not reflect those of the organizations I work for or with. As opinions often tend to be **subjective**, I encourage you to take them with a grain of salt.

## What design systems are for

The promise of design systems is simple: create a **shared language** and toolkit that designers and developers can use to **build consistent, scalable products**. In ideal scenarios, design systems provide clear benefits: **faster onboarding, fewer inconsistencies**, and a foundation for **rapid iteration**. When done right, they can be a powerful force multiplier for teams.

## The reality of design systems

Yet, the **real world** is full of use cases that are **messy, complex, and unpredictable**. The gap between theory and practice quickly becomes apparent. You simply **can't design for every scenario**, and the importance of flexibility and adaptability is often underestimated. Design systems tend to be **rigid and verbose**, making them hard to use in practice. They're **almost never complete**, especially in projects that evolve rapidly and dynamically.

## Escaping isolation

A problem I've noticed is that design systems are often **created in isolation**, as an attempt to organize, or worse yet reorganize, a messy project. This is especially problematic when replacing existing designs and code, since many **edge cases are unknowable** to the design team.

Moreover, limited capacity during replacement can lead to **half-baked solutions**, or systems applied only to parts of the codebase. Supporting **multiple platforms and environments** introduces further complications, as do the idiosyncrasies of the codebases or platforms in question.

Organization-wide **alignment** is also an uphill struggle. People resist change, and any shift in the team can affect the vision and direction of the design system, leading to inconsistencies and confusion.

## Development is hard

Nobody is surprised to hear that **software development is inherently complex**, and good, organized design is only one facet of the process. This leads to a situation where tools and solutions are often bent out of shape out of necessity, not incompetence or negligence.

Cracks often first appear in convention **discrepancies** (e.g. component names) between design and development, then propagate into implementation details. Developers, faced with a tangled web of issues, will often **resort to hacks** that pile up over time. Designers aren't immune either; they may abuse components to make their work easier or find **shortcuts**. The underlying code often doesn't match the design system, and **external component libraries** can slow down development, requiring specialized changes to adapt to new constraints.

## Time is the enemy

Small changes tend to accumulate with time, resulting in **deviations** that are hard to track. **Patches and edge case solutions** in the code may or may not be communicated to the design team, but don't always make their way back into the designs. A chat in the hallway or a quick Slack message is bound to be forgotten when there's a deadline looming.

Over time, **deterioration** and a proliferation of edge cases can make even the best design systems unwieldy. As changes pile up, so does **technical debt**, which in turn leads to more hacks and workarounds. The design system becomes a burden rather than a tool, and the original vision is lost in the noise.

## Productivity & velocity

Product teams are under constant **pressure to deliver**, and contributing back to the design system is rarely a priority. **On the fly decisions** may never be added to the system, but get replicated throughout the codebase. Alignment with the design system can bog down the **fast iterations** that product management demands, and the system itself may be seen as a hindrance to productivity rather than a tool to enhance it.

A similar situation arises for **hobby projects**, open source and small teams. The initial excitement of creating a design system can quickly fade when faced with the reality of **maintaining it**. The time and effort required to keep it up to date can be **overwhelming**, especially when the focus is on delivering features and fixing bugs, or when time to work on a side project is limited due to other commitments.

## Conclusion

Design systems are a **great idea in theory**, but they often fail to deliver the expected results in practice. It's better to **focus on the principles** of good design and development, rather than enforcing a rigid system — especially in fast-paced environments with constantly evolving codebases.

**Good communication is key to success** in larger teams, while for small teams or solo projects, a design system may end up being overkill. Many of these issues also apply to code architecture and design documents, and the solutions are often similar: **communication, flexibility, and adaptability**.

Still, there's always room for improvement: a design system **can be a valuable tool** if adopted slowly, iteratively, and with the **right mindset**. Ultimately, they require careful consideration and a willingness to adapt to the realities of software development, both from a design and a development perspective.
