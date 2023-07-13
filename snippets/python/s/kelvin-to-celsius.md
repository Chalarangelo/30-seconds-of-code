---
title: Kelvin to celsius
type: snippet
language: python
tags: [math]
cover: boutique-home-office-4
dateModified: 2023-07-13T08:30:00+05:00
---

Converts kelvin into celsius degree centigrade 
- Use `round()` with the perameter 

```py
def kelvinToCelsius(kelvin):
  temp = round(kelvin - 273.15, 2)
  return temp
```

```py
kelvinToCelsius(298.65) # 
```
