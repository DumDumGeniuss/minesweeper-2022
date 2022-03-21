import { render, screen, fireEvent } from '@testing-library/react';
import Panel, { Props, Status } from '.';

describe('Panel', () => {
  it('Should render component successfully.', () => {
    try {
      const onResetClick = () => {};
      render(
        <Panel
          status={Status.Sleeing}
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
  it('Should correctly display mines count.', () => {
    const onResetClick = jest.fn();
    render(
      <Panel
        status={Status.Started}
        minesCount={100}
        duration={1}
        onResetClick={onResetClick}
      />
    );
    const durationDom = screen.queryByText(100);

    expect(durationDom).toBeInTheDocument();
  });
  it('Should display correct emoji.', () => {
    const defaultProps: Props = {
      status: Status.Sleeing,
      minesCount: 1,
      duration: 0,
      onResetClick: () => {},
    };
    const { rerender } = render(<Panel {...defaultProps} />);
    let faceEmoji = screen.getByText('😴');
    expect(faceEmoji).toBeInTheDocument();

    rerender(<Panel {...defaultProps} status={Status.Succeeded} />);
    faceEmoji = screen.getByText('😃');
    expect(faceEmoji).toBeInTheDocument();

    rerender(<Panel {...defaultProps} status={Status.Failed} />);
    faceEmoji = screen.getByText('😢');
    expect(faceEmoji).toBeInTheDocument();

    rerender(<Panel {...defaultProps} status={Status.Started} />);
    faceEmoji = screen.getByText('🙂');
    expect(faceEmoji).toBeInTheDocument();
  });
  it('Should correctly display duration.', () => {
    const onResetClick = jest.fn();
    render(
      <Panel
        status={Status.Started}
        minesCount={1}
        duration={100}
        onResetClick={onResetClick}
      />
    );
    const durationDom = screen.queryByText(100);

    expect(durationDom).toBeInTheDocument();
  });
  it('Should trigger onResetClick.', () => {
    const onResetClick = jest.fn();
    const { container } = render(
      <Panel
        status={Status.Started}
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
