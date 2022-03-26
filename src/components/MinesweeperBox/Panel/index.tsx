import { useContext } from 'react';
import classnames from 'classnames';
import PaletteContext from '../PaletteContext';

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

  const palette = useContext(PaletteContext);
  const sidePanelBgColor = palette.panel.sidePanel.bgColor;
  const resetButtonBgColor = palette.panel.resetButton.bgColorHover;

  return (
    <section
      className={classnames([
        'flex',
        'items-center',
        'justify-between',
        'h-16',
        'rounded-xl',
      ])}
    >
      <section
        className={classnames([
          'flex',
          'justify-between',
          'items-center',
          'w-28',
          'h-10',
          'rounded-lg',
          'px-4',
          'shadow-inner',
          sidePanelBgColor,
        ])}
      >
        <section>💣</section>
        <section>{minesCount.toString(10)}</section>
      </section>
      <button
        className={classnames([
          'w-10',
          'h-10',
          'flex',
          'items-center',
          'justify-center',
          'rounded-lg',
          'drop-shadow-lg',
          'hover:drop-shadow-none',
          'bg-white',
          resetButtonBgColor,
        ])}
        type="button"
        aria-label="Reset game"
        onClick={onResetClick}
        onKeyDown={onResetClick}
      >
        <section className={classnames(['text-2xl'])}>{emoji}</section>
      </button>
      <section
        className={classnames([
          'flex',
          'justify-between',
          'items-center',
          'w-28',
          'h-10',
          'rounded-lg',
          'px-4',
          'shadow-inner',
          sidePanelBgColor,
        ])}
      >
        <section>⏰</section>
        <section>{duration}</section>
      </section>
    </section>
  );
};

export default Panel;
