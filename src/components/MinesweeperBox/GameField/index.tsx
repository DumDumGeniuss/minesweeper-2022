import { memo } from 'react';
import classnames from 'classnames';
import { CellsMap, Coordinate } from '@/lib/minesweeper';
import Cell from '../Cell';

const MemoCell = memo(Cell);

type Props = {
  cellsMap: CellsMap;
  onCellClick: (c: Coordinate) => any;
};

const GameFeild = function GameFeild({ cellsMap, onCellClick }: Props) {
  return (
    <section className="flex flex-row rounded-lg overflow-hidden bg-slate-200 p-2">
      {cellsMap.map((cells, x, cellsList) => (
        <section
          key={`${cells[0].coord[0]},${cells[0].coord[1]}`}
          className={classnames([
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            cellsList.length - 1 === x ? '' : 'mr-1',
          ])}
        >
          {cells.map((cell, y, cellList) => (
            <section
              key={`${cell.coord[0]},${cell.coord[1]}`}
              className={classnames([
                'w-8',
                'h-8',
                cellList.length - 1 === y ? '' : 'mb-1',
              ])}
            >
              <MemoCell
                revealed={cell.revealed}
                adjMinesCount={cell.adjMinesCount}
                hasMine={cell.hasMine}
                boomed={cell.boomed}
                coord={cell.coord}
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
