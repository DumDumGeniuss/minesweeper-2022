import { createContext } from 'react';
import skyTheme from './themes/sky';
import purpleTheme from './themes/purple';
import amberTheme from './themes/amber';
import redTheme from './themes/red';
import greenTheme from './themes/green';
import emeraldTheme from './themes/emerald';
import indigoTheme from './themes/indigo';
import grayTheme from './themes/gray';
import { PaletteGroup, Palette, Theme } from './types';

const paletteGroup: PaletteGroup = {
  sky: skyTheme,
  purple: purpleTheme,
  amber: amberTheme,
  red: redTheme,
  green: greenTheme,
  emerald: emeraldTheme,
  indigo: indigoTheme,
  gray: grayTheme,
};

const MinesweeperBoxPaletteContext = createContext(paletteGroup.green);
export default MinesweeperBoxPaletteContext;
export { paletteGroup, Theme };
export type { Palette };
