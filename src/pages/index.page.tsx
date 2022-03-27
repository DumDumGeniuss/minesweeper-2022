import type { NextPage } from 'next';
import { useState, useCallback } from 'react';
import classnames from 'classnames';
import MinesweeperBox, {
  Theme,
  convertStringToTheme,
} from '@/components/MinesweeperBox';
import ThemeSelect from '@/components/ThemeSelect';
import Svg from '@/components/Svg';

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

const convertThemeToLogoColor = (theme: Theme) => {
  switch (theme) {
    case Theme.Amber:
      return 'text-amber-500';
    case Theme.Emerald:
      return 'text-emerald-500';
    case Theme.Indigo:
      return 'text-indigo-500';
    case Theme.Gray:
      return 'text-gray-500';
    case Theme.Green:
      return 'text-green-500';
    case Theme.Purple:
      return 'text-purple-500';
    case Theme.Red:
      return 'text-red-500';
    case Theme.Sky:
      return 'text-sky-500';
    case Theme.Pink:
      return 'text-pink-500';
    default:
      return 'text-sky-500';
  }
};

const Home: NextPage = function Home() {
  const [size] = useState({ width: 20, height: 15 });
  const [minesCount] = useState(40);
  const [theme, setTheme] = useState(Theme.Sky);
  const onThemeSelect = useCallback((value: string) => {
    setTheme(convertStringToTheme(value));
  }, []);

  return (
    <main className="relative w-screen h-screen bg-slate-100">
      <section
        className={classnames([
          'absolute',
          'top-4',
          'left-4',
          convertThemeToLogoColor(theme),
        ])}
      >
        <Svg name="bigLogo" />
      </section>
      <section className="absolute top-4 right-4">
        <ThemeSelect
          choice={theme}
          options={themeOptions}
          onOptionClick={onThemeSelect}
        />
      </section>
      <section className="flex w-full h-full justify-center items-center">
        <MinesweeperBox theme={theme} size={size} minesCount={minesCount} />
      </section>
    </main>
  );
};

export default Home;
