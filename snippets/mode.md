---
title: mode
tags: math,beginner
---

- Find mode of list.
- Find most frequent element in a list

```py
def mode(List): 
    counter = 0
    ans = List[0] 
      
    for element in List: 
        current_freq = list.count(element) 
        if(current_freq > counter): 
            counter = current_freq
            ans = element 
  
    return ans
```

```py
new_list = [1, 2, 2, 3, 3, 3]
mode(new_list) # 3
```
