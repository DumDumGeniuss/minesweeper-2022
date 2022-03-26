import { Palette } from '../types';

const theme: Palette = {
  panel: {
    sidePanel: {
      bgColor: 'bg-emerald-100',
    },
    resetButton: {
      bgColorHover: 'hover:bg-emerald-100',
    },
  },
  wrapper: {
    bgColor: 'bg-white',
  },
  area: {
    unrevealedArea: {
      light: {
        bgColor: 'bg-emerald-200',
        bgColorHover: 'hover:bg-emerald-400',
      },
      dark: {
        bgColor: 'bg-emerald-300',
        bgColorHover: 'hover:bg-emerald-500',
      },
    },
    bombArea: {
      boomed: {
        bgColor: 'bg-emerald-300',
      },
      notBoomed: {
        light: {
          bgColor: 'bg-emerald-50',
        },
        dark: {
          bgColor: 'bg-emerald-100',
        },
      },
    },
    safeArea: {
      light: {
        bgColor: 'bg-emerald-50',
      },
      dark: {
        bgColor: 'bg-emerald-100',
      },
    },
  },
};

export default theme;
