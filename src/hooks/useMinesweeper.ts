import { useEffect, useState, useCallback } from 'react';
import Minesweeper, { Size, Field, Status, EventType } from '@/lib/minesweeper';

type ReturnType = [
  Field,
  number,
  number,
  Status,
  (x: number, y: number) => any,
  (x: number, y: number) => any,
  () => any
];
export default function useMinesweeper(
  size: Size,
  minesCount: number
): ReturnType {
  const [minesweeper, setMinesweeper] = useState<Minesweeper>(
    () => new Minesweeper(size, minesCount)
  );
  const [minefield, setMinefield] = useState<Field>([]);
  const [gameDuration, setGameDuration] = useState<number>(0);
  const [gameFlagsCount, setGameFlagsCount] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<Status>('SLEEPING');

  const onAreaClick = useCallback(
    (x: number, y: number): any => {
      const progress = minesweeper.revealArea([x, y]);
      setGameDuration(progress.duration);
      setGameFlagsCount(progress.flagsCount);
      setMinefield(progress.field);
      setGameStatus(progress.status);
    },
    [minesweeper]
  );

  const onAreaContextMenu = useCallback(
    (x: number, y: number): any => {
      let progress = minesweeper.getProgress();
      const { flagged } = progress.field[x][y];
      if (flagged) {
        progress = minesweeper.unflagArea([x, y]);
      } else {
        progress = minesweeper.flagArea([x, y]);
      }
      setMinefield(progress.field);
      setGameFlagsCount(progress.flagsCount);
    },
    [minesweeper]
  );

  const onResetClick = useCallback(() => {
    const progress = minesweeper.reset();
    setGameDuration(progress.duration);
    setGameFlagsCount(progress.flagsCount);
    setMinefield(progress.field);
    setGameStatus(progress.status);
  }, [minesweeper]);

  const onDurationChange = useCallback((d: number) => {
    setGameDuration(d);
  }, []);

  useEffect(() => {
    const newMinesweeper = new Minesweeper(size, minesCount);
    const progress = newMinesweeper.getProgress();
    newMinesweeper.subscribe(EventType.DurationChange, onDurationChange);
    setMinesweeper(newMinesweeper);
    setGameDuration(progress.duration);
    setGameFlagsCount(progress.flagsCount);
    setMinefield(progress.field);
    setGameStatus(progress.status);

    return () => {
      minesweeper.destroy();
    };
  }, [size, minesCount]);

  return [
    minefield,
    gameDuration,
    gameFlagsCount,
    gameStatus,
    onAreaClick,
    onAreaContextMenu,
    onResetClick,
  ];
}
