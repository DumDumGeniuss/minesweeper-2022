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

export function getFirstCoordWithUnrevealedMine(field: Field): Coordinate {
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      if (field[i][j].hasMines && !field[i][j].revealed) {
        return [i, j];
      }
    }
  }

  return [-1, -1];
}

export function getFirstCoordOfUnrevealedArea(field: Field): Coordinate {
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      if (!field[i][j].revealed) {
        return [i, j];
      }
    }
  }

  return [-1, -1];
}
