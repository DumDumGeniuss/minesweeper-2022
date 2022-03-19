import { render } from '@testing-library/react';
import MinesweeperBox from '.';

describe('MinesweeperBox', () => {
  it('Should render component successfully.', () => {
    try {
      render(
        <MinesweeperBox size={{ width: 10, height: 10 }} minesCount={10} />
      );
      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
