import Palette from './types';

const theme: Palette = {
  panel: {
    sidePanel: {
      bgColor: 'bg-gray-100',
    },
    resetButton: {
      bgColorHover: 'hover:bg-gray-100',
    },
  },
  wrapper: {
    bgColor: 'bg-white',
  },
  area: {
    unrevealedArea: {
      borderColor: 'border-gray-400',
      light: {
        bgColor: 'bg-gray-200',
        bgColorHover: 'hover:bg-gray-400',
      },
      dark: {
        bgColor: 'bg-gray-300',
        bgColorHover: 'hover:bg-gray-500',
      },
    },
    bombArea: {
      boomed: {
        bgColor: 'bg-gray-300',
      },
      notBoomed: {
        light: {
          bgColor: 'bg-gray-50',
        },
        dark: {
          bgColor: 'bg-gray-100',
        },
      },
    },
    safeArea: {
      light: {
        bgColor: 'bg-gray-50',
      },
      dark: {
        bgColor: 'bg-gray-100',
      },
    },
  },
};

export default theme;
