import classnames from 'classnames';
import { CellsMap, Coordinate } from '@/lib/minesweeper';
import Cell from '../Cell';

type Props = {
  cellsMap: CellsMap;
  onCellClick: (c: Coordinate) => any;
};

const GameFeild = function GameFeild({ cellsMap, onCellClick }: Props) {
  return (
    <section className="flex flex-col rounded-lg overflow-hidden bg-slate-200 p-2">
      {cellsMap.map((cells, x, cellsList) => (
        <section
          key={cells[0].key}
          className={classnames([
            'flex',
            'justify-center',
            'items-center',
            cellsList.length - 1 === x ? '' : 'mb-1',
          ])}
        >
          {cells.map((cell, y, cellList) => (
            <section
              key={cell.key}
              className={classnames([
                'w-8',
                'h-8',
                cellList.length - 1 === y ? '' : 'mr-1',
              ])}
            >
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

export default GameFeild;
