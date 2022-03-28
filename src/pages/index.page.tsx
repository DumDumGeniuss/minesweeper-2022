import type { NextPage } from 'next';
import { useState, useCallback, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { AppState } from '@/stores';
import { setTheme } from '@/stores/theme';
import { convertStringToTheme, Theme } from '@/styles/theme';
import BigLogoIcon from '@/components/icon/BigLogoIcon';
import MinesweeperBox from '@/components/box/MinesweeperBox';
import ColorSelect from '@/components/select/ColorSelect';
import BlurredEllipseIcon from '@/components/icon/BlurredEllipseIcon';

const themeOptions = [
  {
    value: Theme.Amber,
    bgColor: 'bg-amber-400',
    borderColor: 'border-amber-400',
    borderColorSelect: 'border-amber-600',
    borderColorHover: 'hover:border-amber-600',
  },
  {
    value: Theme.Emerald,
    bgColor: 'bg-emerald-400',
    borderColor: 'border-emerald-400',
    borderColorSelect: 'border-emerald-600',
    borderColorHover: 'hover:border-emerald-600',
  },
  {
    value: Theme.Indigo,
    bgColor: 'bg-indigo-400',
    borderColor: 'border-indigo-400',
    borderColorSelect: 'border-indigo-600',
    borderColorHover: 'hover:border-indigo-600',
  },
  {
    value: Theme.Gray,
    bgColor: 'bg-gray-400',
    borderColor: 'border-gray-400',
    borderColorSelect: 'border-gray-600',
    borderColorHover: 'hover:border-gray-600',
  },
  {
    value: Theme.Green,
    bgColor: 'bg-green-400',
    borderColor: 'border-green-400',
    borderColorSelect: 'border-green-600',
    borderColorHover: 'hover:border-green-600',
  },
  {
    value: Theme.Purple,
    bgColor: 'bg-purple-400',
    borderColor: 'border-purple-400',
    borderColorSelect: 'border-purple-600',
    borderColorHover: 'hover:border-purple-600',
  },
  {
    value: Theme.Red,
    bgColor: 'bg-red-400',
    borderColor: 'border-red-400',
    borderColorSelect: 'border-red-600',
    borderColorHover: 'hover:border-red-600',
  },
  {
    value: Theme.Sky,
    bgColor: 'bg-sky-400',
    borderColor: 'border-sky-400',
    borderColorSelect: 'border-sky-600',
    borderColorHover: 'hover:border-sky-600',
  },
  {
    value: Theme.Pink,
    bgColor: 'bg-pink-400',
    borderColor: 'border-pink-400',
    borderColorSelect: 'border-pink-600',
    borderColorHover: 'hover:border-pink-600',
  },
];

type EllipseContainerProps = {
  top: number | null;
  left: number | null;
  bottom: number | null;
  right: number | null;
  children: ReactNode;
};

function EllipseContainer({
  top = null,
  left = null,
  bottom = null,
  right = null,
  children,
}: EllipseContainerProps) {
  return (
    <section
      className={classnames(['absolute'])}
      style={{
        top: top !== null ? `calc(${top}vw)` : undefined,
        left: left !== null ? `calc(${left}vw)` : undefined,
        bottom: bottom !== null ? `calc(${bottom}vw)` : undefined,
        right: right !== null ? `calc(${right}vw)` : undefined,
      }}
    >
      {children}
    </section>
  );
}

const Home: NextPage = function Home() {
  const [size] = useState({ width: 20, height: 15 });
  const [minesCount] = useState(40);
  const {
    theme: { theme },
  } = useSelector<AppState, AppState>((state) => state);
  const dispatch = useDispatch();
  const onColorSelect = useCallback((value: string) => {
    dispatch(setTheme(convertStringToTheme(value)));
  }, []);

  return (
    <main className="relative w-screen h-screen bg-slate-100">
      <EllipseContainer top={-20} left={-10} bottom={null} right={null}>
        <BlurredEllipseIcon
          theme={theme}
          opacity={0.4}
          width={27}
          height={40}
        />
      </EllipseContainer>
      <EllipseContainer top={-5} left={10} bottom={null} right={null}>
        <BlurredEllipseIcon
          theme={theme}
          opacity={0.2}
          width={25}
          height={26}
        />
      </EllipseContainer>
      <EllipseContainer top={null} left={null} bottom={-50} right={-30}>
        <BlurredEllipseIcon
          theme={theme}
          opacity={0.3}
          width={65}
          height={74}
        />
      </EllipseContainer>
      <EllipseContainer top={null} left={null} bottom={20} right={-5}>
        <BlurredEllipseIcon
          theme={theme}
          opacity={0.2}
          width={24}
          height={16}
        />
      </EllipseContainer>
      <section className={classnames(['absolute', 'top-4', 'left-4'])}>
        <BigLogoIcon theme={theme} />
      </section>
      <section className="absolute top-4 right-4 z-20">
        <ColorSelect
          choice={theme}
          options={themeOptions}
          onOptionClick={onColorSelect}
        />
      </section>
      <section className="relative flex w-full h-full justify-center items-center z-10">
        <MinesweeperBox theme={theme} size={size} minesCount={minesCount} />
      </section>
    </main>
  );
};

export default Home;
