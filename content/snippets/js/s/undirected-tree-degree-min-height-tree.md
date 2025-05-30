---
title: How can I find the minimum height tree in an undirected tree in JavaScript?
shortTitle: Minimum height undirected tree
language: javascript
tags: [algorithm,array]
cover: cozy-cafe
excerpt: Using the degree of nodes, we can employ a very efficient algorithmic trick to find the minimum height tree in an undirected tree in JavaScript.
listed: true
dateModified: 2025-08-07
---

Given the previous articles on [how to build an undirected tree from edges](/js/s/undirected-tree-from-edges) and [how to traverse it using DFS or BFS](/js/s/undirected-tree-dfs-bfs), we continue our exploration of undirected trees in JavaScript. This time, we will focus on how to find the **minimum height tree** using the degree of nodes.

@[Quick refresher](/js/s/undirected-tree-from-edges)

## Node degrees

The degree of a node in an undirected tree is the number of edges connected to it. Note that, as the tree is undirected, there is no indegree or outdegree; the degree is simply the count of edges connected to that node.

Let's look at the by now familiar undirected tree example:

![Undirected Tree visualization](./illustrations/undirected-tree.svg)

This tree's edges array and `Map` representation are as follows:

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

And, finally, we can calculate the degrees, by applying using `Array.prototype.length` on the neighbors of each node:

```js
const degrees = new Map(
  [...graphMap.entries()].
    map(([node, neighbors]) => [node, neighbors.length])
);
// Map(5) { 0 => 2, 1 => 1, 2 => 3, 3 => 1, 4 => 1 }
```

## Minimum height tree

Given a tree, the **minimum height tree** is defined as the tree that has the **minimum number of edges from the root to any leaf node**. In other words, it is the tree that minimizes the height of the tree.

For our example, this would be a tree with a height of `2`, which can be created from either node `0` or node `2` as the root:

![Minimum Height Tree visualization](./illustrations/undirected-tree-min-height.svg)

_How many such trees can be created?_ Turns out that our previous [diameter definition](/js/s/undirected-tree-diameter) can come in handy here. After considering the diameter, we can deduce that the minimum height tree will have either **1 or 2 roots**:

- If the number of nodes is odd (hence an even diameter), there will be **1 root** (the center of the tree).
- If the number of nodes is even (hence an odd diameter), there will be **2 roots** (the two central nodes of the tree).

While this doesn't solve the problem, it helps us narrow down the expected results.

@[Quick refresher](/js/s/undirected-tree-diameter)

## Implementation

The key insight to this problem comes from the fact that **the minimum height tree can be found by removing leaf nodes iteratively**. A leaf node is defined as a node with a degree of `1` (i.e., it has only one edge connected to it).

Using this insight, we can efficiently find the minimum height tree by iteratively removing leaf nodes until we are left with either one or two nodes. These remaining nodes will be the roots of the minimum height tree.

```js
const minHeightTree = graph => {
  if (graph.size === 1) return [0];

  let queue = [];
  let graphSet = new Map();
  let remainingNodes = graph.size;

  for (let [node, neighbors] of graph) {
    graphSet.set(node, new Set(neighbors));
    if (neighbors.length === 1) queue.push(node);
  }

  while (remainingNodes > 2) {
    remainingNodes -= queue.length;

    const nextQueue = [];

    for (const node of queue) {
      const neighbors = graphSet.get(node) || new Set();

      for (const neighbor of neighbors) {
        graphSet.get(neighbor)?.delete(node);

        if (graphSet.get(neighbor).size === 1)
          nextQueue.push(neighbor);
      }
    }
    queue = nextQueue;
  }

  return queue;
};

minHeightTree(graphMap);
// [0, 2]
```

As you can see, we start by initializing a queue with all the leaf nodes. We then iteratively remove them and update the degrees of their neighbors. If a neighbor becomes a leaf node (i.e. its degree becomes `1`), we add it to the next queue.

Notice that we use a `Set` to efficiently manage the neighbors and their degrees, as it makes node removal and existence checks faster and easier. Finally, when we are left with either **one or two nodes in the queue**, we return them as we have found the roots of the minimum height trees.

## Conclusion

While minimum height trees may seem intimidating at first, they're actually quite a straightforward problem to solve using the concept of node degrees and iterative leaf removal. By understanding the properties of the data structure, we can unlock efficient and elegant solutions to complex problems. Hope this helps you in your future projects and algorithms involving trees in JavaScript! 🏄‍♀️
