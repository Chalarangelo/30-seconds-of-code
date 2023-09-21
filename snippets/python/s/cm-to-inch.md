---
title: Centimeter to Inch converter
type: snippet
language: python
tags: [math]
cover: blue-computer
dateModified: 2023-09-21T09:48:37+05:30
---

Converts Centimeters to Inches

- Follows the conversion formula `in = cm / 2.54`

```py
def centimeters_to_inches(centimeters):
  inches = centimeters / 2.54
  return f"{inches:.2f}"
```

```py
centimeters_to_inches(15) # 5.91