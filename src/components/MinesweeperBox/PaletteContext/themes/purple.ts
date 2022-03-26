import { Theme } from '../types';

const theme: Theme = {
  panel: {
    sidePanel: {
      bgColor: 'bg-purple-100',
    },
    resetButton: {
      bgColorHover: 'hover:bg-purple-100',
    },
  },
  wrapper: {
    bgColor: 'bg-white',
  },
  area: {
    unrevealedArea: {
      light: {
        bgColor: 'bg-purple-200',
        bgColorHover: 'hover:bg-purple-400',
      },
      dark: {
        bgColor: 'bg-purple-300',
        bgColorHover: 'hover:bg-purple-500',
      },
    },
    bombArea: {
      boomed: {
        bgColor: 'bg-purple-300',
      },
      notBoomed: {
        light: {
          bgColor: 'bg-purple-50',
        },
        dark: {
          bgColor: 'bg-purple-100',
        },
      },
    },
    safeArea: {
      light: {
        bgColor: 'bg-purple-50',
      },
      dark: {
        bgColor: 'bg-purple-100',
      },
    },
  },
};

export default theme;
