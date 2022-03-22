import { memo } from 'react';
import classnames from 'classnames';
import Area from '../Area';

const MemoArea = memo(Area);

export type Minefield = {
  x: number;
  y: number;
  revealed: boolean;
  hasMines: boolean;
  adjMinesCount: number;
  boomed: boolean;
  flagged: boolean;
}[][];

type Props = {
  minefield: Minefield;
  onAreaClick: (x: number, y: number) => any;
  onAreaContextMenu: (x: number, y: number) => any;
};

function Minefeild({ minefield, onAreaClick, onAreaContextMenu }: Props) {
  const onContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <section
      onContextMenu={onContextMenu}
      className="flex flex-row rounded-lg overflow-hidden bg-slate-200 p-2"
    >
      {minefield.map((areas, x, areasList) => (
        <section
          key={areas[0].x}
          className={classnames([
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            areasList.length - 1 === x ? '' : 'mr-1',
          ])}
        >
          {areas.map((area, y, areaList) => (
            <section
              key={`${area.x},${area.y}`}
              className={classnames([
                'w-8',
                'h-8',
                areaList.length - 1 === y ? '' : 'mb-1',
              ])}
            >
              <MemoArea
                x={area.x}
                y={area.y}
                revealed={area.revealed}
                adjMinesCount={area.adjMinesCount}
                hasMines={area.hasMines}
                boomed={area.boomed}
                flagged={area.flagged}
                onClick={onAreaClick}
                onContextMenu={onAreaContextMenu}
              />
            </section>
          ))}
        </section>
      ))}
    </section>
  );
}

export default Minefeild;
