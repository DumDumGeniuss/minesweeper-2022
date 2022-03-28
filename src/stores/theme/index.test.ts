import { makeStore } from '@/stores';
import { Theme } from '@/styles/theme';
import { setTheme } from './index';

describe('Profile Reducer', () => {
  describe('setTheme', () => {
    it('Should set theme correctly.', () => {
      const store = makeStore();
      store.dispatch(setTheme(Theme.Amber));
      expect(store.getState().theme.theme).toBe(Theme.Amber);
    });
  });
});
