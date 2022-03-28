import { pause } from '@/utils/common';
import { Coordinate, Progress, EventType } from './types';
import Minesweeper, {
  getIncorrectSizeError,
  getTooManyMinesError,
  getIncorrectMinesCountError,
  getOutsideBorderError,
  getHasBeenRevealedError,
  getGameHasEndedError,
  getHasBeenFlaggedError,
  getHasNotBeenFlaggedError,
} from '.';
import {
  getMinesCount,
  getFirstCoordWithUnrevealedMine,
  getFirstCoordOfUnrevealedArea,
} from './utils';

describe('Minesweeper', () => {
  describe('constructor', () => {
    it('Should create new instance with all unrevealed areas.', () => {
      const game = new Minesweeper({ width: 2, height: 2 }, 1);
      const progress: Progress = game.revealArea([0, 0]);
      const minesCount = getMinesCount(progress.field);
      expect(minesCount).toEqual(1);
    });
    it('Should have no mines on initail map.', () => {
      const game = new Minesweeper({ width: 2, height: 2 }, 1);
      const progress = game.getProgress();
      const minesCount = getMinesCount(progress.field);
      expect(minesCount).toBe(0);
    });
    it('Should throw error when initializing with incorrect size.', () => {
      try {
        new Minesweeper({ width: -10, height: 30 }, 5);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getIncorrectSizeError().message);
      }
    });
    it('Should throw error when initializing with too many mines.', () => {
      try {
        new Minesweeper({ width: 5, height: 5 }, 26);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getTooManyMinesError().message);
      }
    });
    it('Should throw error when mines count is less than 1.', () => {
      try {
        new Minesweeper({ width: 5, height: 5 }, 0);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getIncorrectMinesCountError().message);
      }
    });
  });
  describe('reset', () => {
    it('Should reset game with no mines.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      // Let's reveal area to plant mines.
      let progress: Progress = game.revealArea([0, 0]);
      // Reset game
      progress = game.reset();
      const minesCount = getMinesCount(progress.field);

      expect(minesCount).toBe(0);
    });
  });
  describe('revealArea', () => {
    it('Should plant mimnes when first time cliking an area.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      const progress: Progress = game.revealArea([0, 0]);
      const minesCount = getMinesCount(progress.field);
      expect(minesCount).toBe(5);
    });
    it('Should throw error when coordinate is outside border.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      const c: Coordinate = [4, 4];
      try {
        game.revealArea(c);
      } catch (e: any) {
        expect(e.message).toBe(getOutsideBorderError(c).message);
      }
    });
    it('Should throw error when an area has been revealed.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 4);
      const c: Coordinate = [0, 0];
      game.revealArea(c);
      try {
        game.revealArea(c);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getHasBeenRevealedError(c).message);
      }
    });
    it('Should throw error when a game has ended and an area is revealed.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 1);
      const c: Coordinate = [0, 0];
      const progress: Progress = game.revealArea(c);
      const coord: Coordinate = getFirstCoordWithUnrevealedMine(progress.field);
      try {
        game.revealArea(coord);
        game.revealArea(coord);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getGameHasEndedError().message);
      }
    });
    it('Should reveal the area at the coordinate.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      let progress: Progress = game.getProgress();
      const coord: Coordinate = getFirstCoordOfUnrevealedArea(progress.field);
      progress = game.revealArea(coord);
      const [x, y] = coord;

      expect(progress.field[x][y].revealed).toBe(true);
    });
    it('Should end game when clicking a bomb.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 4);
      let progress: Progress = game.revealArea([0, 0]);
      const coord = getFirstCoordWithUnrevealedMine(game.getProgress().field);
      progress = game.revealArea(coord);
      const [x, y] = coord;

      expect(progress.status).toBe('FAILED');
      expect(progress.field[x][y].boomed).toBe(true);
    });
    it('Should set status to "SUCCEED" when all areas without mines have been revealed.', () => {
      const game = new Minesweeper({ width: 2, height: 1 }, 1);
      const progress: Progress = game.revealArea([0, 0]);

      expect(progress.status).toBe('SUCCEEDED');
    });
  });
  describe('flagArea', () => {
    it('Should set flagged of the area at the coordinate to true.', () => {
      const [x, y]: Coordinate = [0, 0];
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      const progress: Progress = game.flagArea([x, y]);
      expect(progress.field[x][y].flagged).toBe(true);
    });
    it('Should add flags count by 1.', () => {
      const [x, y]: Coordinate = [0, 0];
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      const progress: Progress = game.flagArea([x, y]);
      expect(progress.flagsCount).toBe(1);
    });
    it('Should trigger an error saying this area has been revealed.', () => {
      const [x, y]: Coordinate = [0, 0];
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      game.revealArea([x, y]);
      try {
        game.flagArea([x, y]);
        expect(false).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getHasBeenRevealedError([x, y]).message);
      }
    });
    it('Should trigger an error saying this area has been flagged.', () => {
      const [x, y]: Coordinate = [0, 0];
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      game.flagArea([x, y]);
      try {
        game.flagArea([x, y]);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getHasBeenFlaggedError([x, y]).message);
      }
    });
  });
  describe('unflagArea', () => {
    it('Should set flagged from the area at the coordinate to false.', () => {
      const [x, y]: Coordinate = [0, 0];
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      game.flagArea([x, y]);
      const progress: Progress = game.unflagArea([x, y]);
      expect(progress.field[0][0].flagged).toBe(false);
    });
    it('Should subtract flags count by 1.', () => {
      const [x, y]: Coordinate = [0, 0];
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      game.flagArea([x, y]);
      const progress: Progress = game.unflagArea([x, y]);
      expect(progress.flagsCount).toBe(0);
    });
    it('Should trigger an error saying this area has been flagged.', () => {
      const [x, y]: Coordinate = [0, 0];
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      try {
        game.unflagArea([x, y]);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getHasNotBeenFlaggedError([x, y]).message);
      }
    });
  });
  describe('subscribe', () => {
    it('Should call durationChange callback when it is subscribed to durationChange event.', async () => {
      const durationChangeListener = jest.fn();
      const game = new Minesweeper({ width: 2, height: 2 }, 1);
      game.subscribe(EventType.DurationChange, durationChangeListener);
      game.revealArea([0, 0]);
      await pause(2000);
      expect(durationChangeListener.mock.calls.length).toBeGreaterThan(0);
    });
  });
  describe('unsubscribe', () => {
    it('Should unsubscribe a callback when it is unsubscribed to durationChange event.', async () => {
      const durationChangeListener = jest.fn();
      const game = new Minesweeper({ width: 2, height: 2 }, 1);
      game.subscribe(EventType.DurationChange, durationChangeListener);
      game.revealArea([0, 0]);
      await pause(1010);
      const tmpCallsCount = durationChangeListener.mock.calls.length;
      game.unsubscribe(EventType.DurationChange, durationChangeListener);
      await pause(1010);
      expect(durationChangeListener.mock.calls.length).toBe(tmpCallsCount);
    });
  });
  describe('destroy', () => {
    it('Should stop emitting any events after destroy is called.', async () => {
      const durationChangeListener = jest.fn();
      const game = new Minesweeper({ width: 2, height: 2 }, 1);
      game.subscribe(EventType.DurationChange, durationChangeListener);
      game.revealArea([0, 0]);
      await pause(1010);
      const tmpCallsCount = durationChangeListener.mock.calls.length;
      game.destroy();
      await pause(1010);
      expect(durationChangeListener.mock.calls.length).toBe(tmpCallsCount);
    });
  });
});
