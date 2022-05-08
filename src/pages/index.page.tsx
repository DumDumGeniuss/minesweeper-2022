import type { NextPage } from 'next';
import {
  useState,
  useCallback,
  ReactNode,
  useRef,
  useEffect,
  memo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import { AppState } from '@/stores';
import { setTheme } from '@/stores/theme';
import { convertStringToTheme } from '@/styles/theme';
import BigLogoIcon from '@/components/icon/BigLogoIcon';
import MinesweeperBox from '@/components/box/MinesweeperBox';
import ThemeSelect from '@/components/select/ThemeSelect';
import BlurredEllipseIcon from '@/components/icon/BlurredEllipseIcon';
import useDomRect from '@/hooks/useDomRect';
import useResolutionCalculator from '@/hooks/useResolutionCalculator';

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

const MinesweeperBoxMemo = memo(MinesweeperBox);

const Home: NextPage = function Home() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [minesCount] = useState(40);

  const {
    theme: { theme },
  } = useSelector<AppState, AppState>((state) => state);
  const dispatch = useDispatch();

  const onThemeSelect = useCallback((value: string) => {
    dispatch(setTheme(convertStringToTheme(value)));
  }, []);

  const gameAreaSize = 32;

  const gameWrapperRef = useRef<HTMLElement>(null);
  const gameWrapperRect = useDomRect(gameWrapperRef);
  const [gameWidth, gameHeight] = useResolutionCalculator(
    {
      width: gameWrapperRect.width - 60,
      height: gameWrapperRect.height - 110,
    },
    gameAreaSize
  );

  const debounceSetSize = debounce(setSize, 300);
  useEffect(() => {
    debounceSetSize({
      width: gameWidth > 20 ? 20 : gameWidth,
      height: gameHeight > 15 ? 15 : gameHeight,
    });
  }, [gameWidth, gameHeight]);

  const displayGame = size.width > 0 && size.height > 0;

  return (
    <main className="relative w-screen h-screen flex flex-col overflow-hidden bg-slate-100">
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
      <section className="flex-shrink-0 h-20" />
      <section
        ref={gameWrapperRef}
        className="relative flex-grow flex overflow-hidden justify-center items-center z-10"
      >
        {displayGame && (
          <MinesweeperBoxMemo
            theme={theme}
            size={size}
            areaSize={gameAreaSize}
            minesCount={minesCount}
          />
        )}
      </section>
    </main>
  );
};

export default Home;
