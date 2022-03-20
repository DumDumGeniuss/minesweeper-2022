import { CellMap, Coordinate } from '@/lib/minesweeper';
import Cell from './Cell';

type Props = {
  cellMap: CellMap;
  onCellClick: (c: Coordinate) => any;
};

const CellsMap = function CellsMap({ cellMap, onCellClick }: Props) {
  return (
    <section className="flex flex-col border-[1px] border-[#313131]">
      {cellMap.map((cells, x) => (
        <section
          key={cells[0].key}
          className="flex justify-center items-center"
        >
          {cells.map((cell, y) => (
            <section key={cell.key} className="w-[32px] h-[32px]">
              <Cell
                revealed={cell.revealed}
                adjMinesCount={cell.adjMinesCount}
                hasMine={cell.hasMine}
                boomed={cell.boomed}
                coord={[x, y]}
                onClick={onCellClick}
              />
            </section>
          ))}
        </section>
      ))}
    </section>
  );
};

export default CellsMap;
