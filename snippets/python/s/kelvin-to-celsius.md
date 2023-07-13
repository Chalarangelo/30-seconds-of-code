---
title: Kelvin to celsius
type: snippet
language: python
tags: [math]
cover: boutique-home-office-4
dateModified: 2023-07-13T08:30:00+05:00
---

Converts kelvin into celsius degrees. 
- Use `round()` with the perameter `2` to return only 2 numbers after decimal point.

```py
def kelvinToCelsius(kelvin):
  temp = round(kelvin - 273.15, 2)
  return temp
```

```py
kelvinToCelsius(298.65) # 
```
