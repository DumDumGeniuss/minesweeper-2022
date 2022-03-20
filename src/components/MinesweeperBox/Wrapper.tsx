type Props = {
  panel: JSX.Element;
  cellMap: JSX.Element;
};

function Wrapper({ panel, cellMap }: Props) {
  return (
    <section className="inline-flex border-[1px] border-black p-[10px]">
      <section className="inline-flex flex-col">
        <section className="flex-grow">{panel}</section>
        <section className="mt-2">{cellMap}</section>
      </section>
    </section>
  );
}

export default Wrapper;
