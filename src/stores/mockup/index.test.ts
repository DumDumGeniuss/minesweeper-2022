import { makeStore } from '@/stores';
import { pause } from '@/utils/common';
import { setMockup, fetchMockup } from './index';

describe('Profile Reducer', () => {
  describe('setMockup', () => {
    it('Should correctly set nickname', () => {
      const store = makeStore();
      store.dispatch(setMockup('My name'));

      expect(store.getState().mockup.mockup).toBe('My name');
    });
  });
  describe('fetchMockup', () => {
    it('Should fetch nickname after 1 sec', async () => {
      const store = makeStore();
      store.dispatch(fetchMockup('My name'));
      await pause(1100);

      expect(store.getState().mockup.mockup).toBe('My name');
    });
  });
});
