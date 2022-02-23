---
title: JavaScript's numeric separators explained
type: story
tags: javascript,math,type
author: chalarangelo
cover: blog_images/coffee-drip.jpg
excerpt: Numeric separators are a somewhat lesser-known JavaScript syntactic sugar that can make working with large constants a lot easier.
firstSeen: 2021-06-27T05:00:00-04:00
---

Numeric separators are a lesser-known JavaScript syntactic sugar that can make working with numeric constants a lot easier. The long and short of it is that you can add underscores (`_`) to numeric values to make them more readable.

The idea of separating large numeric values with a special character might sound familiar on account of it being a syntax present in multiple other languages, such as Java, Python, Ruby etc. From what I can tell, numeric separators are at their best when creating shared constants that will not change and are very large, have many repeated digits and/or can be ambiguous.

Apart from readability, numeric separators don't really offer anything else. For the sceptics among us that don't really see a lot of readability value either, I'd like to show two rather convincing sample cases:

```js
// How many zeroes is that? Millions? Billions? Trillions?
const msInOneYear = 31536000000;
// Is this 4,200 or 42.00 (in cents)?
const price = 4200;

// Ok, this is approximately 31.5 billion
const msInOneYear = 31_536_000_000;
// Based on the separator, this should be 42.00 (cents)
const price = 42_00;
```

Finally, as far as caveats go, you only need to remember that numbers cannot start or end with a numeric separator and that you can't have two or more numeric separators in a row.
