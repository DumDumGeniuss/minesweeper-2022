type Props = {
  panel: JSX.Element;
  gameField: JSX.Element;
};

function Wrapper({ panel, gameField }: Props) {
  return (
    <section className="inline-flex p-4 rounded-xl bg-white">
      <section className="inline-flex flex-col">
        <section className="flex-grow">{panel}</section>
        <section className="mt-2">{gameField}</section>
      </section>
    </section>
  );
}

export default Wrapper;
