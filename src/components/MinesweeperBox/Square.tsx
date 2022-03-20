import { Coordinate } from '@/lib/minesweeper';

type UnrevealedSquareProps = {
  coord: Coordinate;
  onClick: (c: Coordinate) => any;
};

function UnrevealedSquare({ coord, onClick }: UnrevealedSquareProps) {
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

type MineSquarePoprs = {
  boomed: boolean;
};

function MineSquare({ boomed }: MineSquarePoprs) {
  return (
    <section className="inline-flex w-full h-full justify-center items-center">
      <span>{boomed ? '💣!' : '💣'}</span>
    </section>
  );
}

type NormalSquareProps = {
  adjMinesCount: number;
};

function NormalSquare({ adjMinesCount }: NormalSquareProps) {
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

const Square = function Square({
  revealed,
  adjMinesCount,
  hasMine,
  boomed,
  coord,
  onClick,
}: Props) {
  let squareCom: JSX.Element | null = null;

  if (!revealed) {
    squareCom = <UnrevealedSquare coord={coord} onClick={onClick} />;
  } else if (hasMine) {
    squareCom = <MineSquare boomed={boomed} />;
  } else {
    squareCom = <NormalSquare adjMinesCount={adjMinesCount} />;
  }

  return <section className="inline-flex w-full h-full">{squareCom}</section>;
};

export default Square;
