### toKebabCase

Repeats a string n times using String.repeat()

If no string is provided the default is `""` and the default number of times is 1

```js
const repeatString = (str="",num=1) => {
    return num >= 0 ? str.repeat(num) : str;
}
// toRepeatString("abc",3) -> 'abcabcabc'
// toRepeatString("abc",0) -> ''
// toRepeatString("abc") -> 'abc'
// toRepeatString("abc",-1) -> 'abc'
// toRepeatString() -> ''
// toRepeatString(undefined,3) -> ''
```
