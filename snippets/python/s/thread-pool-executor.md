---
title: ThreadPoolExecutor
type: snippet
language: python
tags: [list, performance]
cover: case-study
dateModified: 2023-09-05T15:20:07.382Z
---

This snippet demonstrates the difference in execution time between normal execution and execution using the `ThreadPoolExecutor` class from Python's `concurrent.futures` module.

- Measure and compare the execution times for a set of tasks.
- Use a thread pool to execute tasks concurrently and compare the results.

```py
import concurrent.futures
import time

# Define a function that represents a task to be executed
def task_function(task_id):
  print(f"Task {task_id} started")
  # Simulate some time-consuming work
  time.sleep(2)  # Sleep for 2 seconds to simulate work
  result = task_id ** 2
  print(f"Task {task_id} finished with result: {result}")
  return result

def normal_execution():
  start_time = time.time()
  results = [task_function(i) for i in range(1, 6)]
  end_time = time.time()
  execution_time = end_time - start_time
  print("Normal Execution Time:", execution_time)
  print("Results:", results)

def thread_pool_execution():
  with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
    start_time = time.time()
    # Submit tasks to the executor and store the Future objects
    task_futures = [executor.submit(task_function, i) for i in range(1, 6)]

    # Wait for all tasks to complete and retrieve their results
    results = [future.result() for future in concurrent.futures.as_completed(task_futures)]
    end_time = time.time()
    execution_time = end_time - start_time
    print("ThreadPoolExecutor Execution Time:", execution_time)
    print("Results:", results)

if __name__ == "__main__":
  print("Normal Execution:")
  normal_execution()
  print("\nThreadPoolExecutor Execution:")
  thread_pool_execution()
```
