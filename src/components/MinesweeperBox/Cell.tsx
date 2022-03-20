import { Coordinate } from '@/lib/minesweeper';

type UnrevealedCellProps = {
  coord: Coordinate;
  onClick: (c: Coordinate) => any;
};

function UnrevealedCell({ coord, onClick }: UnrevealedCellProps) {
  return (
    <button
      className="inline-flex bg-lime-200 w-full h-full shadow-sm"
      type="button"
      aria-label="Click cell"
      onClick={() => {
        onClick(coord);
      }}
      onKeyDown={() => {
        onClick(coord);
      }}
    />
  );
}

type MineCellPoprs = {
  boomed: boolean;
};

function MineCell({ boomed }: MineCellPoprs) {
  return (
    <section className="inline-flex w-full h-full justify-center items-center">
      <span>{boomed ? '💥' : '💣'}</span>
    </section>
  );
}

type NormalCellProps = {
  adjMinesCount: number;
};

function NormalCell({ adjMinesCount }: NormalCellProps) {
  return (
    <section className="inline-flex w-full h-full justify-center items-center">
      <span>{adjMinesCount}</span>
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
    <section className="inline-flex w-full h-full">{cellComponent}</section>
  );
};

export default Cell;
