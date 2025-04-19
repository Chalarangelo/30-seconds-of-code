---
title: Logical and physical CSS properties equivalents
shortTitle: Logical & physical properties
language: css
tags: [layout]
cover: succulent-8
excerpt: New to CSS logical properties? This article provides a handy map of logical properties to their physical counterparts.
listed: true
dateModified: 2025-05-12
---

Logical properties are a new way to define layout in CSS. They allow you to use logical directions (like `start`, `end`, `inline`, and `block`) instead of physical directions (like `left`, `right`, `top`, and `bottom`). This makes it easier to create layouts that work well in different writing modes and languages.

<baseline-support featureId="logical-properties">
</baseline-support>

However, if you're used to working with physical properties, it can be a bit confusing at first. To help you out, here's a handy map of logical properties to their physical counterparts!

> [!NOTE]
>
> In this article, I'm assuming you're writing from left to right (LTR). If you're writing from right to left (RTL), the physical properties will be reversed. For example, `left` becomes `right`, and `top` becomes `bottom`.

### Position

| Logical Property | Physical Property (LTR) |
|------------------|-------------------|
| `inset-inline-start` | `left` |
| `inset-inline-end` | `right` |
| `inset-inline` | `left` & `right` |
| `inset-block-start` | `top` |
| `inset-block-end` | `bottom` |
| `inset-block` | `top` & `bottom` |

## Margin

| Logical Property | Physical Property (LTR) |
|------------------|-------------------|
| `margin-inline-start` | `margin-left` |
| `margin-inline-end` | `margin-right` |
| `margin-inline` | `margin-left` & `margin-right` |
| `margin-block-start` | `margin-top` |
| `margin-block-end` | `margin-bottom` |
| `margin-block` | `margin-top` & `margin-bottom` |

## Padding

| Logical Property | Physical Property (LTR) |
|------------------|-------------------|
| `padding-inline-start` | `padding-left` |
| `padding-inline-end` | `padding-right` |
| `padding-inline` | `padding-left` & `padding-right` |
| `padding-block-start` | `padding-top` |
| `padding-block-end` | `padding-bottom` |
| `padding-block` | `padding-top` & `padding-bottom` |

## Border

| Logical Property | Physical Property (LTR) |
|------------------|-------------------|
| `border-inline-start` | `border-left` |
| `border-inline-start-color` | `border-left-color` |
| `border-inline-start-style` | `border-left-color` |
| `border-inline-start-width` | `border-left-color` |
| `border-inline-end` | `border-right` |
| `border-inline-end-color` | `border-right-color` |
| `border-inline-end-style` | `border-right-color` |
| `border-inline-end-width` | `border-right-color` |
| `border-inline` | `border-left` & `border-right` |
| `border-inline-color` | `border-left-color` & `border-right-color` |
| `border-inline-style` | `border-left-style` & `border-right-style` |
| `border-inline-width` | `border-left-width` & `border-right-width` |
| `border-block-start` | `border-top` |
| `border-block-start-color` | `border-top-color` |
| `border-block-start-style` | `border-top-color` |
| `border-block-start-width` | `border-top-color` |
| `border-block-end` | `border-bottom` |
| `border-block-end-color` | `border-bottom-color` |
| `border-block-end-style` | `border-bottom-color` |
| `border-block-end-width` | `border-bottom-color` |
| `border-block` | `border-top` & `border-bottom` |
| `border-block-color` | `border-top-color` & `border-bottom-color` |
| `border-block-style` | `border-top-style` & `border-bottom-style` |
| `border-block-width` | `border-top-width` & `border-bottom-width` |
| `border-start-start-radius` | `border-top-left-radius` |
| `border-start-end-radius` | `border-top-right-radius` |
| `border-end-start-radius` | `border-bottom-left-radius` |
| `border-end-end-radius` | `border-bottom-right-radius` |

## Size

| Logical Property | Physical Property (LTR) |
|------------------|-------------------|
| `inline-size` | `width` |
| `min-inline-size` | `min-width` |
| `max-inline-size` | `max-width` |
| `block-size` | `height` |
| `min-block-size` | `min-height` |
| `max-block-size` | `max-height` |

## Values

In addition to logical properties, there are also logical values that can be used in a variety of other CSS properties.

| Logical Value | Physical Value (LTR) |
|------------------|-------------------|
| `start` | `left` |
| `end` | `right` |
| `inline-start` | `left` |
| `inline-end` | `right` |
| `block-start` | `top` |
| `block-end` | `bottom` |
