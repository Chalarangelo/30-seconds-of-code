---
title: includeFileContentsInHtml
tags: JavaScript, Browser, beginner
---

Dynamically include the contents of a resource inside the HTML body.

- Replaces the innerHTML of all div elements with `include-resource` attribute
- File-path gets fetched from the value of `include-resource` attribute and contents are fetched using an XMLHttpRequest.

```js
const includeResources = () => document.querySelectorAll('div[include-resource]').forEach(copyResourceToElement);

const copyResourceToElement = (element) =>
  {
    let file = element.getAttribute("include-resource");
    if (file) {
        const client = new XMLHttpRequest();
        client.open('GET', file);
        client.onreadystatechange = function () {
            element.innerHTML = client.responseText;
            element.removeAttribute("include-resource");
        }
        client.send();
    }
  }
```

```js
includeResources(); // This function will include the file contents as innerHTML of any div with include-resource attribute.
/* e.g.
'<div include-resource="resources/svg/some.svg"></div>' OR
'<div include-resource="https://www.some-resoruce-site.com/online-resource.html"></div>'
*/
```