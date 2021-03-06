import Palette from './types';

const theme: Palette = {
  panel: {
    sidePanel: {
      bgColor: 'bg-sky-100',
    },
    resetButton: {
      bgColorHover: 'hover:bg-sky-100',
    },
  },
  wrapper: {
    bgColor: 'bg-white',
  },
  area: {
    unrevealedArea: {
      borderColor: 'border-sky-300',
      light: {
        bgColor: 'bg-sky-200',
        bgColorHover: 'hover:bg-sky-400',
      },
      dark: {
        bgColor: 'bg-sky-300',
        bgColorHover: 'hover:bg-sky-500',
      },
    },
    bombArea: {
      boomed: {
        bgColor: 'bg-sky-300',
      },
      notBoomed: {
        light: {
          bgColor: 'bg-sky-50',
        },
        dark: {
          bgColor: 'bg-sky-100',
        },
      },
    },
    safeArea: {
      light: {
        bgColor: 'bg-sky-50',
      },
      dark: {
        bgColor: 'bg-sky-100',
      },
    },
  },
};

export default theme;
