import type { NextPage } from 'next';
import { useState, useCallback, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { AppState } from '@/stores';
import { setTheme } from '@/stores/theme';
import { convertStringToTheme } from '@/styles/theme';
import BigLogoIcon from '@/components/icon/BigLogoIcon';
import MinesweeperBox from '@/components/box/MinesweeperBox';
import ThemeSelect from '@/components/select/ThemeSelect';
import BlurredEllipseIcon from '@/components/icon/BlurredEllipseIcon';

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
  const onThemeSelect = useCallback((value: string) => {
    dispatch(setTheme(convertStringToTheme(value)));
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-100">
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
        <ThemeSelect theme={theme} onSelect={onThemeSelect} />
      </section>
      <section className="relative flex w-full h-full justify-center items-center z-10">
        <MinesweeperBox theme={theme} size={size} minesCount={minesCount} />
      </section>
    </main>
  );
};

export default Home;
