---
title: removeAccents
tags: string,beginner
---

Removes accents from strings.

- Uses a set of known accents for all vowels.
- Iterates through the characters, replacing the accentued ones for its unaccentuated form.

```js
const removeAccents = (string) => {
  const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖòóôõöÈÉÊËèéêëÌÍÎÏìíîïÙÚÛÜùúûü';
  const noAccents = 'AAAAAAaaaaaaOOOOOOoooooEEEEeeeeIIIIiiiiUUUUuuuu';

  let splitted = string.split('');

  splitted = splitted.map((char) => {
    const pos = accents.indexOf(char);
    return (pos >= 0 ? noAccents[pos] : char);
  });

  const newString = splitted.join('');

  return newString;
}
```

```js
removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'
```
