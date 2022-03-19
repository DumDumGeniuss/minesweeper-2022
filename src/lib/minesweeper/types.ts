/**
 * Cell
 * @field hasMine boolean Does this cell has a mine?
 * @field adjacentMines number How many adjaent mines does this cell has?
 * @field revealed boolean Has this cell been revealed?
 * @field boomed boolean Have you revealed this cell when it has a mine?
 */
export type Cell = {
  hasMine: boolean;
  adjacentMines: number;
  revealed: boolean;
  boomed: boolean;
};

export type Size = {
  width: number;
  height: number;
};

export type Status = 'WAITING' | 'STARTED' | 'SUCCEEDED' | 'FAILED';

export type Coordinate = [number, number];
