---
title: Async Promise Execution in Limited Parallelism
type: snippet
language: javascript
tags: [async, promise]
cover: orange-coffee-4
dateModified: 2023-08-21T10:15:00+00:00
---

Execute an array of asynchronous tasks with limited parallelism, ensuring that only a specific number of promises run concurrently. 

- `runWithLimitedParallelism` function executes the tasks with a limited number of promises running in parallel.
- The function uses `async/await` and `Promise.all` to manage the parallel execution of promises. 
- It iterates over the tasks, creating a queue of promises that are being executed concurrently, up to the specified limit.

```js
async function runWithLimitedParallelism(tasks, limit) {
  const results = [];
  const queue = [];

  for (const task of tasks) {
    const promise = task();
    queue.push(promise);

    if (queue.length >= limit) {
      const completedPromise = queue.shift();
      results.push(await completedPromise);
    }
  }

  // Wait for the remaining promises to complete
  results.push(...await Promise.all(queue));

  return results;
}
```

**Practical Usage:**

You can use this function to fetch multiple API endpoints concurrently while controlling the maximum number of simultaneous requests. For instance:

```js
const fetchUsers = async () => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
  return "User Data";
};

const tasks = Array.from({ length: 10 }, () => fetchUsers);

const limit = 3; // Run up to 3 tasks in parallel
const results = await runWithLimitedParallelism(tasks, limit);

console.log(results); // An array of fetched user data
```

By setting the limit variable, you can control how many tasks run concurrently, preventing potential performance issues due to excessive simultaneous requests.
