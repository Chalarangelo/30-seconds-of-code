---
title: How can I apply bipartite coloring to an undirected tree in JavaScript?
shortTitle: Undirected tree bipartite coloring
language: javascript
tags: [algorithm,array]
cover: laptop-notes
excerpt: Learn how to apply bipartite coloring to an undirected tree in JavaScript, ensuring that no two adjacent nodes share the same color.
listed: true
dateModified: 2025-07-24
---

We've already explored [how to build an undirected tree from edges](/js/s/undirected-tree-from-edges) and [how to traverse it using DFS or BFS](/js/s/undirected-tree-dfs-bfs). Now, let's look at how to apply **bipartite coloring** to an undirected tree in JavaScript, ensuring that no two adjacent nodes share the same color.

@[Quick refresher](/js/s/undirected-tree-from-edges)

## Bipartite coloring

Bipartite coloring is a way of coloring the nodes of a graph such that **no two adjacent nodes share the same color**. In the case of an undirected tree, this means that **each level of the tree can be colored with a different color**, ensuring that no two adjacent nodes (parent and child) share the same color.

Note that this is **always possible for trees**, as they are acyclic and connected graphs. The simplest way to achieve bipartite coloring is to use two colors, often represented as `0` and `1`.

Given the example presented in past articles, we can visualize the undirected tree as follows, with two colors applied:

![Undirected Tree Bipartite Coloring visualization](./illustrations/undirected-tree-bipartite-coloring.svg)

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

## Implementation

To implement bipartite coloring, we can use a simple **DFS or BFS traversal algorithm**. We'll maintain a `colors` map to store the color of each node as we traverse the tree. I prefer using BFS for this task, as it allows us to color the nodes level by level.

@[Quick refresher](/js/s/undirected-tree-dfs-bfs#breadth-first-search-bfs)

```js {3-4,8,12-15}
const bfsBipartiteColoring = (graph, root) => {
  const queue = [root];
  const colors = new Map();
  colors.set(root, 0);

  while (queue.length) {
    const node = queue.shift();
    const currentColor = colors.get(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors)
      if (!colors.has(neighbor)) {
        colors.set(neighbor, 1 - currentColor);
        queue.push(neighbor);
      }
  }

  return colors;
};

bfsBipartiteColoring(graphMap, 0);
// Map(0 => 0, 1 => 1, 2 => 1, 3 => 0, 4 => 0)
```

As with BFS traversal, we start from the **root node** (in this case, `0`) and assign it a color (let's say `0`). We then **traverse its neighbors**, assigning them the opposite color (`1`). This process continues until all nodes are colored.

The final `colors` map will contain the **color of each node**, but we could have applied this to the original graph map with some tweaking or built a map with colors as the keys and nodes as the values.

## Conclusion

Building on top of the undirected tree structure and traversal algorithms, bipartite coloring is a straightforward application that ensures no two adjacent nodes share the same color. This technique is particularly useful in various graph-related problems, such as scheduling and resource allocation, where conflicts must be avoided. Hopefully, it will help you in your future projects and algorithms involving trees and graphs in JavaScript! 🤿
