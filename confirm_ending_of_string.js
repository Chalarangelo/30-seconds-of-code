// Confirm Ending of the string
function confirmEnding(string, target) { 
if (string.substr(-target.length) === target) {return true; } 
else {  return false; } }
confirmEnding('Bastian', 'n');
