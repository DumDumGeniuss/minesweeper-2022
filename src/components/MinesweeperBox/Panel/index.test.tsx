import { render, screen, fireEvent } from '@testing-library/react';
import Panel, { Props } from '.';

describe('Panel', () => {
  it('Should render component successfully.', () => {
    try {
      const onResetClick = () => {};
      render(
        <Panel
          status="SLEEPING"
          minesCount={1}
          duration={0}
          onResetClick={onResetClick}
        />
      );

      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
  it('Should display correct emoji.', () => {
    const defaultProps: Props = {
      status: 'SLEEPING',
      minesCount: 1,
      duration: 0,
      onResetClick: () => {},
    };
    const { rerender } = render(<Panel {...defaultProps} />);
    let faceEmoji = screen.getByText('😴');
    expect(faceEmoji).toBeInTheDocument();

    rerender(<Panel {...defaultProps} status="SUCCEEDED" />);
    faceEmoji = screen.getByText('😃');
    expect(faceEmoji).toBeInTheDocument();

    rerender(<Panel {...defaultProps} status="FAILED" />);
    faceEmoji = screen.getByText('😢');
    expect(faceEmoji).toBeInTheDocument();

    rerender(<Panel {...defaultProps} status="STARTED" />);
    faceEmoji = screen.getByText('🙂');
    expect(faceEmoji).toBeInTheDocument();
  });
  it('Should trigger onResetClick.', () => {
    const onResetClick = jest.fn();
    const { container } = render(
      <Panel
        status="STARTED"
        minesCount={1}
        duration={0}
        onResetClick={onResetClick}
      />
    );
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }

    expect(onResetClick.mock.calls.length).toBe(1);
  });
});
