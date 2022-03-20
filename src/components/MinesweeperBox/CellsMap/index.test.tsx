import { render } from '@testing-library/react';
import CellsMap from '.';
import { CellMap } from '@/lib/minesweeper';

describe('CellsMap', () => {
  it('Should render component successfully.', () => {
    try {
      render(<CellsMap cellMap={[]} onCellClick={() => {}} />);

      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
  it('Should render number of unrevealed cells.', () => {
    const cellMap: CellMap = [
      [
        {
          key: '0,0',
          hasMine: false,
          adjMinesCount: 1,
          revealed: false,
          boomed: false,
        },
        {
          key: '0,1',
          hasMine: true,
          adjMinesCount: 0,
          revealed: false,
          boomed: false,
        },
      ],
    ];
    const { container } = render(
      <CellsMap cellMap={cellMap} onCellClick={() => {}} />
    );

    const reavealCellButtons = container.querySelectorAll(
      '[aria-label="Reveal cell"]'
    );
    expect(reavealCellButtons.length).toBe(2);
  });
});
