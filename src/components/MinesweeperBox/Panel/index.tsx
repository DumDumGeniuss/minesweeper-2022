import { Status } from '@/lib/minesweeper';

export type Props = {
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
    <section className="flex flex-col border-[1px] border-black bg-gray-200">
      <section className="flex items-center justify-between p-[10px]">
        <section className="flex justify-between items-center w-16 h-10 border-[1px] border-black bg-slate-100 px-2">
          <section>💣</section>
          <section>{minesCount.toString(10)}</section>
        </section>
        <button
          className="w-[40px] h-10 flex items-center justify-center rounded-lg bg-white"
          type="button"
          aria-label="Reset game"
          onClick={onResetClick}
          onKeyDown={onResetClick}
        >
          <section className="text-2xl">{emoji}</section>
        </button>
        <section className="flex justify-between items-center w-16 h-10 border-[1px] border-black bg-slate-100 px-2">
          <section>⏰</section>
          <section>{duration}</section>
        </section>
      </section>
    </section>
  );
};

export default Panel;
