---
title: UUIDGeneratorUniversal
tags: node,browser,random,intermediate
---

Generates a UUID/GUID in Node.Js or browser.

- In the browser the script uses the `window.crypto` or `window.msCrypto` (IE11) API
- On server-side the script uses `Math.random` in combination with the timestamp for better randomness.
- The function can call with `.newGuid()` to get a random guid or with `.empty` to get an empty guid

```js
const Guid = () => {
    const crypto = typeof window  ||  window.crypto || window.msCrypto || null;
    const EMPTY = '00000000-0000-0000-0000-000000000000';
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

    const _padLeft = (paddingString, width, replacementChar) =>
        paddingString.length >= width
            ? paddingString
            : _padLeft(replacementChar + paddingString, width, replacementChar || ' ');

    const _s4 = number => {
        const hexadecimalResult = number.toString(16);
        return _padLeft(hexadecimalResult, 4, '0');
    };

    const _cryptoGuid = () => {
        const buffer = new window.Uint16Array(8);
        window.crypto.getRandomValues(buffer);
        return [_s4(buffer[0]) + _s4(buffer[1]), _s4(buffer[2]), _s4(buffer[3]), _s4(buffer[4]), _s4(buffer[5]) + _s4(buffer[6]) + _s4(buffer[7])].join('-');
    };

    const _guid = () => {
        let currentDateMilliseconds = new Date().getTime();
        return pattern.replace(/[xy]/g, currentChar => {
            const randomChar = (currentDateMilliseconds + Math.random() * 16) % 16 | 0;
            currentDateMilliseconds = Math.floor(currentDateMilliseconds / 16);
            return (currentChar === 'x' ? randomChar : (randomChar & 0x7 | 0x8)).toString(16);
        });
    };

    const create = () => {
        return crypto !== 'undefined' && crypto !== null
            ? typeof (window.crypto.getRandomValues) !== 'undefined'
                ? _cryptoGuid()
                : _guid()
            : _guid();
    };

    return {
        newGuid: create,
        empty: EMPTY
    };
}
```

```js
Guid().newGuid; // 'edc848db-3478-1760-8b55-7986003d895f'
Guid().empty; // '00000000-0000-0000-0000-000000000000'
```
