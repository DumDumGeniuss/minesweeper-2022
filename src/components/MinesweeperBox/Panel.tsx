import { Status } from '@/lib/minesweeper';

type Props = {
  status: Status;
  minesCount: number;
  duration: number;
  onResetClick: () => any;
};

const Panel = function Panel({
  status,
  minesCount,
  duration,
  onResetClick,
}: Props) {
  let emoji: string | null = null;
  if (status === 'FAILED') {
    emoji = '😢';
  } else if (status === 'SUCCEEDED') {
    emoji = '😃';
  } else if (status === 'SLEEPING') {
    emoji = '😴';
  } else {
    emoji = '🙂';
  }

  return (
    <section className="flex flex-col border-[1px] border-black">
      <section className="flex items-center justify-between p-[10px]">
        <section className="inline-flex justify-center items-center h-[40px] px-2 border-[1px] border-black">
          <section>💣</section>
          <section>{minesCount.toString(10)}</section>
        </section>
        <button
          className="w-[40px] h-[40px] inline-flex items-center justify-center border-[1px] border-black"
          type="button"
          aria-label="Reset game"
          onClick={onResetClick}
          onKeyDown={onResetClick}
        >
          <section className="text-4xl">{emoji}</section>
        </button>
        <section className="inline-flex justify-center items-center h-[40px] px-2 border-[1px] border-black">
          <section>⏰</section>
          <section>{duration}</section>
        </section>
      </section>
    </section>
  );
};

export default Panel;
