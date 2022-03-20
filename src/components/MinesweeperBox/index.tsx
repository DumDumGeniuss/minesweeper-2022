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
    minesCount: 0,
    size: { width: 0, height: 0 },
    duration: 0,
  });

  useEffect(() => {
    const ms = new Minesweeper(size, minesCount);
    setMinesweeper(ms);
    setProgress(ms.getProgress());

    const progressUpdater = setInterval(() => {
      setProgress(ms.getProgress());
    });

    return () => {
      ms.destroy();
      clearInterval(progressUpdater);
    };
  }, [size, minesCount]);

  const onCellClick = (c: Coordinate): any => {
    if (!minesweeper) {
      return;
    }
    const newProgress = minesweeper.revealCell(c);
    setProgress(newProgress);
  };

  const onResetClick = () => {
    if (!minesweeper) {
      return;
    }
    const newProgress = minesweeper.reset();
    setProgress(newProgress);
  };

  return (
    <Wrapper
      panel={
        <Panel
          status={progress.status}
          minesCount={progress.minesCount}
          duration={progress.duration}
          onResetClick={onResetClick}
        />
      }
      cellMap={
        <CellsMap cellMap={progress.cellMap} onCellClick={onCellClick} />
      }
    />
  );
};

export default MinesweeperBox;
