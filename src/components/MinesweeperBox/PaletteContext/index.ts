import { createContext } from 'react';
import skyTheme from './themes/sky';
import purpleTheme from './themes/purple';
import amberTheme from './themes/amber';
import redTheme from './themes/red';
import greenTheme from './themes/green';
import emeraldTheme from './themes/emerald';
import indigoTheme from './themes/indigo';
import { Palette, Theme, ThemeColor } from './types';

const palette: Palette = {
  sky: skyTheme,
  purple: purpleTheme,
  amber: amberTheme,
  red: redTheme,
  green: greenTheme,
  emerald: emeraldTheme,
  indigo: indigoTheme,
};

const MinesweeperBoxPaletteContext = createContext(palette.green);
export default MinesweeperBoxPaletteContext;
export { palette, ThemeColor };
export type { Theme };
