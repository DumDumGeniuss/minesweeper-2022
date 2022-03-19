import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/stores';
import { pause } from '@/utils/common/';

export type State = {
  mockup: string;
};

const slice = createSlice({
  name: 'mockup',
  initialState: {
    mockup: 'mockup',
  } as State,
  reducers: {
    setMockup(state: State, action: { type: string; payload: string }) {
      state.mockup = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state: State, action) => {
      state.mockup = action.payload.mockup.mockup;
    },
  },
});

export default slice.reducer;

export const { setMockup } = slice.actions;

export function fetchMockup(mockup: string): AppThunk {
  return async (dispatch) => {
    await pause(1000);

    dispatch(slice.actions.setMockup(mockup));
  };
}
