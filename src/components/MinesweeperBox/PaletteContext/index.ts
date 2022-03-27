import { createContext } from 'react';
import skyTheme from './themes/sky';
import purpleTheme from './themes/purple';
import amberTheme from './themes/amber';
import redTheme from './themes/red';
import greenTheme from './themes/green';
import emeraldTheme from './themes/emerald';
import indigoTheme from './themes/indigo';
import grayTheme from './themes/gray';
import pinkTheme from './themes/pink';
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
  pink: pinkTheme,
};

function convertStringToTheme(value: string): Theme {
  switch (value) {
    case Theme.Amber:
      return Theme.Amber;
    case Theme.Emerald:
      return Theme.Emerald;
    case Theme.Indigo:
      return Theme.Indigo;
    case Theme.Gray:
      return Theme.Gray;
    case Theme.Green:
      return Theme.Green;
    case Theme.Purple:
      return Theme.Purple;
    case Theme.Red:
      return Theme.Red;
    case Theme.Sky:
      return Theme.Sky;
    case Theme.Pink:
      return Theme.Pink;
    default:
      return Theme.Sky;
  }
}

const MinesweeperBoxPaletteContext = createContext(paletteGroup.green);
export default MinesweeperBoxPaletteContext;
export { paletteGroup, Theme, convertStringToTheme };
export type { Palette };
