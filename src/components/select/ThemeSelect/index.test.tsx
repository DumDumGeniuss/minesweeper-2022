import { render } from '@testing-library/react';
import { Theme } from '@/styles/theme';
import ThemeSelect from '.';

describe('ThemeSelect', () => {
  it('Should render component successfully.', () => {
    try {
      render(<ThemeSelect theme={Theme.Sky} onSelect={() => {}} />);

      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
