# Minesweeper class

Minesweeper is a class that manages everything in a Minesweeper game in terms of logic, lifycyle, etc.

## new Minesweeper()

```typescript
new Minesweeper(size: Size, minesCount: number, onDurationChange: (duration: number) => any)
```

Build a new Minesweeper game with given size and mines count, you can also subscribe to duration change.

```typescript
// Start a new game with size of (10 x 10) and 10 mines, and log the current duration on change.
const game = new Minesweeper(
  { width: 10, height: 10 },
  10,
  (duration: number) => {
    console.log(duration.)
  },
);
```

## Minesweeper.reset()

```typescript
reset() => Progress
```

This method will restart the game and return new game progress.

## Minesweeper.getProgress()

```typescript
getProgress() => Progress
```

Get progress of the game, this will include statue, cells map, etc.

## Minesweeper.revealCell()

```typescript
revealCell(coord: Coordinate) => Progress
```

Reveal the cell at the given coordiante and return updated game progress, it has 3 possible cases:

1. Reveal a cell with mines, the mission will fail and all cells will be revealed.

2. Reveal a cell without mines, if that cell has no surrounded mines, we will recursively reveal its adjacent cells until a cell with adjacent mines is found.

3. If you reveal a cell for the very first time, we randomly plant mines of the given count and do step 2.

```typescript
const game = new Minesweeper({ width: 10, height: 10 }, 10, null);

// Reveal cell at (0, 0), this will plant mines and start the game.
game.revealCell([0, 0]);

// Reveal cell at (5, 5), let's assume this cell has no adjacent mines, so we keep revealing its adjacent cells.
game.revealCell([5, 5]);

// Reveal cell at (7, 7), let's assume this cell has mines, so the mission will fail and all cells will be revealed.
game.revealCell([7, 7]);
```

## Minesweeper.destroy()

```typescript
destroy();
```

Clear all timers.
