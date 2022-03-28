import Palette from './types';

const theme: Palette = {
  panel: {
    sidePanel: {
      bgColor: 'bg-pink-100',
    },
    resetButton: {
      bgColorHover: 'hover:bg-pink-100',
    },
  },
  wrapper: {
    bgColor: 'bg-white',
  },
  area: {
    unrevealedArea: {
      light: {
        bgColor: 'bg-pink-200',
        bgColorHover: 'hover:bg-pink-400',
      },
      dark: {
        bgColor: 'bg-pink-300',
        bgColorHover: 'hover:bg-pink-500',
      },
    },
    bombArea: {
      boomed: {
        bgColor: 'bg-pink-300',
      },
      notBoomed: {
        light: {
          bgColor: 'bg-pink-50',
        },
        dark: {
          bgColor: 'bg-pink-100',
        },
      },
    },
    safeArea: {
      light: {
        bgColor: 'bg-pink-50',
      },
      dark: {
        bgColor: 'bg-pink-100',
      },
    },
  },
};

export default theme;
