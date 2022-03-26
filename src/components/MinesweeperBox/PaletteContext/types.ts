enum ThemeColor {
  Sky = 'sky',
  Purple = 'purple',
  Amber = 'amber',
  Red = 'red',
  Green = 'green',
  Emerald = 'emerald',
  Indigo = 'indigo',
}

type Theme = {
  panel: {
    sidePanel: {
      bgColor: string;
    };
    resetButton: {
      bgColorHover: string;
    };
  };
  wrapper: {
    bgColor: string;
  };
  area: {
    unrevealedArea: {
      light: {
        bgColor: string;
        bgColorHover: string;
      };
      dark: {
        bgColor: string;
        bgColorHover: string;
      };
    };
    bombArea: {
      boomed: {
        bgColor: string;
      };
      notBoomed: {
        light: {
          bgColor: string;
        };
        dark: {
          bgColor: string;
        };
      };
    };
    safeArea: {
      light: {
        bgColor: string;
      };
      dark: {
        bgColor: string;
      };
    };
  };
};

type Palette = {
  [key in ThemeColor]: Theme;
};

export { ThemeColor };
export type { Theme, Palette };
