### insertIntoBST

Inserts a new node into binary tree.

Creates and inserts new node into existing tree With the help of `createBST` function.

```js
const createBST = value => ({value: value, right: null, left: null});
const insertIntoBST = (tree, value) => {
  if (value <= tree.value) {
    if(!tree.left) tree.left = createBST(value)
    else tree.left.insert(value);
  }
  else if (value > tree.value) {
    if(!tree.right) tree.right = createBST(value)
    else tree.right.insert(value);
  }
}
```

```js
const tree = createBST(8);
insertIntoBST(tree, 3); // 'Creates and inserts new node with a value of 3 to the existing tree with root 8 '
```
