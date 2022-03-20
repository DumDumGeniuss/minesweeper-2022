import { useEffect, useState } from 'react';
import Minesweeper, { Coordinate, GameInfo } from '@/lib/minesweeper';
import Panel from './Panel';
import SquareMap from './SquareMap';

type Props = {
  size: { width: number; height: number };
  minesCount: number;
};

const MinesweeperBox = function MinesweeperBox(props: Props) {
  const { size, minesCount } = props;
  const [minesweeper, setMinesweeper] = useState<Minesweeper | null>(null);
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    map: [],
    size: { width: 0, height: 0 },
    status: 'WAITING',
  });

  useEffect(() => {
    const ms = new Minesweeper(size, minesCount);
    setMinesweeper(ms);
    setGameInfo(ms.getGameInfo());
  }, []);

  const onSquareClick = (c: Coordinate): any => {
    if (!minesweeper) {
      return;
    }
    minesweeper.revealCell(c);
    setGameInfo(minesweeper.getGameInfo());
  };

  const onResetClick = () => {
    if (!minesweeper) {
      return;
    }
    minesweeper.reset();
    setGameInfo(minesweeper.getGameInfo());
  };

  return (
    <section className="inline-flex border-[1px] border-black p-[10px]">
      <section className="inline-flex flex-col border-[1px] border-black">
        <Panel onResetClick={onResetClick} />
        <section className="grow border-t-[1px] border-black" />
        <SquareMap cellMap={gameInfo.map} onSquareClick={onSquareClick} />
      </section>
    </section>
  );
};

export default MinesweeperBox;
