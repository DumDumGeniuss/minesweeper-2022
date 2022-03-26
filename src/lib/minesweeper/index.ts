import {
  Field,
  Size,
  Status,
  Coordinate,
  Progress,
  DurationChangeListener,
  EventType,
} from './types';

export const getOutsideBorderError = (c: Coordinate) =>
  Error(`Coordinate (${c[0]}, ${c[1]}) is outside border.`);

export const getIncorrectSizeError = () =>
  Error('Either width or height cannot be less than 0.');

export const getTooManyMinesError = () =>
  Error('Mine count must be less than number of total areas in field.');

export const getIncorrectMinesCountError = () =>
  Error('The mine count cannot be less than 1.');

export const getHasBeenRevealedError = (c: Coordinate) =>
  Error(`The area at (${c[0]}, ${c[1]}) has been revealed.`);

export const getHasBeenFlaggedError = (c: Coordinate) =>
  Error(`The area at (${c[0]}, ${c[1]}) has been flagged.`);

export const getHasNotBeenFlaggedError = (c: Coordinate) =>
  Error(`The area at (${c[0]}, ${c[1]}) has not been flagged.`);

export const getGameHasEndedError = () => Error('The game has ended.   ');

class Minesweeper {
  private field: Field = [];

  private minesCount: number = 0;

  private flagsCount: number = 0;

  private revealedAreaCount: number = 0;

  private size: Size = { width: 0, height: 0 };

  private status: Status = 'SLEEPING';

  private counter: NodeJS.Timer | null = null;

  private duration: number = 0;

  private durationChangeListeners: DurationChangeListener[] = [];

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

  private setDuration(duration: number) {
    this.duration = duration;
    this.emitDurationChangeEvents();
  }

  /**
   * This will create an interval that periodically updates the duration count.
   */
  private startDurationCounter() {
    this.counter = setInterval(() => {
      this.setDuration(this.duration + 1);
    }, 1000);
  }

  /**
   * This will clear the interval that periodically updates the duration count.
   */
  private stopDurationCounter() {
    if (this.counter) {
      clearInterval(this.counter);
    }
  }

  private emitDurationChangeEvents() {
    this.durationChangeListeners.forEach((sub) => {
      sub(this.duration);
    });
  }

  subscribe(e: EventType, callback: DurationChangeListener) {
    if (e === EventType.DurationChange) {
      this.durationChangeListeners.push(callback);
    }
  }

  unsubscribe(e: EventType, callback: DurationChangeListener) {
    if (e === EventType.DurationChange) {
      const callbackIdx = this.durationChangeListeners.indexOf(callback);
      this.durationChangeListeners.splice(callbackIdx, 1);
    }
  }

  /**
   * Game started.
   */
  private start() {
    this.status = 'STARTED';
    this.startDurationCounter();
  }

  /**
   * Game failed.
   */
  private fail() {
    this.status = 'FAILED';
    this.stopDurationCounter();
  }

  /**
   * Game succeeded.
   */
  private succeed() {
    this.status = 'SUCCEEDED';
    this.stopDurationCounter();
  }

  /**
   * Game not yet started.
   */
  private sleep() {
    this.status = 'SLEEPING';
    this.stopDurationCounter();
  }

  /**
   * Reset game.
   */
  reset(): Progress {
    this.setDuration(0);
    this.revealedAreaCount = 0;
    this.flagsCount = 0;
    this.sleep();

    this.field = [];
    for (let x = 0; x < this.size.width; x += 1) {
      this.field[x] = [];
      for (let y = 0; y < this.size.height; y += 1) {
        this.field[x][y] = {
          hasMines: false,
          adjMinesCount: 0,
          revealed: false,
          boomed: false,
          flagged: false,
          coord: [x, y],
        };
      }
    }

    return this.getProgress();
  }

  /**
   * Get game information.
   * @returns Progress
   */
  getProgress(): Progress {
    return {
      field: [...this.field],
      status: this.status,
      minesCount: this.minesCount,
      flagsCount: this.flagsCount,
      size: this.size,
      duration: this.duration,
    };
  }

  /**
   * Reveal an area with mines.
   * @param c
   */
  private revealAreaWithMines(c: Coordinate) {
    const [x, y] = c;
    this.field[x][y].boomed = true;
    this.setAllAreasRevealed();
    this.fail();
  }

  /**
   * Reveal an area without mines, also recursively reveal all adjecent areas
   * also without mines.
   * @param c
   */
  private revealAreaWithoutMines(c: Coordinate) {
    const visitedMap: { [key: string]: true } = {};
    const minesToReveal: Coordinate[] = [];
    minesToReveal.push(c);

    while (minesToReveal.length > 0) {
      // @ts-ignore Weird TS complaints, need to sort this out later.
      const [x, y] = minesToReveal.pop();
      const coordKey = `${x},${y}`;

      if (!visitedMap[coordKey]) {
        visitedMap[coordKey] = true;

        const { hasMines, revealed, flagged, adjMinesCount } = this.field[x][y];
        if (!hasMines && !revealed && !flagged) {
          this.setAreaRevealed([x, y]);

          if (adjMinesCount === 0) {
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

    // If all areas without mines have been revealed.
    if (
      this.revealedAreaCount + this.minesCount ===
      this.size.width * this.size.height
    ) {
      this.succeed();
      this.setAllAreasRevealed();
    }
  }

  /**
   * Reveal an area.
   * @param c Coordinate
   */
  revealArea(c: Coordinate): Progress {
    if (this.status === 'FAILED' || this.status === 'SUCCEEDED') {
      throw getGameHasEndedError();
    }
    const [x, y] = c;
    if (this.isOutsideBorder(c)) {
      throw getOutsideBorderError(c);
    }
    if (this.field[x][y].revealed) {
      throw getHasBeenRevealedError(c);
    }
    if (this.field[x][y].flagged) {
      throw getHasBeenFlaggedError(c);
    }

    if (this.field[x][y].hasMines) {
      this.revealAreaWithMines(c);
    } else if (this.status === 'SLEEPING') {
      this.plantMines(c);
      this.start();
      this.revealAreaWithoutMines(c);
    } else {
      this.revealAreaWithoutMines(c);
    }

    return this.getProgress();
  }

  /**
   * Flag an area.
   * @param c Coordinate
   */
  flagArea(c: Coordinate): Progress {
    if (this.status === 'FAILED' || this.status === 'SUCCEEDED') {
      throw getGameHasEndedError();
    }
    const [x, y] = c;
    if (this.isOutsideBorder(c)) {
      throw getOutsideBorderError(c);
    }
    if (this.field[x][y].revealed) {
      throw getHasBeenRevealedError(c);
    }
    if (this.field[x][y].flagged) {
      throw getHasBeenFlaggedError(c);
    }

    this.field[x][y].flagged = true;
    this.flagsCount += 1;

    return this.getProgress();
  }

  /**
   * Unflag an area.
   * @param c Coordinate
   */
  unflagArea(c: Coordinate): Progress {
    if (this.status === 'FAILED' || this.status === 'SUCCEEDED') {
      throw getGameHasEndedError();
    }
    const [x, y] = c;
    if (this.isOutsideBorder(c)) {
      throw getOutsideBorderError(c);
    }
    if (this.field[x][y].revealed) {
      throw getHasBeenRevealedError(c);
    }
    if (!this.field[x][y].flagged) {
      throw getHasNotBeenFlaggedError(c);
    }

    this.field[x][y].flagged = false;
    this.flagsCount -= 1;

    return this.getProgress();
  }

  /**
   * Plant mine at desired coodinate.
   * @param c Coordinate
   */
  private plantMine(c: Coordinate) {
    const [x, y] = c;
    this.field[x][y].hasMines = true;

    // Update adjacent mine count
    for (let i = x - 1; i <= x + 1; i += 1) {
      for (let j = y - 1; j <= y + 1; j += 1) {
        const isMineCoord = i === x && j === y;
        if (!isMineCoord && !this.isOutsideBorder([i, j])) {
          this.field[i][j].adjMinesCount += 1;
        }
      }
    }
  }

  /**
   * Randomly plant mines and calculate adjacent mine counts of all areas.
   */
  private plantMines(excluededCoord: Coordinate) {
    let plantedMinesCount = 0;
    const [excludedX, excludedY] = excluededCoord;

    while (plantedMinesCount < this.minesCount) {
      const x: number = Math.floor(Math.random() * this.size.width);
      const y: number = Math.floor(Math.random() * this.size.height);
      const { hasMines, revealed } = this.field[x][y];
      const isExcludedCoord = x === excludedX && y === excludedY;
      if (!isExcludedCoord && !hasMines && !revealed) {
        this.plantMine([x, y]);
        plantedMinesCount += 1;
      }
    }
  }

  /**
   * Set reveaved of the area to true.
   */
  private setAreaRevealed(c: Coordinate) {
    const [x, y] = c;
    this.field[x][y].revealed = true;
    this.revealedAreaCount += 1;
  }

  /**
   * Set reveaved of all areas to true.
   */
  private setAllAreasRevealed() {
    for (let x = 0; x < this.size.width; x += 1) {
      for (let y = 0; y < this.size.height; y += 1) {
        this.setAreaRevealed([x, y]);
      }
    }
  }

  destroy() {
    this.stopDurationCounter();
  }
}

export default Minesweeper;
export { EventType };
export type { Size, Progress, Coordinate, Field, Status };
