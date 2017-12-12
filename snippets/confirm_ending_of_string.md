### Confirm Ending of the string

Use string.substr property to target last character

```
function confirmEnding(string, target) { 
    if (string.substr(-target.length) === target) {return true; } 
    else {  return false; } 
}
confirmEnding('Bastian', 'n');
```
