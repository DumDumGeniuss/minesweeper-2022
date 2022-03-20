type Props = {
  onResetClick: () => any;
};

const Panel = function Panel({ onResetClick }: Props) {
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
          <span className="">😊😢</span>
        </button>
        <section />
      </section>
    </section>
  );
};

export default Panel;
