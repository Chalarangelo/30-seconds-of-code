### trimNewLines

Removes new lines at the start and end of the string. The behaviour might be customize by changing the value of `spareStart` or `spareEnd`.

```js
const trimNewLines = (string,spareStart = false,spareEnd = false) => {
    str = string
    str = spareStart ? str : str.replace(/^([\n\r]*)/,'')
    str = spareEnd ? str : str.replace(/([\n\r]*)$/,'')
    return str
    }
```

```js
trimNewLines(`

Hello World

How are you?

```); // 'Hello World\nHow are you?'
```
