---
title: Solving Sudoku with wave function collapse in JavaScript
shortTitle: Sudoku Solver (Wave Function Collapse)
language: javascript
tags: [algorithm,array,recursion]
cover: snowy-mountains
excerpt: Explore how to solve Sudoku puzzles in JavaScript using the wave function collapse algorithm, a constraint-propagation technique.
listed: true
dateModified: 2025-08-25
---

In a previous article, we discussed how to validate a Sudoku board in JavaScript. Now, let's take it a step further and implement a Sudoku solver using the **wave function collapse** algorithm. This method, inspired by quantum mechanics, is not only efficient but also elegant, leveraging constraint propagation to fill in the board. Let's see how it works in JavaScript.

@[Quick refresher](/js/s/sudoku-validator)

## Approach

Wave function collapse is about **reducing possibilities**. Each empty cell starts with all possible digits (1-9). As we fill in cells, we **propagate constraints** to neighboring cells, shrinking their options. When a cell has only one possibility, we collapse it (set its value) and repeat the process.

This approach is similar to how you might solve Sudoku by hand: fill in what you know, then update the rest based on new information. The key steps are:

- Each **cell** is initialized with all possible values (1-9).
- When a cell is filled, we **propagate constraints** to update neighboring cells, removing impossible values.
- We **collapse** cells with only one possibility. If no such cells exist, we look for the cell with the **fewest possibilities** and fill it.
- If we reach a point where no cells can be filled, we **backtrack** and try different values for previously filled cells.
- The process continues until the board is completely filled or no solution exists.

## Implementation

Given the previous explanation, the implementation is straightforward. We'll create a function that initializes the board, finds cells with the fewest possibilities, and **recursively** fills in the board using the wave functio ncollapse technique.

```js
// List of all possible values for a Sudoku cell
const allValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Get used values in a row, column, and sub-box
const getUsedValues = (row, col, board) => {
  const usedValues = new Set();

  // Row and column checks
  for (let i = 0; i < 9; i++) {
    if (board[row][i] !== '.') usedValues.add(board[row][i]);
    if (board[i][col] !== '.') usedValues.add(board[i][col]);
  }

  // Sub-box check
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const value = board[boxRowStart + boxRow][boxColStart + boxCol];
      if (value !== '.') usedValues.add(value);
    }
  }

  return usedValues;
};

// Get possible values for a cell
const getPossibleValues = (row, col, board) => {
  if (board[row][col] !== '.') return [board[row][col]];

  const usedValues = getUsedValues(row, col, board);
  // Remove used values from all possible values (constraint propagation)
  return allValues.filter(value => !usedValues.has(value));
};

// Find cell with the fewest possibilities
const findCandidate = board => {
  let minOptions = 10, cellPosition = null, possibleValues = [];

  // Iterate through the board to find the cell with the fewest options
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Only consider empty cells
      if (board[row][col] === '.') {
        const options = getPossibleValues(row, col, board);

        // If the cell has fewer options than the current minimum, update
        if (options.length < minOptions) {
          minOptions = options.length;
          cellPosition = [row, col];
          possibleValues = options;

          // If the cell has only one option, we can return immediately
          if (minOptions === 1) return { cellPosition, possibleValues };
        }
      }
    }
  }

  // If a candidate cell is found, return its position and possible values
  // If no empty cells are found, return null
  return cellPosition ? { cellPosition, possibleValues } : null;
};

// Recursive solver
const solveRecursively = board => {
  const nextCell = findCandidate(board);
  // If no cell found, the board is solved
  if (!nextCell) return true;

  // Get the cell position and possible values
  const [row, col] = nextCell.cellPosition;

  // Try each possible value for the cell
  for (const value of nextCell.possibleValues) {
    board[row][col] = value;
    // Recursively attempt to solve the board with this value
    if (solveRecursively(board)) return true;
    // If it didn't work, reset the cell and try the next value
    board[row][col] = '.';
  }

  // If no value worked, return false to backtrack
  return false;
};

const solveSudoku = board => {
  // Deep copy to avoid mutating input
  const boardCopy = board.map(row => row.slice());
  // Start the recursive solving process
  solveRecursively(boardCopy);
  // Return the solved board
  return boardCopy;
};
```

This implementation is a little more complex than the previous validation code, but I've added **comments** to explain each step. Retrieving used values, propagating constraints and finding a candidate cell with the fewest possibilities are all pretty straightforward.

Oddly enough, the **recursive solving function** is where you need to pay attention, as it's subtle, even if it's not very long or complex-looking. What happens here is that each cell is examined for possible values, and if a value is chosen, the function calls itself recursively to continue solving the board.

If it reaches a point where no further cells can be filled, it backtracks by resetting the cell and trying the next value. This ultimately leads down a path of exploration that either leads to a solution or exhausts all possibilities.

## Performance

This approach is **efficient for most standard Sudoku puzzles**. The wave function collapse technique prunes the search space aggressively, often solving puzzles in very little time. However, for extremely hard or ambiguous boards, extensive backtracking may still be required, which can lead to longer solve times.

## Conclusion

The wave function collapse algorithm is a **powerful tool** that can be applied to various **constraint satisfaction problems**, including Sudoku. By leveraging constraint propagation and recursive backtracking, we can efficiently solve puzzles while maintaining clarity in our code. In addition, wave function collapse can be adapted to other problems, making it a versatile technique in algorithm design.


