---
title: How can I reset all styles on an element?
shortTitle: Reset all styles
language: css
tags: [visual]
cover: rocky-beach-2
excerpt: Have you ever needed to reset all styles previously applied to a selector to their default values? CSS has the tool just for you!
listed: true
dateModified: 2024-08-15
---

Have you ever needed to **reset all styles** previously applied to a selector to their default values? CSS has the tool just for you!

One of the lesser-known properties in CSS is the `all` property. This property is used to set properties to their initial or inherited values, or to the values specified in another cascade layer or stylesheet origin.

Using it in conjunction with the `initial` value, you can reset all styles to their **default values**. However, this will not affect the `direction` and `unicode-bidi` properties, as well as any custom properties you may have defined.

```css
.reset-all-styles {
  all: initial;
}
```

After resetting all styles, you can then apply new styles to the element as needed. Remember that this property should come **first in the CSS rule** to ensure that it takes precedence over any other styles applied to the element.
