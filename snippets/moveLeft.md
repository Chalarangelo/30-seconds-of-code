title|tags
-----|----
moveLeft|beginner,DOM,Animation

Move a specfic Id to the Left over a certain interval.

*Uses DOM to move an Element utlizing the **setInterval()** and **clearInterval()**.
```javascript
const moveLeft=(elementId,distance)=>{
              var pos = 0;
              var id = setInterval(frame, 1);
              function frame() {
                if (pos === distance) {
                  clearInterval(id);
                } else {
                  pos++;
                  document.getElementById(elementId).style.left = pos + "px";
                }
              }
      }
```
