import { useEffect, useState, useCallback, memo } from 'react';
import Minesweeper, { CellsMap, Coordinate, Status } from '@/lib/minesweeper';
import Wrapper from './Wrapper';
import Panel from './Panel';
import GameField from './GameField';

type Props = {
  size: { width: number; height: number };
  minesCount: number;
};

const MemoGameField = memo(GameField);

const MinesweeperBox = function MinesweeperBox({ size, minesCount }: Props) {
  const [minesweeper, setMinesweeper] = useState<Minesweeper | null>(null);
  const [cellsMap, setCellsMap] = useState<CellsMap>([]);
  const [duration, setDuration] = useState<number>(0);
  const [status, setStatus] = useState<Status>('SLEEPING');

  const onCellClick = useCallback(
    (c: Coordinate): any => {
      if (!minesweeper) {
        return;
      }
      const progress = minesweeper.revealCell(c);
      setCellsMap(progress.cellsMap);
      setStatus(progress.status);
    },
    [minesweeper]
  );

  const onResetClick = useCallback(() => {
    if (!minesweeper) {
      return;
    }
    const progress = minesweeper.reset();
    setCellsMap(progress.cellsMap);
    setStatus(progress.status);
  }, [minesweeper]);

  const onDurationChange = useCallback((d: number) => {
    setDuration(d);
  }, []);

  useEffect(() => {
    const ms = new Minesweeper(size, minesCount, onDurationChange);
    setMinesweeper(ms);
    const progress = ms.getProgress();
    setCellsMap(progress.cellsMap);
    setStatus(progress.status);
    setDuration(progress.duration);
  }, [size, minesCount]);

  useEffect(() => {}, [minesweeper]);

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
      gameField={
        <MemoGameField cellsMap={cellsMap} onCellClick={onCellClick} />
      }
    />
  );
};

export default MinesweeperBox;
