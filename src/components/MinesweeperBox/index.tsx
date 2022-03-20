import { useEffect, useState } from 'react';
import Minesweeper, { Coordinate, Progress } from '@/lib/minesweeper';
import Wrapper from './Wrapper';
import Panel from './Panel';
import CellsMap from './CellsMap';

type Props = {
  size: { width: number; height: number };
  minesCount: number;
};

const MinesweeperBox = function MinesweeperBox(props: Props) {
  const { size, minesCount } = props;
  const [minesweeper, setMinesweeper] = useState<Minesweeper | null>(null);
  const [progress, setProgress] = useState<Progress>({
    cellMap: [],
    status: 'SLEEPING',
  });

  useEffect(() => {
    const ms = new Minesweeper(size, minesCount);
    setMinesweeper(ms);
    setProgress(ms.getProgress());
  }, [size, minesCount]);

  const onCellClick = (c: Coordinate): any => {
    if (!minesweeper) {
      return;
    }
    minesweeper.revealCell(c);
    setProgress(minesweeper.getProgress());
  };

  const onResetClick = () => {
    if (!minesweeper) {
      return;
    }
    minesweeper.reset();
    setProgress(minesweeper.getProgress());
  };

  return (
    <Wrapper
      panel={<Panel status={progress.status} onResetClick={onResetClick} />}
      cellMap={
        <CellsMap cellMap={progress.cellMap} onCellClick={onCellClick} />
      }
    />
  );
};

export default MinesweeperBox;
