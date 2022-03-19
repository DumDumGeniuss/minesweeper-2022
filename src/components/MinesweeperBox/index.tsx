import { useEffect, useState } from 'react';
import Minesweeper, { Coordinate, GameInfo } from '@/lib/minesweeper';

const squareUnit = 20;

type SquareProps = {
  revealed: boolean;
  hasMine: boolean;
  adjacentMines: number;
  boomed: boolean;
  coord: Coordinate;
  onClick: (c: Coordinate) => any;
};

const Square = function Square({
  revealed,
  adjacentMines,
  hasMine,
  boomed,
  coord,
  onClick,
}: SquareProps) {
  if (!revealed) {
    return (
      <button
        style={{
          display: 'inline-flex',
          width: squareUnit,
          height: squareUnit,
          background: 'grey',
          border: '1px solid white',
        }}
        type="button"
        aria-label="Click cell"
        onClick={() => {
          onClick(coord);
        }}
        onKeyDown={() => {
          onClick(coord);
        }}
      />
    );
  }
  if (hasMine) {
    return (
      <section
        style={{
          display: 'inline-flex',
          width: squareUnit,
          height: squareUnit,
          background: 'white',
          border: '1px solid white',
        }}
      >
        {boomed ? '💣!' : '💣'}
      </section>
    );
  }
  return (
    <section
      style={{
        display: 'inline-flex',
        width: squareUnit,
        height: squareUnit,
        background: 'white',
        border: '1px solid white',
      }}
    >
      {adjacentMines}
    </section>
  );
};

type MinesweeperBoxProps = {
  size: { width: number; height: number };
  minesCount: number;
};

const MinesweeperBox = function MinesweeperBox(props: MinesweeperBoxProps) {
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

  const onSquareClick = (c: Coordinate) => {
    if (!minesweeper) {
      return;
    }
    minesweeper.revealCell(c);
    setGameInfo(minesweeper.getGameInfo());
  };

  const onSmileClick = () => {
    if (!minesweeper) {
      return;
    }
    minesweeper.reset();
    setGameInfo(minesweeper.getGameInfo());
  };

  return (
    <section className="inline-flex border-[1px] border-black p-[10px]">
      <section className="inline-flex flex-col border-[1px] border-black">
        <section className="flex items-center justify-between p-[10px]">
          <section />
          <button
            className="w-[40px] h-[40px] inline-flex items-center justify-center border-[1px] border-black"
            type="button"
            aria-label="Reset game"
            onClick={onSmileClick}
            onKeyDown={onSmileClick}
          >
            <span className="">😊</span>
          </button>
          <section />
        </section>
        <section className="grow border-t-[1px] border-black" />
        <section
          style={{
            width: size.width * squareUnit,
            height: size.height * squareUnit,
          }}
        >
          {gameInfo.map.map((cells, x) => (
            <section key={cells[0].key} className="flex">
              {cells.map((cell, y) => (
                <Square
                  key={cell.key}
                  revealed={cell.revealed}
                  adjacentMines={cell.adjacentMines}
                  hasMine={cell.hasMine}
                  boomed={cell.boomed}
                  coord={[x, y]}
                  onClick={onSquareClick}
                />
              ))}
            </section>
          ))}
        </section>
      </section>
    </section>
  );
};

export default MinesweeperBox;
