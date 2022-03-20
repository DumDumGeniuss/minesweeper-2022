import { Coordinate } from '@/lib/minesweeper';

type UnrevealedCellProps = {
  coord: Coordinate;
  onClick: (c: Coordinate) => any;
};

function UnrevealedCell({ coord, onClick }: UnrevealedCellProps) {
  return (
    <button
      className="flex justify-center items-center w-full h-full bg-gray-300"
      type="button"
      aria-label="Click cell"
      onClick={() => {
        onClick(coord);
      }}
      onKeyDown={() => {
        onClick(coord);
      }}
    >
      🌱
    </button>
  );
}

type MineCellPoprs = {
  boomed: boolean;
};

function MineCell({ boomed }: MineCellPoprs) {
  const bgColor = boomed ? 'bg-red-200' : 'bg-slate-100';
  const emoji = boomed ? '💥' : '💣';
  return (
    <section
      className={`flex w-full h-full justify-center items-center ${bgColor}`}
    >
      <section>{emoji}</section>
    </section>
  );
}

type NormalCellProps = {
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

function NormalCell({ adjMinesCount }: NormalCellProps) {
  return (
    <section className="flex w-full h-full justify-center items-center bg-slate-100">
      <section className={`${countColorMap[adjMinesCount]} font-bold`}>
        {adjMinesCount || ''}
      </section>
    </section>
  );
}

type Props = {
  revealed: boolean;
  hasMine: boolean;
  adjMinesCount: number;
  boomed: boolean;
  coord: Coordinate;
  onClick: (c: Coordinate) => any;
};

const Cell = function Cell({
  revealed,
  adjMinesCount,
  hasMine,
  boomed,
  coord,
  onClick,
}: Props) {
  let cellComponent: JSX.Element | null = null;

  if (!revealed) {
    cellComponent = <UnrevealedCell coord={coord} onClick={onClick} />;
  } else if (hasMine) {
    cellComponent = <MineCell boomed={boomed} />;
  } else {
    cellComponent = <NormalCell adjMinesCount={adjMinesCount} />;
  }

  return (
    <section className="w-full h-full border-[1px] border-[#e5e7eb]">
      {cellComponent}
    </section>
  );
};

export default Cell;
