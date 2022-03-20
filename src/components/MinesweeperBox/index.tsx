import { useEffect, useState } from 'react';
import Minesweeper, { CellsMap, Coordinate, Status } from '@/lib/minesweeper';
import Wrapper from './Wrapper';
import Panel from './Panel';
import GameField from './GameField';

type Props = {
  size: { width: number; height: number };
  minesCount: number;
};

const MinesweeperBox = function MinesweeperBox({ size, minesCount }: Props) {
  const [minesweeper, setMinesweeper] = useState<Minesweeper | null>(null);
  const [cellsMap, setCellsMap] = useState<CellsMap>([]);
  const [duration, setDuration] = useState<number>(0);
  const [status, setStatus] = useState<Status>('SLEEPING');

  useEffect(() => {
    const ms = new Minesweeper(size, minesCount);
    setMinesweeper(ms);
    const progress = ms.getProgress();
    setCellsMap(progress.cellsMap);
    setStatus(progress.status);
    setDuration(progress.duration);

    // const progressUpdater = setInterval(() => {
    //   setDuration(ms.getProgress().duration);
    // }, 1000);

    // return () => {
    //   ms.destroy();
    //   clearInterval(progressUpdater);
    // };
  }, [size, minesCount]);

  const onCellClick = (c: Coordinate): any => {
    if (!minesweeper) {
      return;
    }
    const progress = minesweeper.revealCell(c);
    setCellsMap(progress.cellsMap);
    setStatus(progress.status);
  };

  const onResetClick = () => {
    if (!minesweeper) {
      return;
    }
    const progress = minesweeper.reset();
    setCellsMap(progress.cellsMap);
    setStatus(progress.status);
  };

  return (
    <Wrapper
      panel={
        <Panel
          status={status}
          minesCount={minesCount}
          duration={duration}
          onResetClick={onResetClick}
        />
      }
      gameField={<GameField cellsMap={cellsMap} onCellClick={onCellClick} />}
    />
  );
};

export default MinesweeperBox;
