import { CellMap, Size, Status, Coordinate, Progress } from './types';

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
  private cellMap: CellMap = [];

  private minesCount: number = 0;

  private revealedCellCount: number = 0;

  private size: Size = { width: 0, height: 0 };

  private status: Status = 'SLEEPING';

  private counter: NodeJS.Timer | null = null;

  private duration: number = 0;

  constructor(size: Size, minesCount: number) {
    this.size = size;
    this.minesCount = minesCount;

    if (this.size.width < 0 || this.size.height < 0) {
      throw getIncorrectSizeError();
    }

    if (this.minesCount >= this.size.width * this.size.height) {
      throw getTooManyMinesError();
    }
    if (this.minesCount < 1) {
      throw getIncorrectMinesCountError();
    }

    this.reset();
  }

  /**
   * Check if the coordinate is outside border.
   * @param c
   * @returns boolean
   */
  private isOutsideBorder(c: Coordinate): boolean {
    const [x, y] = c;
    return x < 0 || x >= this.size.width || y < 0 || y >= this.size.height;
  }

  /**
   * Get area of the map.
   * @returns number
   */
  private getArea(): number {
    return this.size.width * this.size.height;
  }

  private start() {
    this.status = 'STARTED';
    this.counter = setInterval(() => {
      this.duration += 1;
    }, 1000);
  }

  private fail() {
    this.status = 'FAILED';
    if (this.counter) {
      clearInterval(this.counter);
    }
  }

  private succeed() {
    this.status = 'SUCCEEDED';
    if (this.counter) {
      clearInterval(this.counter);
    }
  }

  private sleep() {
    this.status = 'SLEEPING';
    if (this.counter) {
      clearInterval(this.counter);
    }
  }

  /**
   * Get game information.
   * @returns Progress
   */
  getProgress(): Progress {
    return {
      cellMap: this.cellMap,
      status: this.status,
      minesCount: this.minesCount,
      size: this.size,
      duration: this.duration,
    };
  }

  /**
   * Reset game.
   */
  reset(): Progress {
    this.duration = 0;
    this.revealedCellCount = 0;
    this.sleep();

    this.cellMap = [];
    for (let x = 0; x < this.size.width; x += 1) {
      this.cellMap[x] = [];
      for (let y = 0; y < this.size.height; y += 1) {
        this.cellMap[x][y] = {
          key: `${x},${y}`,
          hasMine: false,
          adjMinesCount: 0,
          revealed: false,
          boomed: false,
        };
      }
    }

    return this.getProgress();
  }

  /**
   * Reveal a cell with mines.
   * @param c
   */
  private revealCellWithMines(c: Coordinate) {
    const [x, y] = c;
    this.cellMap[x][y].boomed = true;
    this.setAllCellsRevealed();
    this.fail();
  }

  /**
   * Reveal a cell without mines, also recursively reveal all adjecent cells
   * also without mines.
   * @param c
   */
  private revealCellWithoutMines(c: Coordinate) {
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
          this.setCellRevealed([x, y]);

          if (this.cellMap[x][y].adjMinesCount === 0) {
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

    // If all cells without mines have been revealed.
    if (this.revealedCellCount + this.minesCount === this.getArea()) {
      this.succeed();
      this.setAllCellsRevealed();
    }
  }

  /**
   * Reveal a cell.
   * @param c Coordinate
   */
  revealCell(c: Coordinate): Progress {
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
      this.revealCellWithMines(c);
    } else if (this.status === 'SLEEPING') {
      this.plantMines(c);
      this.start();
      this.revealCellWithoutMines(c);
    } else {
      this.revealCellWithoutMines(c);
    }

    return this.getProgress();
  }

  /**
   * Plant mine at desired coodinate.
   * @param c Coordinate
   */
  private plantMine(c: Coordinate) {
    const [x, y] = c;
    this.cellMap[x][y].hasMine = true;

    // Update adjacent mine count
    for (let i = x - 1; i <= x + 1; i += 1) {
      for (let j = y - 1; j <= y + 1; j += 1) {
        const isMineCoord = i === x && j === y;
        if (!isMineCoord && !this.isOutsideBorder([i, j])) {
          this.cellMap[i][j].adjMinesCount += 1;
        }
      }
    }
  }

  /**
   * Randomly plant mines and calculate adjacent mine counts of all cells.
   */
  private plantMines(excluededCoord: Coordinate) {
    let plantedMinesCount = 0;
    const [excludedX, excludedY] = excluededCoord;

    while (plantedMinesCount < this.minesCount) {
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

  /**
   * Set reveaved of the cell to true.
   */
  private setCellRevealed(c: Coordinate) {
    const [x, y] = c;
    this.cellMap[x][y].revealed = true;
    this.revealedCellCount += 1;
  }

  /**
   * Set reveaved of all cells to true.
   */
  private setAllCellsRevealed() {
    for (let x = 0; x < this.size.width; x += 1) {
      for (let y = 0; y < this.size.height; y += 1) {
        this.setCellRevealed([x, y]);
      }
    }
  }

  destroy() {
    if (this.counter) {
      clearInterval(this.counter);
    }
  }
}

export default Minesweeper;
export type { Progress, Coordinate, CellMap, Status };
