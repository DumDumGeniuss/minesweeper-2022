import { Field, Coordinate } from './types';

export function getMinesCount(field: Field) {
  let count = 0;
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      if (field[i][j].hasMines) {
        count += 1;
      }
    }
  }
  return count;
}

export function getCoordOfFirstMatchedArea(
  field: Field,
  options: {
    hasMines?: boolean;
    revealed?: boolean;
    adjMinesCount?: number;
  }
): Coordinate {
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      const { hasMines, revealed, adjMinesCount } = field[i][j];
      const hasMinesDoesmatch =
        options.hasMines === undefined || hasMines === options.hasMines;
      const revealedDoesmatch =
        options.revealed === undefined || revealed === options.revealed;
      const adjMinesCountDoesmatch =
        options.adjMinesCount === undefined ||
        adjMinesCount === options.adjMinesCount;

      if (hasMinesDoesmatch && revealedDoesmatch && adjMinesCountDoesmatch) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}
