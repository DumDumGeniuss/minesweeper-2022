import { render, screen } from '@testing-library/react';
import { Theme } from '@/styles/theme';
import BigLogoIcon, { Testid, convertThemeToLogoColor } from '.';

describe('BigLogoIcon', () => {
  it('Should render component successfully.', () => {
    try {
      render(<BigLogoIcon theme={Theme.Amber} />);

      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
  it('Should populate correct color.', () => {
    render(<BigLogoIcon theme={Theme.Amber} />);
    const rootElem = screen.getByTestId(Testid.Root);

    const color = convertThemeToLogoColor(Theme.Amber);

    expect(rootElem.classList).toContain(color);
  });
});
