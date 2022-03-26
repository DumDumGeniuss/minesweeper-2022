import { Theme } from '../types';

const theme: Theme = {
  panel: {
    sidePanel: {
      bgColor: 'bg-red-100',
    },
    resetButton: {
      bgColorHover: 'hover:bg-red-100',
    },
  },
  wrapper: {
    bgColor: 'bg-white',
  },
  area: {
    unrevealedArea: {
      light: {
        bgColor: 'bg-red-200',
        bgColorHover: 'hover:bg-red-400',
      },
      dark: {
        bgColor: 'bg-red-300',
        bgColorHover: 'hover:bg-red-500',
      },
    },
    bombArea: {
      boomed: {
        bgColor: 'bg-red-300',
      },
      notBoomed: {
        light: {
          bgColor: 'bg-red-50',
        },
        dark: {
          bgColor: 'bg-red-100',
        },
      },
    },
    safeArea: {
      light: {
        bgColor: 'bg-red-50',
      },
      dark: {
        bgColor: 'bg-red-100',
      },
    },
  },
};

export default theme;
