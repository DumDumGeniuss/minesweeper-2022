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
() => Progress;
```

This method will restart the game and return new game progress.

## Minesweeper.getProgress()

```typescript
() => Progress;
```

Get progress of the game, this will include statue, areas map, etc.

## Minesweeper.revealArea()

```typescript
revealArea(coord: Coordinate) => Progress
```

Reveal the area at the given coordiante and return updated game progress, it has 3 possible cases:

1. Reveal an area with mines, the mission will fail and all areas will be revealed.

2. Reveal an area without mines, if that area has no surrounded mines, we will recursively reveal its adjacent areas until an area with adjacent mines is found.

3. If you reveal an area for the very first time, we randomly plant mines of the given count and do step 2.

```typescript
const game = new Minesweeper({ width: 10, height: 10 }, 10, null);

// Reveal area at (0, 0), this will plant mines and start the game.
game.revealArea([0, 0]);

// Reveal area at (5, 5), let's assume this area has no adjacent mines, so we keep revealing its adjacent areas.
game.revealArea([5, 5]);

// Reveal area at (7, 7), let's assume this area has mines, so the mission will fail and all areas will be revealed.
game.revealArea([7, 7]);
```

## Minesweeper.destroy()

```typescript
destroy();
```

Clear all timers.
