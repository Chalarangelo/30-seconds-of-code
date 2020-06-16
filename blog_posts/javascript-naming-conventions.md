---
title: JavaScript naming conventions
type: story
tags: javascript,variable,cheatsheet
authors: chalarangelo
cover: blog_images/js-naming-conventions.jpg
excerpt: Naming conventions, while not easy to enforce, make code easier to read and understand. Learn how to name your variables in JavaScript with this handy guide.
---

**Variables**

- Names are case-sensitive, lowercase and uppercase are different.
- Start variable names with a letter, use `camelCase` for names.
- Variable names should be self-descriptive, describing the stored value.
- Boolean variables are usually prefixed with `is` or `has`.

**Functions**

- Names are case-sensitive, lowercase and uppercase are different.
- Start function names with a letter, use `camelCase` for names.
- Use descriptive names, usually verbs in the imperative form.
- Common prefixes are `get`, `make`, `apply` etc.
- Class methods follow the same rules.

**Constant**

- Names are case-sensitive, lowercase and uppercase are different.
- Define constants at the top of your file, function or class.
- Sometimes `UPPER_SNAKE_CASE` is used, while other times plain `camelCase`.

**Classes**

- Names are case-sensitive, lowercase and uppercase are different.
- Start class names with a capital letter, use `PascalCase` for names.
- Use descriptive names, explaining the funcionality of the class.
- Components, which are used in frontend frameworks follow the same rules.

**Private**

- Prefix any variable or function with `_` to show intention for it to be private.
- As a convention, this will not prevent other parts of the code from accessing it.

**Image credit:** [Paul Hanaoka](https://unsplash.com/@plhnk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
