import Palette from './types';

const theme: Palette = {
  panel: {
    sidePanel: {
      bgColor: 'bg-indigo-100',
    },
    resetButton: {
      bgColorHover: 'hover:bg-indigo-100',
    },
  },
  wrapper: {
    bgColor: 'bg-white',
  },
  area: {
    unrevealedArea: {
      borderColor: 'border-indigo-300',
      light: {
        bgColor: 'bg-indigo-200',
        bgColorHover: 'hover:bg-indigo-400',
      },
      dark: {
        bgColor: 'bg-indigo-300',
        bgColorHover: 'hover:bg-indigo-500',
      },
    },
    bombArea: {
      boomed: {
        bgColor: 'bg-indigo-300',
      },
      notBoomed: {
        light: {
          bgColor: 'bg-indigo-50',
        },
        dark: {
          bgColor: 'bg-indigo-100',
        },
      },
    },
    safeArea: {
      light: {
        bgColor: 'bg-indigo-50',
      },
      dark: {
        bgColor: 'bg-indigo-100',
      },
    },
  },
};

export default theme;
