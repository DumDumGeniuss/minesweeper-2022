import { CellMap, Coordinate } from './types';

export function getMineCount(cellMap: CellMap) {
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
  cellMap: CellMap,
  options: {
    hasMine?: boolean;
    revealed?: boolean;
    adjMinesCount?: number;
  }
): Coordinate {
  for (let i = 0; i < cellMap.length; i += 1) {
    for (let j = 0; j < cellMap[i].length; j += 1) {
      const { hasMine, revealed, adjMinesCount } = cellMap[i][j];
      const hasMineDoesmatch =
        options.hasMine === undefined || hasMine === options.hasMine;
      const revealedDoesmatch =
        options.revealed === undefined || revealed === options.revealed;
      const adjMinesCountDoesmatch =
        options.adjMinesCount === undefined ||
        adjMinesCount === options.adjMinesCount;

      if (hasMineDoesmatch && revealedDoesmatch && adjMinesCountDoesmatch) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}
