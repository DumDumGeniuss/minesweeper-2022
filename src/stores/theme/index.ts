import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '@/styles/theme';

export type State = {
  theme: Theme;
};

const slice = createSlice({
  name: 'theme',
  initialState: {
    theme: Theme.Sky,
  } as State,
  reducers: {
    setTheme(state: State, action: { type: string; payload: Theme }) {
      state.theme = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state: State, action) => {
      state.theme = action.payload.theme.theme;
    },
  },
});

export default slice.reducer;

const { setTheme } = slice.actions;

export { setTheme };
