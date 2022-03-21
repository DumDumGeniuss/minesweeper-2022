import { render, screen, fireEvent } from '@testing-library/react';
import Area from '.';

describe('Area', () => {
  it('Should render component successfully.', () => {
    try {
      render(
        <Area
          x={0}
          y={0}
          revealed={false}
          hasMines={false}
          adjMinesCount={0}
          boomed={false}
          onClick={() => {}}
        />
      );

      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
  it('Should has bomb emoji when an area with mine is revealed.', () => {
    render(
      <Area
        x={0}
        y={0}
        revealed
        hasMines
        adjMinesCount={0}
        boomed={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText('💣')).toBeInTheDocument();
  });
  it('Should display adjMinesCount when an area without mine is revealed.', () => {
    render(
      <Area
        x={1}
        y={1}
        revealed
        hasMines={false}
        adjMinesCount={7}
        boomed={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText('7')).toBeInTheDocument();
  });
  it('Should display exploded bomb emoji when an area with mines is stepped on.', () => {
    render(
      <Area
        x={1}
        y={1}
        revealed
        hasMines
        adjMinesCount={3}
        boomed
        onClick={() => {}}
      />
    );
    expect(screen.getByText('💥')).toBeInTheDocument();
  });
  it('Should trigger onClick when Area is clicked.', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Area
        x={1}
        y={1}
        revealed={false}
        hasMines={false}
        adjMinesCount={3}
        boomed={false}
        onClick={onClick}
      />
    );
    const button = container.querySelector('[aria-label="Reveal area"]');
    if (button) {
      fireEvent.click(button);
    }

    expect(onClick.mock.calls.length).toBe(1);
  });
});
