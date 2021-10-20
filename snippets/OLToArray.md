---
title: OLToArray
tags: array,html,intermediate
firstSeen: 2021-10-20T17:34:25+00:00
---

Convert HTML OL tag to Array

- Use nested function to save the child in the main scope.
- Use `data.trim()` to prevent space between the html.

```js
const OLToArray = elmnt => {
    if (!elmnt) {
      return {}
    }

    var b = []
    var rnt = {}
    if (elmnt.nodeName === 'LI') {
        rnt['text'] = elmnt.firstChild.data.trim()
    }
    if (elmnt.childNodes.length > 1) {
        for (var i = 0; i < elmnt.childNodes.length; i++) {
            if (elmnt.childNodes[i].nodeName !== '#text') {
                b.push(OLToArray(k.childNodes[i]))
            }
        }
        rnt['child'] = b.length === 1 ? b[0] : b
        if (!rnt['text']) {
            return b
        }
    }
    return rnt
}
```

```html
<ol id="toArray">
  <li> 1
    <ol>
      <li>1.1</li>
    </ol>
  </li>
  <li> 2
    <ol>
      <li> 2.1
        <ol>
          <li> 2.1.2 </li>
        </ol>
      </li>
      <li> 2.2 </li>
    </ol>
  </li>
</ol>
```

```js
OLToArray(document.getElementById('toArray'))
/*
[
  {
    "text": "1",
    "child": [
      {
        "text": "1.1"
      }
    ]
  },
  {
    "text": "2",
    "child": [
      {
        "text": "2.1",
        "child": [
          {
            "text": "2.1.2"
          }
        ]
      },
      {
        "text": "2.2"
      }
    ]
  }
]
*/
```
