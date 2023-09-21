---
title: Inch to Centimeter converter
type: snippet
language: python
tags: [math]
cover: dark-city
dateModified: 2023-09-21T09:38:54+05:30
---

Converts Inches to Centimeters

- Follows the conversion formula `cm = in * 2.54`.

```py
def inches_to_centimeters(inches):
  centimeters = inches * 2.54
  return f"{centimeters:.2f}"
```

```py
inches_to_centimeters(15) # 38.10
```