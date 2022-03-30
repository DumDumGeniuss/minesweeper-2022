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

  private iterateField(callback: (c: Coordinate) => any) {
    for (let x = 0; x < this.size.width; x += 1) {
      for (let y = 0; y < this.size.height; y += 1) {
        callback([x, y]);
      }
    }
  }

  private iterateAdjacentAreas(
    origin: Coordinate,
    callback: (c: Coordinate) => any
  ) {
    const [x, y] = origin;
    for (let i = x - 1; i <= x + 1; i += 1) {
      for (let j = y - 1; j <= y + 1; j += 1) {
        const isCenterCoord = i === x && j === y;
        if (!isCenterCoord && !this.isCoordinateOutsideField([i, j])) {
          callback([i, j]);
        }
      }
    }
  }

  private getAreaAdjMinesCount(c: Coordinate) {
    const [x, y] = c;
    return this.field[x][y].adjMinesCount;
  }

  private isCoordinateOutsideField(c: Coordinate): boolean {
    const [x, y] = c;
    return x < 0 || x >= this.size.width || y < 0 || y >= this.size.height;
  }

  private isGameEnded() {
    return this.status === 'FAILED' || this.status === 'SUCCEEDED';
  }

  private isGameSleeping() {
    return this.status === 'SLEEPING';
  }

  private isAreaHasMines(c: Coordinate): boolean {
    const [x, y] = c;
    return this.field[x][y].hasMines;
  }

  private isAreaRevealed(c: Coordinate): boolean {
    const [x, y] = c;
    return this.field[x][y].revealed;
  }

  private isAreaFlagged(c: Coordinate): boolean {
    const [x, y] = c;
    return this.field[x][y].flagged;
  }

  private setDuration(duration: number) {
    this.duration = duration;
    this.emitDurationChangeEvents();
  }

  private setGameToStarted() {
    this.status = 'STARTED';
    this.startDurationCounter();
  }

  private setGameToFailed() {
    this.status = 'FAILED';
    this.stopDurationCounter();
  }

  private setGameToSucceeded() {
    this.status = 'SUCCEEDED';
    this.stopDurationCounter();
  }

  private setGameToSleeping() {
    this.status = 'SLEEPING';
    this.stopDurationCounter();
  }

  private setAreaBoomedToTrue(c: Coordinate) {
    const [x, y] = c;
    this.field[x][y].boomed = true;
  }

  private setAreaFlaggedToTrue(c: Coordinate) {
    const [x, y] = c;
    this.field[x][y].flagged = true;
    this.flagsCount += 1;
  }

  private setAreaFlaggedToFalse(c: Coordinate) {
    const [x, y] = c;
    this.field[x][y].flagged = false;
    this.flagsCount -= 1;
  }

  private setAreaRevealedToTrue(c: Coordinate) {
    const [x, y] = c;
    this.field[x][y].revealed = true;
    this.revealedAreaCount += 1;
  }

  private setAreaHasMinesToTrue(c: Coordinate) {
    const [x, y] = c;
    this.field[x][y].hasMines = true;
  }

  private setAllAreasToBeRevealed() {
    this.iterateField((c: Coordinate) => this.setAreaRevealedToTrue(c));
  }

  private startDurationCounter() {
    this.counter = setInterval(() => {
      this.setDuration(this.duration + 1);
    }, 1000);
  }

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

  private revealAreaWithMines(c: Coordinate) {
    this.setAreaBoomedToTrue(c);
    this.setAllAreasToBeRevealed();
    this.setGameToFailed();
  }

  /**
   * Reveal an area without mines, also recursively reveal all adjecent areas
   * also without mines.
   * @param c
   */
  private revealAreaWithoutMines(c: Coordinate) {
    const visitedAreaMap: { [coordKey: string]: true } = {};
    const minesToReveal: Coordinate[] = [];
    minesToReveal.push(c);

    while (minesToReveal.length > 0) {
      // @ts-ignore Weird TS complaints, need to sort this out later.
      const nextCoord: Coordinate = minesToReveal.pop();
      const coordKey = `${nextCoord[0]},${nextCoord[1]}`;

      const isTheAreaVisited = visitedAreaMap[coordKey];
      if (!isTheAreaVisited) {
        visitedAreaMap[coordKey] = true;

        const hasMines = this.isAreaHasMines(nextCoord);
        const flagged = this.isAreaFlagged(nextCoord);
        const revealed = this.isAreaRevealed(nextCoord);
        const adjMinesCount = this.getAreaAdjMinesCount(nextCoord);
        const doNotRevealThisArea = hasMines || revealed || flagged;
        if (!doNotRevealThisArea) {
          this.setAreaRevealedToTrue(nextCoord);

          const shallKeepTraversing = adjMinesCount === 0;
          if (shallKeepTraversing) {
            this.iterateAdjacentAreas(nextCoord, (adjAreaCoord: Coordinate) => {
              minesToReveal.unshift(adjAreaCoord);
            });
          }
        }
      }
    }

    const isGameCompletedSuccessfully =
      this.revealedAreaCount + this.minesCount ===
      this.size.width * this.size.height;
    if (isGameCompletedSuccessfully) {
      this.setGameToSucceeded();
      this.setAllAreasToBeRevealed();
    }
  }

  private plantMineAtArea(c: Coordinate) {
    this.setAreaHasMinesToTrue(c);
    this.iterateAdjacentAreas(c, (adjAreaCoord: Coordinate) => {
      const [adjAreaX, adjAreaY] = adjAreaCoord;
      this.field[adjAreaX][adjAreaY].adjMinesCount += 1;
    });
  }

  private randomlyPlantMinesOnField(coordToAvoid: Coordinate) {
    let plantedMinesCount = 0;
    const [coordToAvoidX, coordToAvoidY] = coordToAvoid;

    while (plantedMinesCount < this.minesCount) {
      const x: number = Math.floor(Math.random() * this.size.width);
      const y: number = Math.floor(Math.random() * this.size.height);
      const { hasMines, revealed } = this.field[x][y];
      const isCoordToAvoid = x === coordToAvoidX && y === coordToAvoidY;
      if (!isCoordToAvoid && !hasMines && !revealed) {
        this.plantMineAtArea([x, y]);
        plantedMinesCount += 1;
      }
    }
  }

  /**
   * Reset game.
   */
  reset(): Progress {
    this.setDuration(0);
    this.revealedAreaCount = 0;
    this.flagsCount = 0;
    this.setGameToSleeping();

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
   * Reveal an area.
   * @param c Coordinate
   */
  revealArea(c: Coordinate): Progress {
    if (this.isGameEnded()) {
      throw getGameHasEndedError();
    }
    if (this.isCoordinateOutsideField(c)) {
      throw getOutsideBorderError(c);
    }
    if (this.isAreaRevealed(c)) {
      throw getHasBeenRevealedError(c);
    }
    if (this.isAreaFlagged(c)) {
      throw getHasBeenFlaggedError(c);
    }

    if (this.isAreaHasMines(c)) {
      this.revealAreaWithMines(c);
    } else if (this.isGameSleeping()) {
      this.randomlyPlantMinesOnField(c);
      this.setGameToStarted();
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
    if (this.isGameEnded()) {
      throw getGameHasEndedError();
    }
    if (this.isCoordinateOutsideField(c)) {
      throw getOutsideBorderError(c);
    }
    if (this.isAreaRevealed(c)) {
      throw getHasBeenRevealedError(c);
    }
    if (this.isAreaFlagged(c)) {
      throw getHasBeenFlaggedError(c);
    }

    this.setAreaFlaggedToTrue(c);

    return this.getProgress();
  }

  /**
   * Unflag an area.
   * @param c Coordinate
   */
  unflagArea(c: Coordinate): Progress {
    if (this.isGameEnded()) {
      throw getGameHasEndedError();
    }
    if (this.isCoordinateOutsideField(c)) {
      throw getOutsideBorderError(c);
    }
    if (this.isAreaRevealed(c)) {
      throw getHasBeenRevealedError(c);
    }
    if (!this.isAreaFlagged(c)) {
      throw getHasNotBeenFlaggedError(c);
    }

    this.setAreaFlaggedToFalse(c);

    return this.getProgress();
  }

  destroy() {
    this.stopDurationCounter();
  }
}

export default Minesweeper;
export { EventType };
export type { Size, Progress, Coordinate, Field, Status };
