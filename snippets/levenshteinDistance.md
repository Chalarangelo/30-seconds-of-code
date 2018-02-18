### levenshteinDistance

Calculates the [levenshteinDistance](https://en.wikipedia.org/wiki/Levenshtein_distance) between two strings.

Calculates the number of changes(substitution,deletion,addition) required to convert `string1` to `string2`. Can also be required to compare two strings as shown in example.

``` js
const levenshteinDistance  = (string1,string2) => {
    if(string1.length === 0) return string2.length;
    if(string2.length === 0) return string1.length;
    let matrix = Array(string2.length+ 1).fill(0).map((x,i) => [i]);
    matrix[0] = Array(string1.length + 1).fill(0).map((x,i) => i);
    for(i = 1;i <= string2.length;i++){
        for(j = 1;j<=string1.length; j++){
            if(string2[i-1] === string1[j-1]){
                matrix[i][j] = matrix[i-1][j-1];
            }
            else{
                matrix[i][j] = Math.min(matrix[i-1][j-1]+1,matrix[i][j-1]+1,matrix[i-1][j]+1);
            }
        }
    }
    return matrix[string2.length][string1.length];
};
```

```js
levenshteinDistance('30-seconds-of-code','30-seconds-of-python-code'); // 7
const compareStrings = (string1,string2) => (100 - levenshteinDistance(string1,string2)/Math.max(string1.length,string2.length));
compareStrings('30-seconds-of-code','30-seconds-of-python-code'); // 99.72 (%)
```