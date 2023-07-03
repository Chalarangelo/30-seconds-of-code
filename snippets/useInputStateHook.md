---
title: React hook to control form actions
tags: useState
author: sanchityadav2005
---



- Use `useState` to perform some specific tasks like reset the input feild, update the state.
import { useState } from "react";

```js
export default initalVal => {
    const [value, setValue] = useState(initalVal);
    const handleChange = e =>  {
        setValue(e.target.value)
    };
    const reset = () => {
        setValue("")
    }
    return [value, handleChange, reset]
}