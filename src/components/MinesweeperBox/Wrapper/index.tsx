type Props = {
  panel: JSX.Element;
  minefield: JSX.Element;
};

function Wrapper({ panel, minefield }: Props) {
  return (
    <section className="inline-flex p-4 rounded-xl bg-white">
      <section className="inline-flex flex-col">
        <section className="flex-grow">{panel}</section>
        <section className="mt-2">{minefield}</section>
      </section>
    </section>
  );
}

export default Wrapper;
