import { Theme } from '../types';

const theme: Theme = {
  panel: {
    sidePanel: {
      bgColor: 'bg-green-100',
    },
    resetButton: {
      bgColorHover: 'hover:bg-green-100',
    },
  },
  wrapper: {
    bgColor: 'bg-white',
  },
  area: {
    unrevealedArea: {
      light: {
        bgColor: 'bg-green-200',
        bgColorHover: 'hover:bg-green-400',
      },
      dark: {
        bgColor: 'bg-green-300',
        bgColorHover: 'hover:bg-green-500',
      },
    },
    bombArea: {
      boomed: {
        bgColor: 'bg-green-300',
      },
      notBoomed: {
        light: {
          bgColor: 'bg-green-50',
        },
        dark: {
          bgColor: 'bg-green-100',
        },
      },
    },
    safeArea: {
      light: {
        bgColor: 'bg-green-50',
      },
      dark: {
        bgColor: 'bg-green-100',
      },
    },
  },
};

export default theme;
