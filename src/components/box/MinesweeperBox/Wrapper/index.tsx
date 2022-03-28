import { useContext } from 'react';
import classnames from 'classnames';
import PaletteContext from '../PaletteContext';

type Props = {
  panel: JSX.Element;
  minefield: JSX.Element;
};

function Wrapper({ panel, minefield }: Props) {
  const palette = useContext(PaletteContext);
  return (
    <section
      className={classnames([
        'inline-flex',
        'p-4',
        'rounded-xl',
        'shadow-xl',
        palette.wrapper.bgColor,
      ])}
    >
      <section className="inline-flex flex-col">
        <section className="flex-grow">{panel}</section>
        <section className="mt-2">{minefield}</section>
      </section>
    </section>
  );
}

export default Wrapper;
