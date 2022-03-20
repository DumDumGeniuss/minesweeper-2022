import { CellMap, Coordinate } from '@/lib/minesweeper';
import Square from './Square';

type Props = {
  cellMap: CellMap;
  onSquareClick: (c: Coordinate) => any;
};

const Panel = function Panel({ cellMap, onSquareClick }: Props) {
  return (
    <section>
      {cellMap.map((cells, x) => (
        <section key={cells[0].key} className="flex">
          {cells.map((cell, y) => (
            <Square
              key={cell.key}
              revealed={cell.revealed}
              adjacentMines={cell.adjacentMines}
              hasMine={cell.hasMine}
              boomed={cell.boomed}
              coord={[x, y]}
              size={20}
              onClick={onSquareClick}
            />
          ))}
        </section>
      ))}
    </section>
  );
};

export default Panel;
