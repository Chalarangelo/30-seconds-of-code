---
title: todoList
tags: map,intermediate
firstSeen: 2021-06-13T05:00:00-04:00
---

Add data to todo list

- Use `(arrayname).map` exactly like a for loop. pull down a value from the array one by one.
- Use `document.getElementById` access a html div/tag.

```js
    const todoList = (value) => {
        var arrayForData = [...value];

        var funForAddData = arrayForData.map((dataList) => {
            return (`<h1>${dataList}</h1>`)
        });

        document.getElementById("showData").innerHTML = funForAddData.join("");
    }
```

```js
todoList("tharun","kumar"); // 'tharun' 'kumar'
```