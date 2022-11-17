---
title: Technical debt
type: story
tags: career,webdev,programming,management
expertise: intermediate
author: chalarangelo
cover: blog_images/new-york.jpg
excerpt: Learn what technical debt is, its causes and symptoms, and how to deal with it.
firstSeen: 2022-10-09T05:00:00-04:00
---

Technical debt is a jargon term that gets thrown around a lot in the software development industry. It's worth understanding what it means, how to spot it and how to deal with it, once it inevitably rears its ugly head.

### Definition

The term itself comes from a metaphor, in which the team's lack of understanding about the codebase leads to continuous disagreement. Continuously stumbling upon this situation slows down progress, feeling like paying interest on a loan.

**Technical debt is effectively the natural result of writing code about something we don't have a proper understanding of.**

### Causes

But what causes technical debt in the first place? As hinted at by the previous definition, it arises from a **disagreement between business needs and how the software was written**. The root cause for such disagreements can either appear early on or later down the line.

In the former case, a lack of understanding might have lead to laying the foundations incorrectly, therefore carrying the debt from the start. Poor design choices, lack of foresight and a lack of communication between the team members can all lead to this.

In the latter case, the debt might have been incurred due to a change in the business requirements, which the software was not designed to handle. This is often the case with projects that move rapidly, making it hard to adapt to the changing needs.

Interestingly enough, poor code and not following best practices only account for a portion of technical debt. This means that, while following best practices and writing clean code can help reduce the debt, they are usually not the main cause.

### Symptoms

So, how do you know if you have accumulated technical debt? It's not that hard to spot most of the time. **Lowered productivity** is usually one of the first signs. This translates to increased development time or effort estimates that are not met. This makes sense intuitively, as maintenance costs mount up and the codebase is not as easy to work with as it should be.

Following lowered productivity, teams with accumulated technical debt might start to notice **decreased code quality**. When estimates are not met, developers might be tempted to cut corners and write code that is not as clean as it should be. This is a natural reaction to the pressure of meeting deadlines, but it can have a negative impact on the codebase in the long run.

Finally, this spirals into a vicious cycle, as the codebase becomes harder to work with, which leads to more pressure, **lowered morale** and even more technical debt. This is why it's important to spot the symptoms early on and take action to reduce it.

### Solutions

Dealing with technical debt is not always easy, but it's not impossible either. The most important step is realizing that it exists and that it affects the team's productivity. Once that is done, the team can start to take action. Solutions vary, depending on the team, industry and nature of the technical debt itself.

Broadly speaking, it's acceptable to **take on debt early on** to get the project off the ground. Identifying and keeping track of it ensures that the team knows where to start when the time comes to start dealing with it. This also helps figure out how much of an impact it has and how to prioritize maintenance tasks.

As soon as the project is out of the door, the team should **start to reduce debt** or at least not take on any more. Prioritization can be based either on the impact or the effort required for each refactor. A combination of two can also be beneficial, as it can allow small maintenance tasks to fill in the gaps, while more impactful refactors are planned and coordinated accordingly.

After getting to a manageable level, it's important to **keep technical debt in check**. Here's where having a process in place can work wonders. By knowing how to keep debt in check, when to take action and continuously working towards that goal, the team can ensure that the codebase is always in a good state.

### Conclusion

Technical debt is a natural, unavoidable part of software development. Miscommunication and lack of understanding can lead to it, resulting in lowered velocity and morale. Luckily, a bit of awareness, good communication and an actionable process can help reduce it and keep it in check.
