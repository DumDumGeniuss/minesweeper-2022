import { Cell, Size, Status, Coordinate } from './types';

export const getOutsideBorderError = (c: Coordinate) =>
  Error(`Coordinate (${c[0]}, ${c[1]}) is outside border.`);

export const getIncorrectSizeError = () =>
  Error('Either width or height cannot be less than 0.');

export const getTooManyMinesError = () =>
  Error('Mine count must be less than number of total cells in cellMap.');

export const getIncorrectMinesCountError = () =>
  Error('The mine count cannot be less than 1.');

export const getHasBeenRevealedError = (c: Coordinate) =>
  Error(`The cell at (${c[0]}, ${c[1]}) has been revealed.`);

export const getGameHasEndedError = () => Error('The game has ended.');

class Minesweeper {
  private cellMap: Cell[][] = [];

  private mineCount: number = 0;

  private size: Size = { width: 0, height: 0 };

  private status: Status = 'WAITING';

  constructor(size: Size, mineCount: number) {
    this.size = size;
    this.mineCount = mineCount;

    if (this.size.width < 0 || this.size.height < 0) {
      throw getIncorrectSizeError();
    }

    if (this.mineCount >= this.size.width * this.size.height) {
      throw getTooManyMinesError();
    }
    if (this.mineCount < 1) {
      throw getIncorrectMinesCountError();
    }

    this.reset();
  }

  private isOutsideBorder(c: Coordinate): boolean {
    const [x, y] = c;
    return x < 0 || x >= this.size.width || y < 0 || y >= this.size.height;
  }

  getStatus(): Status {
    return this.status;
  }

  getCellMap(): Cell[][] {
    return this.cellMap;
  }

  reset() {
    this.status = 'WAITING';

    this.cellMap = [];
    for (let x = 0; x < this.size.width; x += 1) {
      this.cellMap[x] = [];
      for (let y = 0; y < this.size.height; y += 1) {
        this.cellMap[x][y] = {
          hasMine: false,
          adjacentMines: 0,
          revealed: false,
          boomed: false,
        };
      }
    }

    return this.cellMap;
  }

  // Reveal a mine cell.
  private revealMineCell(c: Coordinate) {
    const [x, y] = c;
    this.revealAllCells();
    this.status = 'FAILED';
    this.cellMap[x][y].boomed = true;
  }

  // Reveal a non-mine cell.
  private revealNonMineCell(c: Coordinate) {
    const visitedMap: { [key: string]: true } = {};
    const minesToReveal: Coordinate[] = [];
    minesToReveal.push(c);

    while (minesToReveal.length > 0) {
      // @ts-ignore Weird TS complaints, need to sort this out later.
      const [x, y] = minesToReveal.pop();
      const coordKey = `${x},${y}`;

      if (!visitedMap[coordKey]) {
        visitedMap[coordKey] = true;

        if (!this.cellMap[x][y].hasMine && !this.cellMap[x][y].revealed) {
          // Set cell as revealed.
          this.cellMap[x][y].revealed = true;

          if (this.cellMap[x][y].adjacentMines === 0) {
            for (let i = x - 1; i <= x + 1; i += 1) {
              for (let j = y - 1; j <= y + 1; j += 1) {
                const isCenterCoord = i === x && j === y;
                if (!isCenterCoord && !this.isOutsideBorder([i, j])) {
                  minesToReveal.unshift([i, j]);
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Reveal a cell.
   * @param c Coordinate
   */
  revealCell(c: Coordinate) {
    if (this.status === 'FAILED' || this.status === 'SUCCEEDED') {
      throw getGameHasEndedError();
    }
    const [x, y] = c;
    if (this.isOutsideBorder(c)) {
      throw getOutsideBorderError(c);
    }
    if (this.cellMap[x][y].revealed) {
      throw getHasBeenRevealedError(c);
    }

    if (this.cellMap[x][y].hasMine) {
      // When clicking a mine cell.
      this.revealMineCell(c);
    } else if (this.status === 'WAITING') {
      // When clicking a non-mine cell for the very first time.
      this.plantMines(c);
      this.status = 'STARTED';
      this.revealNonMineCell(c);
    } else {
      this.revealNonMineCell(c);
    }
  }

  private plantMine(c: Coordinate) {
    const [x, y] = c;
    this.cellMap[x][y].hasMine = true;

    // Update adjacent mine count
    for (let i = x - 1; i <= x + 1; i += 1) {
      for (let j = y - 1; j <= y + 1; j += 1) {
        const isMineCoord = i === x && j === y;
        if (!isMineCoord && !this.isOutsideBorder([i, j])) {
          this.cellMap[i][j].adjacentMines += 1;
        }
      }
    }
  }

  /**
   * Plant mines and calculate adjacent mine counts of all cells.
   */
  private plantMines(excluededCoord: Coordinate) {
    let plantedMinesCount = 0;
    const [excludedX, excludedY] = excluededCoord;

    while (plantedMinesCount < this.mineCount) {
      const x: number = Math.floor(Math.random() * this.size.width);
      const y: number = Math.floor(Math.random() * this.size.height);
      const { hasMine, revealed } = this.cellMap[x][y];
      const isExcludedCoord = x === excludedX && y === excludedY;
      if (!isExcludedCoord && !hasMine && !revealed) {
        this.plantMine([x, y]);
        plantedMinesCount += 1;
      }
    }
  }

  private revealAllCells() {
    for (let x = 0; x < this.size.width; x += 1) {
      for (let y = 0; y < this.size.height; y += 1) {
        this.cellMap[x][y].revealed = true;
      }
    }
  }
}

export default Minesweeper;
