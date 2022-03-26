import { useContext } from 'react';
import classnames from 'classnames';
import PaletteContext from '../PaletteContext';

type UnrevealedAreaAreaProps = {
  mode: 'light' | 'dark';
  x: number;
  y: number;
  flagged: boolean;
  onClick: (x: number, y: number) => any;
  onContextMenu: (x: number, y: number) => any;
};

function UnrevealedArea({
  x,
  y,
  mode,
  flagged,
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
  const lightBgColor = palette.area.unrevealedArea.light.bgColor;
  const lightBgColorHover = palette.area.unrevealedArea.light.bgColorHover;
  const darkBgColor = palette.area.unrevealedArea.dark.bgColor;
  const darkBgColorHover = palette.area.unrevealedArea.dark.bgColorHover;
  return (
    <button
      className={classnames([
        'flex',
        'justify-center',
        'items-center',
        'w-full',
        'h-full',
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

function SafeArea({ adjMinesCount, mode }: SafeAreaAreaProps) {
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
        'flex',
        'w-full',
        'h-full',
        'justify-center',
        'items-center',
        mode === 'light' ? lightBgColor : darkBgColor,
      ])}
    >
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
        onClick={onClick}
        onContextMenu={onContextMenu}
      />
    );
  } else if (hasMines) {
    AreaComponent = <MineArea mode={bgColor} boomed={boomed} />;
  } else {
    AreaComponent = <SafeArea mode={bgColor} adjMinesCount={adjMinesCount} />;
  }

  return (
    <section className="w-full h-full overflow-hidden">{AreaComponent}</section>
  );
}

export default Area;
