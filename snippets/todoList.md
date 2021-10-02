---
title: todoList
tags: map,beginner
firstSeen: 2021-06-13T05:00:00-04:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Add data to todo list.

<!-- - Use `(arrayname).map` exactly like a for loop. pull down a value from the array one by one -->

<!-- - Use `document.getElementById` access a html div/tag -->



```js
    const addData = (value) => {
        var arrayForData = [...value];

        var funForAddData = arrayForData.map((dataList) => {
            return (`<h1>${dataList}</h1>`)
        });

        document.getElementById("showData").innerHTML = funForAddData.join("");
    }
```

```js
    addData("tharun","kumar");
```
