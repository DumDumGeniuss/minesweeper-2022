import { createContext } from 'react';
import { Theme } from '@/styles/theme';
import Palette from './palettes/types';
import skyPalette from './palettes/sky';
import purplePalette from './palettes/purple';
import amberPalette from './palettes/amber';
import redPalette from './palettes/red';
import greenPalette from './palettes/green';
import emeraldPalette from './palettes/emerald';
import indigoPalette from './palettes/indigo';
import grayPalette from './palettes/gray';
import pinkPalette from './palettes/pink';

type PaletteGroup = {
  [key in Theme]: Palette;
};

const paletteGroup: PaletteGroup = {
  sky: skyPalette,
  purple: purplePalette,
  amber: amberPalette,
  red: redPalette,
  green: greenPalette,
  emerald: emeraldPalette,
  indigo: indigoPalette,
  gray: grayPalette,
  pink: pinkPalette,
};

const MinesweeperBoxPaletteContext = createContext(paletteGroup.green);
export default MinesweeperBoxPaletteContext;
export { paletteGroup };
export type { Palette };
