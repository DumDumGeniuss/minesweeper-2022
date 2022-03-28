import { render, screen } from '@testing-library/react';
import { Theme } from '@/styles/theme';
import BlurredEllipse, { Testid, convertThemeToEllipseColor } from '.';

describe('BlurredEllipse', () => {
  it('Should render component successfully.', () => {
    try {
      render(
        <BlurredEllipse theme={Theme.Amber} opacity={0} width={1} height={1} />
      );

      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
  it('Should populate correct styles and classes.', () => {
    render(
      <BlurredEllipse theme={Theme.Amber} opacity={10} width={20} height={30} />
    );
    const rootElem = screen.getByTestId(Testid.Root);

    expect(rootElem.classList).toContain(
      convertThemeToEllipseColor(Theme.Amber)
    );
    expect(rootElem).toHaveStyle('opacity: 10');
    expect(rootElem).toHaveStyle('width: calc(20vw)');
    expect(rootElem).toHaveStyle('height: calc(30vw)');
  });
});
