import { render } from '@testing-library/react';
import MinesweeperBox from '.';

describe('MinesweeperBox', () => {
  it('Should render component successfully.', () => {
    try {
      render(<MinesweeperBox />);
      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
