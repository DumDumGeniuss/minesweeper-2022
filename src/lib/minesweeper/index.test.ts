import { pause } from '@/utils/common';
import { Coordinate, Progress } from './types';
import Minesweeper, {
  getIncorrectSizeError,
  getTooManyMinesError,
  getIncorrectMinesCountError,
  getOutsideBorderError,
  getHasBeenRevealedError,
  getGameHasEndedError,
} from '.';
import { getMinesCount, getCoordOfFirstMatchedArea } from './utils';

describe('Minesweeper', () => {
  describe('constructor', () => {
    it('Should create new instance with all unrevealed areas.', () => {
      const game = new Minesweeper({ width: 2, height: 2 }, 1, null);
      const progress: Progress = game.revealArea([0, 0]);
      const minesCount = getMinesCount(progress.field);
      expect(minesCount).toEqual(1);
    });
    it('Should have no mines on initail map.', () => {
      const game = new Minesweeper({ width: 2, height: 2 }, 1, null);
      const progress = game.getProgress();
      const minesCount = getMinesCount(progress.field);
      expect(minesCount).toBe(0);
    });
    it('Should periodically call onDurationChange callback.', async () => {
      const onDurationChange = jest.fn();
      const game = new Minesweeper(
        { width: 2, height: 2 },
        1,
        onDurationChange
      );
      game.revealArea([0, 0]);
      await pause(2);
      expect(onDurationChange.mock.calls.length).toBeGreaterThan(0);
    });
    it('Should throw error when initializing with incorrect size.', () => {
      try {
        new Minesweeper({ width: -10, height: 30 }, 5, null);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getIncorrectSizeError().message);
      }
    });
    it('Should throw error when initializing with too many mines.', () => {
      try {
        new Minesweeper({ width: 5, height: 5 }, 26, null);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getTooManyMinesError().message);
      }
    });
    it('Should throw error when mines count is less than 1.', () => {
      try {
        new Minesweeper({ width: 5, height: 5 }, 0, null);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getIncorrectMinesCountError().message);
      }
    });
  });
  describe('reset', () => {
    it('Should reset game with no mines.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5, null);
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
      const game = new Minesweeper({ width: 3, height: 3 }, 5, null);
      const progress: Progress = game.revealArea([0, 0]);
      const minesCount = getMinesCount(progress.field);
      expect(minesCount).toBe(5);
    });
    it('Should throw error when coordinate is outside border.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5, null);
      const c: Coordinate = [4, 4];
      try {
        game.revealArea(c);
      } catch (e: any) {
        expect(e.message).toBe(getOutsideBorderError(c).message);
      }
    });
    it('Should throw error when an area has been revealed.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 4, null);
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
      const game = new Minesweeper({ width: 3, height: 3 }, 1, null);
      const c: Coordinate = [0, 0];
      const progress: Progress = game.revealArea(c);
      const coord: Coordinate = getCoordOfFirstMatchedArea(progress.field, {
        hasMines: true,
        revealed: false,
      });
      try {
        game.revealArea(coord);
        game.revealArea(coord);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getGameHasEndedError().message);
      }
    });
    it('Should reveal the area at the coordinate.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5, null);
      let progress: Progress = game.getProgress();
      const coord: Coordinate = getCoordOfFirstMatchedArea(progress.field, {
        hasMines: false,
        revealed: false,
      });
      progress = game.revealArea(coord);
      const [x, y] = coord;

      expect(progress.field[x][y].revealed).toBe(true);
    });
    it('Should end game when clicking a bomb.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 4, null);
      let progress: Progress = game.revealArea([0, 0]);
      const coord = getCoordOfFirstMatchedArea(game.getProgress().field, {
        hasMines: true,
        revealed: false,
      });
      progress = game.revealArea(coord);
      const [x, y] = coord;

      expect(progress.status).toBe('FAILED');
      expect(progress.field[x][y].boomed).toBe(true);
    });
    it('Should set status to "SUCCEED" when all areas without mines have been revealed.', () => {
      const game = new Minesweeper({ width: 2, height: 1 }, 1, null);
      const progress: Progress = game.revealArea([0, 0]);

      expect(progress.status).toBe('SUCCEEDED');
    });
  });
  describe('revealArea', () => {
    it('Should clear onDurationChange interval after destroy is called.', async () => {
      const onDurationChange = jest.fn();
      const game = new Minesweeper(
        { width: 2, height: 2 },
        1,
        onDurationChange
      );
      game.revealArea([0, 0]);
      await pause(2);
      const tmpCallsCount = onDurationChange.mock.calls.length;
      game.destroy();
      await pause(2);

      expect(tmpCallsCount).toBe(onDurationChange.mock.calls.length);
    });
  });
});
