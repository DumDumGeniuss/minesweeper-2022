import { render, screen, fireEvent } from '@testing-library/react';
import Cell from '.';

describe('Cell', () => {
  it('Should render component successfully.', () => {
    try {
      render(
        <Cell
          revealed={false}
          coord={[0, 0]}
          hasMine={false}
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
  it('Should has bomb emoji when a cell with mine is revealed.', () => {
    render(
      <Cell
        revealed
        coord={[0, 0]}
        hasMine
        adjMinesCount={0}
        boomed={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText('💣')).toBeInTheDocument();
  });
  it('Should display adjMinesCount when a cell without mine is revealed.', () => {
    render(
      <Cell
        revealed
        coord={[1, 1]}
        hasMine={false}
        adjMinesCount={7}
        boomed={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText('7')).toBeInTheDocument();
  });
  it('Should display exploded bomb emoji when a cell with mines is stepped on.', () => {
    render(
      <Cell
        revealed
        coord={[1, 1]}
        hasMine
        adjMinesCount={3}
        boomed
        onClick={() => {}}
      />
    );
    expect(screen.getByText('💥')).toBeInTheDocument();
  });
  it('Should trigger onClick when Cell is clicked.', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Cell
        revealed={false}
        coord={[1, 1]}
        hasMine={false}
        adjMinesCount={3}
        boomed={false}
        onClick={onClick}
      />
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }

    expect(onClick.mock.calls.length).toBe(1);
  });
});
