import { render } from '@testing-library/react';
import Minefeild, { Minefield } from '.';

describe('Minefield', () => {
  it('Should render component successfully.', () => {
    try {
      render(
        <Minefeild
          minefield={[]}
          areaSize={10}
          onAreaClick={() => {}}
          onAreaContextMenu={() => {}}
        />
      );

      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
  it('Should render number of unrevealed areas.', () => {
    const minefield: Minefield = [
      [
        {
          x: 0,
          y: 0,
          hasMines: false,
          adjMinesCount: 1,
          revealed: false,
          boomed: false,
          flagged: false,
        },
        {
          x: 0,
          y: 1,
          hasMines: true,
          adjMinesCount: 0,
          revealed: false,
          boomed: false,
          flagged: false,
        },
      ],
    ];
    const { container } = render(
      <Minefeild
        minefield={minefield}
        areaSize={10}
        onAreaClick={() => {}}
        onAreaContextMenu={() => {}}
      />
    );

    const reavealAreaButtons = container.querySelectorAll(
      '[aria-label="Reveal area"]'
    );
    expect(reavealAreaButtons.length).toBe(2);
  });
});
