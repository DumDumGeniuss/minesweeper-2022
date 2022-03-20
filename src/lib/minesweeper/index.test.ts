import { Coordinate, Progress } from './types';
import Minesweeper, {
  getIncorrectSizeError,
  getTooManyMinesError,
  getIncorrectMinesCountError,
  getOutsideBorderError,
  getHasBeenRevealedError,
  getGameHasEndedError,
} from '.';
import { getMinesCount, getCoordOfFirstMatchedCell } from './utils';

describe('Minesweeper', () => {
  describe('constructor', () => {
    it('Should create new instance with all unrevealed cells.', () => {
      const game = new Minesweeper({ width: 2, height: 2 }, 1);
      const progress: Progress = game.revealCell([0, 0]);
      const minesCount = getMinesCount(progress.cellMap);
      expect(minesCount).toEqual(1);
    });
    it('Should have no mines on initail map.', () => {
      const game = new Minesweeper({ width: 2, height: 2 }, 1);
      const progress = game.getProgress();
      const minesCount = getMinesCount(progress.cellMap);
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
      // Let's reveal cell to plant mines.
      let progress: Progress = game.revealCell([0, 0]);
      // Reset game
      progress = game.reset();
      const minesCount = getMinesCount(progress.cellMap);

      expect(minesCount).toBe(0);
    });
  });
  describe('revealCell', () => {
    it('Should plant mimnes when first time cliking a cell.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      const progress: Progress = game.revealCell([0, 0]);
      const minesCount = getMinesCount(progress.cellMap);
      expect(minesCount).toBe(5);
    });
    it('Should throw error when coordinate is outside border.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      const c: Coordinate = [4, 4];
      try {
        game.revealCell(c);
      } catch (e: any) {
        expect(e.message).toBe(getOutsideBorderError(c).message);
      }
    });
    it('Should throw error when a cell has been revealed.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 4);
      const c: Coordinate = [0, 0];
      game.revealCell(c);
      try {
        game.revealCell(c);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getHasBeenRevealedError(c).message);
      }
    });
    it('Should throw error when a game has ended and a cell is revealed.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 1);
      const c: Coordinate = [0, 0];
      const progress: Progress = game.revealCell(c);
      const coord: Coordinate = getCoordOfFirstMatchedCell(progress.cellMap, {
        hasMine: true,
        revealed: false,
      });
      try {
        game.revealCell(coord);
        game.revealCell(coord);
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(getGameHasEndedError().message);
      }
    });
    it('Should reveal the cell at the coordinate.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 5);
      let progress: Progress = game.getProgress();
      const coord: Coordinate = getCoordOfFirstMatchedCell(progress.cellMap, {
        hasMine: false,
        revealed: false,
      });
      progress = game.revealCell(coord);
      const [x, y] = coord;

      expect(progress.cellMap[x][y].revealed).toBe(true);
    });
    it('Should end game when clicking a bomb.', () => {
      const game = new Minesweeper({ width: 3, height: 3 }, 4);
      let progress: Progress = game.revealCell([0, 0]);
      const coord = getCoordOfFirstMatchedCell(game.getProgress().cellMap, {
        hasMine: true,
        revealed: false,
      });
      progress = game.revealCell(coord);
      const [x, y] = coord;

      expect(progress.status).toBe('FAILED');
      expect(progress.cellMap[x][y].boomed).toBe(true);
    });
    it('Should set status to "SUCCEED" when all cells without mines have been revealed.', () => {
      const game = new Minesweeper({ width: 2, height: 1 }, 1);
      const progress: Progress = game.revealCell([0, 0]);

      expect(progress.status).toBe('SUCCEEDED');
    });
  });
});
