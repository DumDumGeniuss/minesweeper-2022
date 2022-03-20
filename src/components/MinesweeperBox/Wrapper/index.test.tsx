import { render } from '@testing-library/react';
import Wrapper from '.';

describe('Wrapper', () => {
  it('Should render component successfully.', () => {
    try {
      render(<Wrapper panel={<>hi</>} cellMap={<>there</>} />);
      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
