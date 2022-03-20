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
    <section className="flex items-center justify-between h-16 rounded-xl">
      <section className="flex justify-between items-center w-28 h-10 rounded-lg bg-slate-200 px-4">
        <section>💣</section>
        <section>{minesCount.toString(10)}</section>
      </section>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 drop-shadow-md hover:drop-shadow-none"
        type="button"
        aria-label="Reset game"
        onClick={onResetClick}
        onKeyDown={onResetClick}
      >
        <section className="text-2xl">{emoji}</section>
      </button>
      <section className="flex justify-between items-center w-28 h-10 rounded-lg bg-slate-200 px-4">
        <section>⏰</section>
        <section>{duration}</section>
      </section>
    </section>
  );
};

export default Panel;
