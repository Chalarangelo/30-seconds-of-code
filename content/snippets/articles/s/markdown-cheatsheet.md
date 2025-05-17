---
title: Markdown Cheatsheet
tags: [webdev,documentation,cheatsheet]
cover: typography
excerpt: Markdown is the most popular markup language for writing documentation. Here is a cheatsheet with the most common syntax.
listed: true
dateModified: 2025-06-08
---

Markdown is a lightweight **markup language** with **plain text** formatting syntax, easily convertible to various output formats, such as HTML. In the programming world, it's widely used to format **documentation**, README files, **GitHub issues, pull requests** and comments. While there are various flavors of Markdown, the basic syntax is shared across implementations.

> [!TIP]
>
> As most users will be using **GitHub Flavored Markdown (GFM)**, a more complete reference can be found [here](https://github.github.com/gfm/). You may also want to check out [Markdown Guide](https://www.markdownguide.org/ ) for a more comprehensive overview of Markdown syntax.

## Headings

```md
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

## Paragraphs

```md
This is a paragraph.

This is another paragraph.
```

## Emphasis

```md
**Bold text** or __Bold text__

*Italic text* or _Italic text_

***Bold and italic text*** or ___Bold and italic text___
```

## Lists

```md
- Unordered list item 1
- Unordered list item 2
  - Nested unordered list item
- Unordered list item 3

* Unordered list item 1
* Unordered list item 2
  * Nested unordered list item
* Unordered list item 3

1. Ordered list item 1
2. Ordered list item 2
   1. Nested ordered list item
3. Ordered list item 3

1. Ordered list item 1
1. Ordered list item 2
   1. Nested ordered list item
1. Ordered list item 3
```

## Links

```md
[Link text](https://example.com)

[Link text with title](https://example.com "Title")
```

## Images

```md
![Alt text](https://example.com/image.jpg)

![Alt text](https://example.com/image.jpg "Optional title")
```

## Code

````md
Inline code: `code`

```
Block code
```

````

## Blockquotes

```md
> This is a blockquote.
>
> It can span multiple lines.
```

## Tables

```md
| Header 1 | Header 2 |
|----------|----------|
| Row 1    | Row 1    |
| Row 2    | Row 2    |
```

## Horizontal Rule

```md
---
```
