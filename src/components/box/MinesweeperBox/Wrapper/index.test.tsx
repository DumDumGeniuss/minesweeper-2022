import { render, screen } from '@testing-library/react';
import Wrapper from '.';

describe('Wrapper', () => {
  it('Should render component successfully.', () => {
    try {
      render(<Wrapper panel={<>hi</>} minefield={<>there</>} />);
      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
  it('Should correctly render panel and minefield components.', () => {
    render(<Wrapper panel={<>hi</>} minefield={<>there</>} />);
    const hi = screen.queryByText('hi');
    const there = screen.queryByText('there');

    expect(hi).toBeInTheDocument();
    expect(there).toBeInTheDocument();
  });
});
