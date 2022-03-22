type UnrevealedAreaAreaProps = {
  x: number;
  y: number;
  flagged: boolean;
  onClick: (x: number, y: number) => any;
  onContextmenu: (x: number, y: number) => any;
};

function UnrevealedArea({
  x,
  y,
  flagged,
  onClick,
  onContextmenu,
}: UnrevealedAreaAreaProps) {
  const onButtonClick = () => {
    if (flagged) {
      return;
    }
    onClick(x, y);
  };
  const onButtonContextmenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    onContextmenu(x, y);
  };
  return (
    <button
      className="flex justify-center items-center w-full h-full bg-white hover:bg-slate-100"
      type="button"
      aria-label="Reveal area"
      onClick={onButtonClick}
      onKeyDown={onButtonClick}
      onContextMenu={onButtonContextmenu}
    >
      {flagged ? '🚩' : '🌱'}
    </button>
  );
}

type MineAreaPoprs = {
  boomed: boolean;
};

function MineArea({ boomed }: MineAreaPoprs) {
  const bgColor = boomed ? 'bg-red-200' : 'bg-slate-100';
  const emoji = boomed ? '💥' : '💣';
  const onContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <section
      className={`flex w-full h-full justify-center items-center ${bgColor}`}
      onContextMenu={onContextMenu}
    >
      <section>{emoji}</section>
    </section>
  );
}

type SafeAreaAreaProps = {
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

function SafeArea({ adjMinesCount }: SafeAreaAreaProps) {
  const onContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <section
      onContextMenu={onContextMenu}
      className="flex w-full h-full justify-center items-center bg-slate-100"
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
  onContextmenu: (x: number, y: number) => any;
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
  onContextmenu,
}: AreaProps) {
  let AreaComponent: JSX.Element | null = null;

  if (!revealed) {
    AreaComponent = (
      <UnrevealedArea
        x={x}
        y={y}
        flagged={flagged}
        onClick={onClick}
        onContextmenu={onContextmenu}
      />
    );
  } else if (hasMines) {
    AreaComponent = <MineArea boomed={boomed} />;
  } else {
    AreaComponent = <SafeArea adjMinesCount={adjMinesCount} />;
  }

  return (
    <section className="w-full h-full rounded-lg overflow-hidden">
      {AreaComponent}
    </section>
  );
}

export default Area;
