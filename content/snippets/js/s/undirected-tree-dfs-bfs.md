---
title: How can I traverse an undirected tree using DFS or BFS in JavaScript?
shortTitle: DFS/BFS tree traversal
language: javascript
tags: [algorithm,array]
cover: japanese-cityscape
excerpt: Learn how to traverse an undirected tree using Depth-First Search (DFS) or Breadth-First Search (BFS) in JavaScript.
listed: true
dateModified: 2025-07-17
---

In the [previous article](/js/s/undirected-tree-from-edges), we explored how to build an undirected tree from an array of edges in JavaScript. Now, let's look at how to traverse this tree using **Depth-First Search (DFS)** and **Breadth-First Search (BFS)** algorithms.

@[Quick refresher](/js/s/undirected-tree-from-edges)

Note that we'll be using the same tree as in the last article:

![Undirected Tree visualization](./illustrations/undirected-tree.svg)

This tree would correspond to the following edges array and `Map` representation:

```js
const edges = [ [0, 1], [0, 2], [2, 3], [2, 4] ];

const graphMap = new Map([
  [0, [1, 2]],
  [1, [0]],
  [2, [0, 3, 4]],
  [3, [2]],
  [4, [2]]
]);
```

## Depth-First Search (DFS)

Depth-First Search (DFS) is a traversal algorithm that explores **as far as possible along each branch before backtracking**. DFS can be implemented **recursively or iteratively**, using an explicit stack. I find the iterative approach to be more efficient and easier to understand, so I'll focus on that here.

@[Quick refresher](/js/s/data-structures-stack)

```js
const dfs = (graph, start, process) => {
  const stack = [start];
  const visited = new Set();

  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;

    visited.add(node);
    process(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors)
      if (!visited.has(neighbor)) stack.push(neighbor);
  }
};

dfs(graphMap, 0, node => console.log(node));
// LOGS: 0, 2, 4, 3, 1
```

This implementation uses a **stack** to keep track of the nodes to visit. It starts from the `start` node, processes it, and then pushes its unvisited neighbors onto the stack. The process continues until all reachable nodes are visited.

## Breadth-First Search (BFS)

Breadth-First Search (BFS) is a traversal algorithm that explores **all the neighbors of a node before moving on to the next level**. It can be implemented using a queue.

@[Quick refresher](/js/s/data-structures-queue)

```js
const bfs = (graph, start, process) => {
  const queue = [start];
  const visited = new Set();

  while (queue.length) {
    const node = queue.shift();
    if (visited.has(node)) continue;

    visited.add(node);
    process(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors)
      if (!visited.has(neighbor)) queue.push(neighbor);
  }
};

bfs(graphMap, 0, node => console.log(node));
// LOGS: 0, 1, 2, 3, 4
```

This implementation uses a **queue** to keep track of the nodes to visit. It starts from the `start` node, processes it, and then adds its unvisited neighbors to the queue. The process continues until all reachable nodes are visited.

## Conclusion

Both DFS and BFS are powerful algorithms for traversing trees and graphs. The choice between them depends on the specific requirements of your application. DFS is often more memory-efficient for deep trees, while BFS is better for finding the shortest path in unweighted graphs. I hope you enjoyed this article and that it will help you in your JavaScript journey! ⛵
