import { render, screen } from '@testing-library/react';
import MinesweeperBox from '.';

describe('MinesweeperBox', () => {
  it('Should render component successfully.', () => {
    render(<MinesweeperBox size={{ width: 10, height: 10 }} minesCount={10} />);
    const sleepingFaceDom = screen.getByText('😴');

    expect(sleepingFaceDom).toBeInTheDocument();
  });
});
