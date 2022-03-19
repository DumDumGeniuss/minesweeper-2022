import { Cell, Coordinate } from './types';

export function getMineCount(cellMap: Cell[][]) {
  let count = 0;
  for (let i = 0; i < cellMap.length; i += 1) {
    for (let j = 0; j < cellMap[i].length; j += 1) {
      if (cellMap[i][j].hasMine) {
        count += 1;
      }
    }
  }
  return count;
}

export function getCoordOfFirstMatchedCell(
  cellMap: Cell[][],
  options: {
    hasMine?: boolean;
    revealed?: boolean;
    adjacentMines?: number;
  }
): Coordinate {
  for (let i = 0; i < cellMap.length; i += 1) {
    for (let j = 0; j < cellMap[i].length; j += 1) {
      const { hasMine, revealed, adjacentMines } = cellMap[i][j];
      const hasMineDoesmatch =
        options.hasMine === undefined || hasMine === options.hasMine;
      const revealedDoesmatch =
        options.revealed === undefined || revealed === options.revealed;
      const adjacentMinesDoesmatch =
        options.adjacentMines === undefined ||
        adjacentMines === options.adjacentMines;

      if (hasMineDoesmatch && revealedDoesmatch && adjacentMinesDoesmatch) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}
