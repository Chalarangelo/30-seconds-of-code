---
title: Catch errors and try again
type: snippet
language: javascript
tags: [function, error]
cover: xinlingqudongX
dateModified: 2023-09-01T08:00:00-08:00
---

If there is an error during the execution of the function, it will be captured, and then the function will be re-run until the specified number of times is exceeded, and the data will be returned.

```js
async retryExecFunc(fn, { delay = 1000, retries = 3 } = {}) {
    return new Promise(async (resolve, reject) => {
        async function attempt() {
            let retryCount = 0;
            let err;

            while (retryCount < retries) {
                try {
                    let result;
                    if (fn.constructor.name === 'AsyncFunction') {
                        result = await fn()
                    } else {
                        result = fn()
                    }
                    resolve(result);
                    return;
                } catch (error) {
                    err = error;
                    retryCount++;
                    await new Promise(resolve=>setTimeout(resolve, delay))
                }
            }

            reject(err)
        }

        attempt();
    })
}
```