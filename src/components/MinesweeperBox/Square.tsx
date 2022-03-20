import { Coordinate } from '@/lib/minesweeper';

type Props = {
  revealed: boolean;
  hasMine: boolean;
  adjacentMines: number;
  boomed: boolean;
  coord: Coordinate;
  size: number;
  onClick: (c: Coordinate) => any;
};

const Square = function Square({
  revealed,
  adjacentMines,
  hasMine,
  boomed,
  coord,
  size,
  onClick,
}: Props) {
  if (!revealed) {
    return (
      <button
        style={{
          display: 'inline-flex',
          width: size,
          height: size,
          background: 'grey',
          border: '1px solid white',
        }}
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
  if (hasMine) {
    return (
      <section
        style={{
          display: 'inline-flex',
          width: size,
          height: size,
          background: 'white',
          border: '1px solid white',
        }}
      >
        {boomed ? '💣!' : '💣'}
      </section>
    );
  }
  return (
    <section
      style={{
        display: 'inline-flex',
        width: size,
        height: size,
        background: 'white',
        border: '1px solid white',
      }}
    >
      {adjacentMines}
    </section>
  );
};

export default Square;
