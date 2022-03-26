import { Theme } from '../types';

const theme: Theme = {
  panel: {
    sidePanel: {
      bgColor: 'bg-amber-100',
    },
    resetButton: {
      bgColorHover: 'hover:bg-amber-100',
    },
  },
  wrapper: {
    bgColor: 'bg-white',
  },
  area: {
    unrevealedArea: {
      light: {
        bgColor: 'bg-amber-200',
        bgColorHover: 'hover:bg-amber-400',
      },
      dark: {
        bgColor: 'bg-amber-300',
        bgColorHover: 'hover:bg-amber-500',
      },
    },
    bombArea: {
      boomed: {
        bgColor: 'bg-amber-300',
      },
      notBoomed: {
        light: {
          bgColor: 'bg-amber-50',
        },
        dark: {
          bgColor: 'bg-amber-100',
        },
      },
    },
    safeArea: {
      light: {
        bgColor: 'bg-amber-50',
      },
      dark: {
        bgColor: 'bg-amber-100',
      },
    },
  },
};

export default theme;
