import { memo, useCallback } from 'react';
import classnames from 'classnames';
import AreaComp from '../Area';

const MemoAreaComp = memo(AreaComp);

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
  areaSize: number;
  onAreaClick: (x: number, y: number) => any;
  onAreaContextMenu: (x: number, y: number) => any;
};

function Minefeild({
  minefield,
  areaSize,
  onAreaClick,
  onAreaContextMenu,
}: Props) {
  const checkIsAreaRevealed = useCallback(
    (x: number, y: number) => {
      if (!minefield[x] || !minefield[x][y]) {
        return false;
      }
      return minefield[x][y].revealed;
    },
    [minefield]
  );
  const onContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <section
      onContextMenu={onContextMenu}
      className="flex flex-row rounded-lg overflow-hidden"
    >
      {minefield.map((areas) => (
        <section
          key={areas[0].x}
          className={classnames([
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
          ])}
        >
          {areas.map((area) => (
            <section
              key={`${area.x},${area.y}`}
              style={{ width: areaSize, height: areaSize }}
            >
              <MemoAreaComp
                x={area.x}
                y={area.y}
                revealed={area.revealed}
                adjMinesCount={area.adjMinesCount}
                hasMines={area.hasMines}
                boomed={area.boomed}
                flagged={area.flagged}
                checkIsAreaRevealed={checkIsAreaRevealed}
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
