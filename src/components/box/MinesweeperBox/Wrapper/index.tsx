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
        'flex',
        'p-4',
        'rounded-xl',
        'shadow-xl',
        palette.wrapper.bgColor,
      ])}
    >
      <section className="flex flex-col">
        <section>{panel}</section>
        <section className="flex-grow mt-2">{minefield}</section>
      </section>
    </section>
  );
}

export default Wrapper;
