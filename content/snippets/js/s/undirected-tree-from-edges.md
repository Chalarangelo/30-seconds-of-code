---
title: How can I build an undirected tree from an array of edges in JavaScript?
shortTitle: Undirected tree from edges
language: javascript
tags: [array]
cover: walking-sunrise
excerpt: Learn how to build an undirected tree from an array of edges in JavaScript, with various approaches for storing node relationships.
listed: true
dateModified: 2025-07-10
---

It's no secret that I've been solving LeetCode problems for a little while now. A pretty common requirement for solving many of these problems is **parsing an array of edges to build an undirected tree**. It's a pretty straightforward task, but I thought it would be useful to share a simple implementation in JavaScript, one I find myself reusing over and over again.

@[Quick refresher](/js/s/data-structures-tree)

## Undirected trees

Before we delve into the code, I'd like to note that, for a tree with `n` **vertices**, the number of **edges** is exactly `n - 1`. This is a fundamental property of trees, and it helps us ensure that we are indeed building a **valid tree structure**. It can also help us allocate memory, if we so desire.

> [!TIP]
>
> This, in fact, is a very practical tip for traversing the tree in some cases, especially if you can skip building it altogether. If you're smart about it, you can increase performance like this and save up on memory, too!

Let's also have an example of an undirected tree, so we can visualize what we're building:

![Undirected Tree visualization](./illustrations/undirected-tree.svg)

This tree would corresponds to the following edges array:

```js
const edges = [ [0, 1], [0, 2], [2, 3], [2, 4] ];
```

## Building the tree

In most cases, one can simply get away without creating a full data structure, like we've done in the [previous article](/js/s/data-structures-tree), but rather use a simple `Map` to represent the edges in a usable way. Each node will be a map key, and the corresponding value can be tweaked depending on your needs. Let's explore a few common approaches and their use cases.

### Children

By far the most common strategy is **storing only the node's children**. This allows us to easily traverse the tree downwards, which is often the most useful direction for many algorithms.

```js
const edgesToChildGraph = edges =>
  edges.reduce((acc, [a, b]) => {
    if (!acc.has(a)) acc.set(a, []);
    if (!acc.has(b)) acc.set(b, []);
    acc.get(a).push(b);
    return acc;
  }, new Map());

edgesToChildGraph(edges);
// Map(0 => [1, 2], 1 => [], 2 => [3, 4], 3 => [], 4 => [])
```

### Parent

When you need to traverse the tree upwards, it can be useful to **store only the node's parent**. This allows you to easily find the parent of any given node, which can be helpful in certain algorithms or when you need to backtrack.

```js
const edgesToParentGraph = edges =>
  edges.reduce((acc, [a, b]) => {
    acc.set(b, a);
    return acc;
  }, new Map());

edgesToParentGraph(edges);
// Map(1 => 0, 2 => 0, 3 => 2, 4 => 2)
```

### Parent and children

When you need to traverse the tree in both directions, it can be useful to **store both the node's parent and children**. This allows you to easily navigate the tree in either direction, which can be helpful for certain algorithms or when you need to find all reachable nodes.

```js
const edgesToFullGraph = edges =>
  edges.reduce((acc, [a, b]) => {
    if (!acc.has(a)) acc.set(a, { parent: null, children: [] });
    if (!acc.has(b)) acc.set(b, { parent: null, children: [] });
    acc.get(a).children.push(b);
    acc.get(b).parent = a;
    return acc;
  }, new Map());

edgesToFullGraph(edges);
// Map(
//  0 => { parent: null, children: [1, 2] },
//  1 => { parent: 0, children: [] },
//  2 => { parent: 0, children: [3, 4] },
//  3 => { parent: 2, children: [] },
//  4 => { parent: 2, children: [] }
// )
```

### Reachable nodes

In the same vein, if you need to find all reachable nodes from a given node, you can **store all reachable nodes**, including the node itself. This is particularly useful for problems that require you to find all nodes within a certain distance from a starting node.

```js
const edgesToReachableGraph = edges =>
  edges.reduce((acc, [a, b]) => {
    if (!acc.has(a)) acc.set(a, [a]);
    if (!acc.has(b)) acc.set(b, [b]);
    acc.get(a).push(b);
    acc.get(b).push(a);
    return acc;
  }, new Map());

edgesToReachableGraph(edges);
// Map(
//  0 => [0, 1, 2],
//  1 => [1, 0],
//  2 => [2, 0, 3, 4],
//  3 => [3, 2],
//  4 => [4, 2]
// )
```

@[Further reading](/js/s/undirected-tree-dfs-bfs)

## Conclusion

Building an undirected tree from an array of edges in JavaScript can be done in various ways, depending on your specific needs. Whether you need to traverse the tree downwards, upwards, or in both directions, you can choose the appropriate structure to represent the tree. Hope this helps you in your coding journey, and feel free to adapt the code to suit your needs! 🏊‍♂️
