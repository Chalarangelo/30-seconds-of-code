---
title: depth-first-search
tags: search,function,beginner
---

This function takes in a single node from a graph of nodes.
This function also takes in a value it will use to find a node in the graph that has that value using Depth First Search (DFS).
The default return value is null, so if the entire graph is searched or a `null` value is passed
in to the `value` parameter, then the function will return a value of `null` for no matching node found.
(unless of course a Node with a value of `null` exists in the graph, in which case, that Node will be returned).
If the `node` passed into the function is `null` the function will return `null`.


- Initialize an empty stack.
- flag initial node as visited (use flags to avoid re-adding nodes to stack causing infinite loops).
- begin while loop.
- pop a node of the stack, check if it's value matches the value param, if so set it to foundNode and short-circuit the loop.
- otherwise, grab all `unVisited` nodes using `Array.prototype.filter()`
- set these `unVisited` nodes as now visited and add them to the stack.
- once the stack is empty or a match is found, return `foundNode`. 


```js
class Node {
  constructor(value, children = []) {
    this.value = value
    this.children = children;
    this.isVisited = false;
  }
}

const dfs = (value, node) => {
  if (node === undefined || node === null) return null;
  let foundNode = null;
  const stack = [];
  node.isVisited = true;
  stack.push(node);

  while((stack.length > 0) && (foundNode === null)) {
    let nextNode = stack.pop();
    if (nextNode.value === value) {
      foundNode = nextNode;
      continue;
    }
    const unVisitedChildren = nextNode.children.filter(child => !child.isVisited);
    unVisitedChildren.forEach(child => child.isVisited = true);
    stack.push(...unVisitedChildren);
  }
  return foundNode;
}
```

```js
const buildTestMap = () => {
  // Create Nodes
  const node1 = new Node(1);
  const node2 = new Node(2);
  const node3 = new Node(3);
  const node4 = new Node(4);
  const node5 = new Node(5);
  const node6 = new Node(6);
  const node7 = new Node(7);
  const node8 = new Node(8);
  const node9 = new Node(9);
  const node10 = new Node(10);
  const node11 = new Node(11);

  // Build out a test graph
  node1.children = [node2, node3, node4];
  node2.children = [node3, node4, node5];
  node3.children = [node5, node6];
  node5.children = [node6, node7];
  node6.children = [node7, node8];
  node8.children = [node10, node11];
  node10.children = [node9];
  return node1;
}

const entryNode = buildTestMap();
const foundNode = dfs(9, entryNode);
console.log(foundNode);
// Above console.log() outputs the following:
// Node { value: 9, children: [], isVisited: true }
```
