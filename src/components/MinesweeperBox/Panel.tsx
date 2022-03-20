import { Status } from '@/lib/minesweeper';

type Props = {
  status: Status;
  onResetClick: () => any;
};

const Panel = function Panel({ status, onResetClick }: Props) {
  let emoji: string | null = null;
  if (status === 'FAILED') {
    emoji = '😢';
  } else if (status === 'SUCCEEDED') {
    emoji = '😃';
  } else {
    emoji = '🙂';
  }

  return (
    <section className="inline-flex flex-col border-[1px] border-black">
      <section className="flex items-center justify-between p-[10px]">
        <section />
        <button
          className="w-[40px] h-[40px] inline-flex items-center justify-center border-[1px] border-black"
          type="button"
          aria-label="Reset game"
          onClick={onResetClick}
          onKeyDown={onResetClick}
        >
          <span className="text-4xl">{emoji}</span>
        </button>
        <section />
      </section>
    </section>
  );
};

export default Panel;
