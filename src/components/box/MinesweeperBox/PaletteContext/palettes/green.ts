import Palette from './types';

const theme: Palette = {
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
      borderColor: 'border-green-400',
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
