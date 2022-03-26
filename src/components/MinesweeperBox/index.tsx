import { memo } from 'react';
import { Field, Status } from '@/lib/minesweeper';
import useMinesweeper from '@/hooks/useMinesweeper';
import WrapperComp from './Wrapper';
import PanelComp, { Status as PanelStatus } from './Panel';
import MinefieldComp, { Minefield } from './Minefield';
import PaletteContext, { palette, ThemeColor } from './PaletteContext';

/**
 * Convert Status in minesweeper to PanelStatus used in Panel Component.
 * @param status Status
 * @returns PanelStatus
 */
function convertStatusToPanelStatus(status: Status): PanelStatus {
  switch (status) {
    case 'FAILED':
      return PanelStatus.Failed;
    case 'STARTED':
      return PanelStatus.Started;
    case 'SLEEPING':
      return PanelStatus.Sleeing;
    default:
      return PanelStatus.Succeeded;
  }
}

/**
 * Convert Field in minesweeper to Minefield used in Minefield Component.
 * @param field Field
 * @returns Minefield
 */
function converFieldToMinefield(field: Field): Minefield {
  return field.map((areas) =>
    areas.map((area) => ({
      x: area.coord[0],
      y: area.coord[1],
      revealed: area.revealed,
      hasMines: area.hasMines,
      adjMinesCount: area.adjMinesCount,
      boomed: area.boomed,
      flagged: area.flagged,
    }))
  );
}

type Props = {
  size: { width: number; height: number };
  minesCount: number;
  themeColor: ThemeColor;
};

const MemoMinefieldComp = memo(MinefieldComp);

const MinesweeperBox = function MinesweeperBox({
  size,
  minesCount,
  themeColor,
}: Props) {
  const [
    gameField,
    gameDuration,
    gameStatus,
    onAreaClick,
    onAreaContextMenu,
    onResetClick,
  ] = useMinesweeper(size, minesCount);

  const panelState: PanelStatus = convertStatusToPanelStatus(gameStatus);
  const minefield: Minefield = converFieldToMinefield(gameField);

  return (
    <PaletteContext.Provider value={palette[themeColor]}>
      <WrapperComp
        panel={
          <PanelComp
            status={panelState}
            minesCount={minesCount}
            duration={gameDuration}
            onResetClick={onResetClick}
          />
        }
        minefield={
          <MemoMinefieldComp
            minefield={minefield}
            onAreaClick={onAreaClick}
            onAreaContextMenu={onAreaContextMenu}
          />
        }
      />
    </PaletteContext.Provider>
  );
};

export default MinesweeperBox;

export { ThemeColor };
