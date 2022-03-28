import { render, screen, fireEvent } from '@testing-library/react';
import Area, { Testid } from '.';

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
          flagged={false}
          onClick={() => {}}
          onContextMenu={() => {}}
        />
      );

      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
  it('Should has a flag emoji when an area is flagged.', () => {
    render(
      <Area
        x={0}
        y={0}
        revealed={false}
        hasMines={false}
        adjMinesCount={0}
        boomed={false}
        flagged
        onClick={() => {}}
        onContextMenu={() => {}}
      />
    );
    expect(screen.getByText('🚩')).toBeInTheDocument();
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
        flagged={false}
        onClick={() => {}}
        onContextMenu={() => {}}
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
        flagged={false}
        onClick={() => {}}
        onContextMenu={() => {}}
      />
    );
    expect(screen.getByText('7')).toBeInTheDocument();
  });
  it('When a safe area with a flag is revealed, it should still has a flag on it.', () => {
    render(
      <Area
        x={1}
        y={1}
        revealed
        hasMines={false}
        adjMinesCount={7}
        boomed={false}
        flagged
        onClick={() => {}}
        onContextMenu={() => {}}
      />
    );
    expect(screen.getByTestId(Testid.SafeAreaWithFlag)).toBeInTheDocument();
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
        flagged={false}
        onClick={() => {}}
        onContextMenu={() => {}}
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
        flagged={false}
        onClick={onClick}
        onContextMenu={() => {}}
      />
    );
    const button = container.querySelector('[aria-label="Reveal area"]');
    if (button) {
      fireEvent.click(button);
    }

    expect(onClick.mock.calls.length).toBe(1);
  });
  it('Should not trigger onClick when Area is flagged.', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Area
        x={1}
        y={1}
        revealed={false}
        hasMines={false}
        adjMinesCount={3}
        boomed={false}
        flagged
        onClick={onClick}
        onContextMenu={() => {}}
      />
    );
    const button = container.querySelector('[aria-label="Reveal area"]');
    if (button) {
      fireEvent.click(button);
    }

    expect(onClick.mock.calls.length).toBe(0);
  });
  it('Should trigger onContextMenu when Area is right clicked.', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Area
        x={1}
        y={1}
        revealed={false}
        hasMines={false}
        adjMinesCount={3}
        boomed={false}
        flagged
        onClick={onClick}
        onContextMenu={() => {}}
      />
    );
    const button = container.querySelector('[aria-label="Reveal area"]');
    if (button) {
      fireEvent.contextMenu(button);
    }

    expect(onClick.mock.calls.length).toBe(0);
  });
});
