import { useContext } from 'react';
import classnames from 'classnames';
import PaletteContext from '../PaletteContext';

enum Testid {
  SafeAreaWithFlag = 'safe-area-with-flag',
  UnrevealedAreaRoot = 'unrevealed-area',
}

type UnrevealedAreaAreaProps = {
  mode: 'light' | 'dark';
  x: number;
  y: number;
  flagged: boolean;
  hasLeftBorder: boolean;
  hasBottomBorder: boolean;
  hasRightBorder: boolean;
  hasTopBorder: boolean;
  onClick: (x: number, y: number) => any;
  onContextMenu: (x: number, y: number) => any;
};

function UnrevealedArea({
  x,
  y,
  mode,
  flagged,
  hasLeftBorder,
  hasBottomBorder,
  hasRightBorder,
  hasTopBorder,
  onClick,
  onContextMenu,
}: UnrevealedAreaAreaProps) {
  const onButtonClick = () => {
    if (flagged) {
      return;
    }
    onClick(x, y);
  };
  const onButtonContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    onContextMenu(x, y);
  };
  const palette = useContext(PaletteContext);
  const defaultBorderColor = palette.area.unrevealedArea.borderColor;
  const lightBgColor = palette.area.unrevealedArea.light.bgColor;
  const lightBgColorHover = palette.area.unrevealedArea.light.bgColorHover;
  const darkBgColor = palette.area.unrevealedArea.dark.bgColor;
  const darkBgColorHover = palette.area.unrevealedArea.dark.bgColorHover;

  return (
    <button
      data-testid={Testid.UnrevealedAreaRoot}
      className={classnames([
        'flex',
        'justify-center',
        'items-center',
        'w-full',
        'h-full',
        defaultBorderColor,
        hasLeftBorder && 'border-l-2',
        hasBottomBorder && 'border-b-2',
        hasRightBorder && 'border-r-2',
        hasTopBorder && 'border-t-2',
        mode === 'light' ? lightBgColor : darkBgColor,
        mode === 'light' ? lightBgColorHover : darkBgColorHover,
      ])}
      type="button"
      aria-label="Reveal area"
      onClick={onButtonClick}
      onKeyDown={onButtonClick}
      onContextMenu={onButtonContextMenu}
    >
      {flagged ? '🚩' : ''}
    </button>
  );
}

type MineAreaPoprs = {
  mode: 'light' | 'dark';
  boomed: boolean;
};

function MineArea({ mode, boomed }: MineAreaPoprs) {
  const palette = useContext(PaletteContext);
  const boomedBgColor = palette.area.bombArea.boomed.bgColor;
  const notBoomedLightBgColor = palette.area.bombArea.notBoomed.light.bgColor;
  const notBoomedDarkBgColor = palette.area.bombArea.notBoomed.dark.bgColor;
  let mineAreaBgColor;
  if (boomed) {
    mineAreaBgColor = boomedBgColor;
  } else {
    mineAreaBgColor =
      mode === 'light' ? notBoomedLightBgColor : notBoomedDarkBgColor;
  }
  const emoji = boomed ? '💥' : '💣';
  const onContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <section
      className={`flex w-full h-full justify-center items-center ${mineAreaBgColor}`}
      onContextMenu={onContextMenu}
    >
      <section>{emoji}</section>
    </section>
  );
}

type SafeAreaAreaProps = {
  mode: 'light' | 'dark';
  adjMinesCount: number;
  flagged: boolean;
};

const countColorMap: { [key: number]: string } = {
  1: 'text-blue-500',
  2: 'text-green-600',
  3: 'text-red-500',
  4: 'text-purple-500',
  5: 'text-red-800',
  6: 'text-blue-300',
  7: 'text-black-500',
  8: 'text-gray-500',
};

function SafeArea({ adjMinesCount, flagged, mode }: SafeAreaAreaProps) {
  const onContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
  };
  const palette = useContext(PaletteContext);
  const lightBgColor = palette.area.safeArea.light.bgColor;
  const darkBgColor = palette.area.safeArea.dark.bgColor;

  return (
    <section
      onContextMenu={onContextMenu}
      className={classnames([
        'relative',
        'flex',
        'w-full',
        'h-full',
        'justify-center',
        'items-center',
        mode === 'light' ? lightBgColor : darkBgColor,
      ])}
    >
      {flagged ? (
        <section
          data-testid={Testid.SafeAreaWithFlag}
          className={classnames([
            'absolute',
            'right-0',
            'top-0',
            'opacity-50',
            'text-xs',
          ])}
        >
          🚩
        </section>
      ) : null}
      <section className={`${countColorMap[adjMinesCount]} font-bold`}>
        {adjMinesCount || ''}
      </section>
    </section>
  );
}

type AreaProps = {
  x: number;
  y: number;
  revealed: boolean;
  hasMines: boolean;
  adjMinesCount: number;
  boomed: boolean;
  flagged: boolean;
  checkIsAreaRevealed: (x: number, y: number) => boolean;
  onClick: (x: number, y: number) => any;
  onContextMenu: (x: number, y: number) => any;
};

function Area({
  x,
  y,
  revealed,
  adjMinesCount,
  hasMines,
  boomed,
  flagged,
  checkIsAreaRevealed,
  onClick,
  onContextMenu,
}: AreaProps) {
  let AreaComponent: JSX.Element | null = null;
  const bgColor = (x + y) % 2 === 0 ? 'light' : 'dark';

  if (!revealed) {
    AreaComponent = (
      <UnrevealedArea
        mode={bgColor}
        x={x}
        y={y}
        flagged={flagged}
        hasLeftBorder={checkIsAreaRevealed(x - 1, y)}
        hasBottomBorder={checkIsAreaRevealed(x, y + 1)}
        hasRightBorder={checkIsAreaRevealed(x + 1, y)}
        hasTopBorder={checkIsAreaRevealed(x, y - 1)}
        onClick={onClick}
        onContextMenu={onContextMenu}
      />
    );
  } else if (hasMines) {
    AreaComponent = <MineArea mode={bgColor} boomed={boomed} />;
  } else {
    AreaComponent = (
      <SafeArea
        mode={bgColor}
        adjMinesCount={adjMinesCount}
        flagged={flagged}
      />
    );
  }

  return (
    <section className={classnames(['w-full', 'h-full', 'overflow-hidden'])}>
      {AreaComponent}
    </section>
  );
}

export default Area;
export { Testid };
