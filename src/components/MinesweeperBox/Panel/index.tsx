export enum Status {
  Sleeing = 0,
  Started = 1,
  Failed = 2,
  Succeeded = 3,
}

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
  switch (status) {
    case Status.Failed:
      emoji = '😢';
      break;
    case Status.Succeeded:
      emoji = '😃';
      break;
    case Status.Sleeing:
      emoji = '😴';
      break;
    default:
      emoji = '🙂';
      break;
  }

  return (
    <section className="flex items-center justify-between h-16 rounded-xl">
      <section className="flex justify-between items-center w-28 h-10 rounded-lg bg-slate-200 px-4">
        <section>💣</section>
        <section>{minesCount.toString(10)}</section>
      </section>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200"
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
