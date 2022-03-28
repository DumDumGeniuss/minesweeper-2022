import { render, screen, fireEvent } from '@testing-library/react';
import { Theme } from '@/styles/theme';
import MinesweeperBox from '.';

describe('MinesweeperBox', () => {
  it('Should render component successfully.', () => {
    render(
      <MinesweeperBox
        theme={Theme.Sky}
        size={{ width: 10, height: 10 }}
        minesCount={10}
      />
    );
    const sleepingFaceDom = screen.getByText('😴');

    expect(sleepingFaceDom).toBeInTheDocument();
  });
  it('Should start the game when any areas are clicked.', () => {
    const { container } = render(
      <MinesweeperBox
        theme={Theme.Sky}
        size={{ width: 10, height: 10 }}
        minesCount={10}
      />
    );
    const revealAreaButtons = container.querySelectorAll(
      '[aria-label="Reveal area"]'
    );
    fireEvent.click(revealAreaButtons[0]);

    const smallSmileEmoji = screen.getByText('🙂');
    expect(smallSmileEmoji).toBeInTheDocument();
  });
  it('Should reset the game when reset game button is clicked.', () => {
    const { container } = render(
      <MinesweeperBox
        theme={Theme.Sky}
        size={{ width: 10, height: 10 }}
        minesCount={10}
      />
    );
    const revealAreaButtons = container.querySelectorAll(
      '[aria-label="Reveal area"]'
    );
    fireEvent.click(revealAreaButtons[0]);

    const resetGameButton = container.querySelector(
      '[aria-label="Reset game"]'
    );
    if (resetGameButton) {
      fireEvent.click(resetGameButton);
    }

    const smallSmileEmoji = screen.getByText('😴');
    expect(smallSmileEmoji).toBeInTheDocument();
  });
  it('Should renew the game when size or minesCount is changes.', () => {
    const { rerender, container } = render(
      <MinesweeperBox
        theme={Theme.Sky}
        size={{ width: 10, height: 10 }}
        minesCount={10}
      />
    );
    rerender(
      <MinesweeperBox
        theme={Theme.Sky}
        size={{ width: 20, height: 10 }}
        minesCount={33}
      />
    );

    const revealAreaButtons = container.querySelectorAll(
      '[aria-label="Reveal area"]'
    );
    const minesCountElem = screen.queryByText(33);

    expect(revealAreaButtons.length).toBe(200);
    expect(minesCountElem).toBeInTheDocument();
  });
});
