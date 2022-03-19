import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import Home from '@/pages/index.page';
import { makeStore } from '@/stores';

describe('Home', () => {
  it('Should render component successfully.', () => {
    try {
      render(
        <Provider store={makeStore()}>
          <Home />
        </Provider>
      );
      expect(true).toBe(true);
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
