import { CellMap, Coordinate } from '@/lib/minesweeper';
import Square from './Square';

type Props = {
  cellMap: CellMap;
  onSquareClick: (c: Coordinate) => any;
};

const SquaresMap = function SquaresMap({ cellMap, onSquareClick }: Props) {
  return (
    <section className="inline-flex flex-col border-[1px] border-black">
      {cellMap.map((cells, x) => (
        <section key={cells[0].key} className="flex">
          {cells.map((cell, y) => (
            <section key={cell.key} className={`w-[${20}px] h-[${20}px]`}>
              <Square
                revealed={cell.revealed}
                adjMinesCount={cell.adjMinesCount}
                hasMine={cell.hasMine}
                boomed={cell.boomed}
                coord={[x, y]}
                onClick={onSquareClick}
              />
            </section>
          ))}
        </section>
      ))}
    </section>
  );
};

export default SquaresMap;
