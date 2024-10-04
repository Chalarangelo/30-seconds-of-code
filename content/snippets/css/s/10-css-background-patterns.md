---
title: 10 beautiful CSS background patterns
shortTitle: CSS background patterns
language: css
tags: [visual,cheatsheet]
cover: armchair-design
excerpt: I hand picked 10 of my favorite CSS background patterns from MagicPattern for your next project. Get them now!
listed: true
dateModified: 2024-05-09
---

[MagicPattern](https://www.magicpattern.design/tools/css-backgrounds/) has an amazing collection of beautiful pure CSS background pattern to spice up your designs. I highly recommend checking out the full collection. Meantime, here are my top picks to get you started:

<style>
.pattern-box {
  grid-column: 1 / -1;
  width: 100%;
  height: 144px;
  border-radius: var(--layout-border-radius) var(--layout-border-radius) 0 0;
}

.pattern-box + pre {
  margin-block-start: calc(-1 * var(--layout-row-spacing, 0));
  border-radius: 0 0 var(--layout-border-radius) var(--layout-border-radius);
}

.pattern-box + pre::before {
  opacity: 0;
}

main > article > h2 {
  margin: 0;
  font-size: var(--font-sm);
  transform: translateY(186px);
  z-index: 1;
  height: 0;
}

main > article > h2::after {
  display: inline-block;
  font-size: var(--font-sm);
  content: "(CSS)";
  margin-inline-start: var(--spacing-2);
}

.lines-2 {
  background-color: #fefefe;
  background-image: linear-gradient(to right, #5394fd, #5394fd 12px, #fefefe 12px, #fefefe );
  background-size: 24px 100%;
}

.zigzag {
  background-color: #fefefe;
  background-image:  linear-gradient(135deg, #5394fd 25%, transparent 25%), linear-gradient(225deg, #5394fd 25%, transparent 25%), linear-gradient(45deg, #5394fd 25%, transparent 25%), linear-gradient(315deg, #5394fd 25%, #fefefe 25%);
  background-position:  24px 0, 24px 0, 0 0, 0 0;
  background-size: 48px 48px;
  background-repeat: repeat;
}

.polka {
  background-color: #fefefe;
  background-image: radial-gradient(#5394fd 1.2px, #fefefe 1.2px);
  background-size: 24px 24px;
}

.rectangles {
  background-color: #fefefe;
  background-image:  repeating-linear-gradient(45deg, #5394fd 25%, transparent 25%, transparent 75%, #5394fd 75%, #5394fd), repeating-linear-gradient(45deg, #5394fd 25%, #fefefe 25%, #fefefe 75%, #5394fd 75%, #5394fd);
  background-position: 0 0, 24px 24px;
  background-size: 48px 48px;
}

.rhombus {
  background-color: #fefefe;
  background-image:  linear-gradient(135deg, #5394fd 25%, transparent 25%), linear-gradient(225deg, #5394fd 25%, transparent 25%), linear-gradient(45deg, #5394fd 25%, transparent 25%), linear-gradient(315deg, #5394fd 25%, #fefefe 25%);
  background-position:  24px 0, 24px 0, 0 0, 0 0;
  background-size: 24px 24px;
  background-repeat: repeat;
}

.paper {
  background-color: #fefefe;
  background-image:  linear-gradient(#5394fd 4.8px, transparent 4.8px), linear-gradient(90deg, #5394fd 4.8px, transparent 4.8px), linear-gradient(#5394fd 2.4px, transparent 2.4px), linear-gradient(90deg, #5394fd 2.4px, #fefefe 2.4px);
  background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
  background-position: -4.8px -4.8px, -4.8px -4.8px, -2.4px -2.4px, -2.4px -2.4px;
}

.diagonal {
  background-color: #fefefe;
  background: repeating-linear-gradient( 45deg, #5394fd, #5394fd 12px, #fefefe 12px, #fefefe 60px );
}

.triangle {
  background-color: #fefefe;
  background-image: linear-gradient(45deg, #5394fd 50%, #fefefe 50%);
  background-size: 24px 24px;
}

.wavy {
  background-color: #fefefe;
  background-image: repeating-radial-gradient( circle at 0 0, transparent 0, #fefefe 24px ), repeating-linear-gradient( #5394fd55, #5394fd );
}

.isometric {
  background-color: #fefefe;
  background-image:  linear-gradient(30deg, #5394fd 12%, transparent 12.5%, transparent 87%, #5394fd 87.5%, #5394fd), linear-gradient(150deg, #5394fd 12%, transparent 12.5%, transparent 87%, #5394fd 87.5%, #5394fd), linear-gradient(30deg, #5394fd 12%, transparent 12.5%, transparent 87%, #5394fd 87.5%, #5394fd), linear-gradient(150deg, #5394fd 12%, transparent 12.5%, transparent 87%, #5394fd 87.5%, #5394fd), linear-gradient(60deg, #5394fd77 25%, transparent 25.5%, transparent 75%, #5394fd77 75%, #5394fd77), linear-gradient(60deg, #5394fd77 25%, transparent 25.5%, transparent 75%, #5394fd77 75%, #5394fd77);
  background-size: 48px 84px;
  background-position: 0 0, 0 0, 24px 42px, 24px 42px, 0 0, 24px 42px;
}
</style>

## Stripes pattern

<div class="pattern-box lines-2"></div>

```css
.lines-2 {
  background-color: #fefefe;
  background-image: linear-gradient(
    to right,
    #5394fd,
    #5394fd 12px,
    #fefefe 12px,
    #fefefe
  );
  background-size: 24px 100%;
}
```

## Zig zag pattern

<div class="pattern-box zigzag"></div>

```css
.zigzag {
  background-color: #fefefe;
  background-image: linear-gradient(135deg, #5394fd 25%, transparent 25%),
    linear-gradient(225deg, #5394fd 25%, transparent 25%),
    linear-gradient(45deg, #5394fd 25%, transparent 25%),
    linear-gradient(315deg, #5394fd 25%, #fefefe 25%);
  background-position:
    24px 0,
    24px 0,
    0 0,
    0 0;
  background-size: 48px 48px;
  background-repeat: repeat;
}
```

## Polka dot pattern

<div class="pattern-box polka"></div>

```css
.polka {
  background-color: #fefefe;
  background-image: radial-gradient(#5394fd 1.2px, #fefefe 1.2px);
  background-size: 24px 24px;
}
```

## Checkerboard pattern

<div class="pattern-box rectangles"></div>

```css
.rectangles {
  background-color: #fefefe;
  background-image: repeating-linear-gradient(
      45deg,
      #5394fd 25%,
      transparent 25%,
      transparent 75%,
      #5394fd 75%,
      #5394fd
    ),
    repeating-linear-gradient(
      45deg,
      #5394fd 25%,
      #fefefe 25%,
      #fefefe 75%,
      #5394fd 75%,
      #5394fd
    );
  background-position:
    0 0,
    24px 24px;
  background-size: 48px 48px;
}
```

## Rhombus pattern

<div class="pattern-box rhombus"></div>

```css
.rhombus {
  background-color: #fefefe;
  background-image: linear-gradient(135deg, #5394fd 25%, transparent 25%),
    linear-gradient(225deg, #5394fd 25%, transparent 25%),
    linear-gradient(45deg, #5394fd 25%, transparent 25%),
    linear-gradient(315deg, #5394fd 25%, #fefefe 25%);
  background-position:
    24px 0,
    24px 0,
    0 0,
    0 0;
  background-size: 24px 24px;
  background-repeat: repeat;
}
```

## Paper pattern

<div class="pattern-box paper"></div>

```css
.paper {
  background-color: #fefefe;
  background-image: linear-gradient(#5394fd 4.8px, transparent 4.8px),
    linear-gradient(90deg, #5394fd 4.8px, transparent 4.8px),
    linear-gradient(#5394fd 2.4px, transparent 2.4px),
    linear-gradient(90deg, #5394fd 2.4px, #fefefe 2.4px);
  background-size:
    120px 120px,
    120px 120px,
    24px 24px,
    24px 24px;
  background-position:
    -4.8px -4.8px,
    -4.8px -4.8px,
    -2.4px -2.4px,
    -2.4px -2.4px;
}
```

## Diagonal pattern

<div class="pattern-box diagonal"></div>

```css
.diagonal {
  background-color: #fefefe;
  background: repeating-linear-gradient(
    45deg,
    #5394fd,
    #5394fd 12px,
    #fefefe 12px,
    #fefefe 60px
  );
}
```

## Triangles pattern

<div class="pattern-box triangle"></div>

```css
.triangle {
  background-color: #fefefe;
  background-image: linear-gradient(45deg, #5394fd 50%, #fefefe 50%);
  background-size: 24px 24px;
}
```

## Waves pattern

<div class="pattern-box wavy"></div>

```css
.wavy {
  background-color: #fefefe;
  background-image: repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #fefefe 24px
    ),
    repeating-linear-gradient(#5394fd55, #5394fd);
}
```

## Isometric pattern

<div class="pattern-box isometric"></div>

```css
.isometric {
  background-color: #fefefe;
  background-image: linear-gradient(
      30deg,
      #5394fd 12%,
      transparent 12.5%,
      transparent 87%,
      #5394fd 87.5%,
      #5394fd
    ),
    linear-gradient(
      150deg,
      #5394fd 12%,
      transparent 12.5%,
      transparent 87%,
      #5394fd 87.5%,
      #5394fd
    ),
    linear-gradient(
      30deg,
      #5394fd 12%,
      transparent 12.5%,
      transparent 87%,
      #5394fd 87.5%,
      #5394fd
    ),
    linear-gradient(
      150deg,
      #5394fd 12%,
      transparent 12.5%,
      transparent 87%,
      #5394fd 87.5%,
      #5394fd
    ),
    linear-gradient(
      60deg,
      #5394fd77 25%,
      transparent 25.5%,
      transparent 75%,
      #5394fd77 75%,
      #5394fd77
    ),
    linear-gradient(
      60deg,
      #5394fd77 25%,
      transparent 25.5%,
      transparent 75%,
      #5394fd77 75%,
      #5394fd77
    );
  background-size: 48px 84px;
  background-position:
    0 0,
    0 0,
    24px 42px,
    24px 42px,
    0 0,
    24px 42px;
}
```
