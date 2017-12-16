### Truth-Check-Objects

Check if the predicate (second argument) is truthy on all elements of a collection (first argument).


 - For every object in the collection array, check the truthiness of object’s property passed in pre parameter
 - Array#every method internally checks if the value returned from the callback is truthy.
 - Return true if it passes for every object. Otherwise, return false.
 - Also if the object is empty then it will return false
 
 ```
truthCheck = (collection, pre) => (collection.every(obj => obj[pre]));

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, 
{"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"); 
// true
 
 ```
