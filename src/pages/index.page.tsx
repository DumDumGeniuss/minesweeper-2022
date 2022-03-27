import type { NextPage } from 'next';
import { useState, useCallback } from 'react';
import MinesweeperBox, { Theme } from '@/components/MinesweeperBox';
import ThemeSelect from '@/components/ThemeSelect';

const Home: NextPage = function Home() {
  const [theme, setTheme] = useState(Theme.Sky);
  const onThemeSelect = useCallback((value: string) => {
    switch (value) {
      case Theme.Amber:
        setTheme(Theme.Amber);
        break;
      case Theme.Emerald:
        setTheme(Theme.Emerald);
        break;
      case Theme.Indigo:
        setTheme(Theme.Indigo);
        break;
      case Theme.Gray:
        setTheme(Theme.Gray);
        break;
      case Theme.Green:
        setTheme(Theme.Green);
        break;
      case Theme.Purple:
        setTheme(Theme.Purple);
        break;
      case Theme.Red:
        setTheme(Theme.Red);
        break;
      case Theme.Sky:
        setTheme(Theme.Sky);
        break;
      default:
        setTheme(Theme.Sky);
    }
  }, []);

  return (
    <main className="relative w-screen h-screen bg-slate-100">
      <section className="absolute top-4 right-4">
        <ThemeSelect
          choice={theme}
          options={[
            {
              value: Theme.Amber,
              bgColor: 'bg-amber-400',
              darkColor: 'bg-amber-400',
            },
            {
              value: Theme.Emerald,
              bgColor: 'bg-emerald-400',
              darkColor: 'bg-emerald-400',
            },
            {
              value: Theme.Indigo,
              bgColor: 'bg-indigo-400',
              darkColor: 'bg-indigo-400',
            },
            {
              value: Theme.Gray,
              bgColor: 'bg-gray-400',
              darkColor: 'bg-gray-400',
            },
            {
              value: Theme.Green,
              bgColor: 'bg-green-400',
              darkColor: 'bg-green-400',
            },
            {
              value: Theme.Purple,
              bgColor: 'bg-purple-400',
              darkColor: 'bg-purple-400',
            },
            {
              value: Theme.Red,
              bgColor: 'bg-red-400',
              darkColor: 'bg-red-400',
            },
            {
              value: Theme.Sky,
              bgColor: 'bg-sky-400',
              darkColor: 'bg-sky-400',
            },
          ]}
          onOptionClick={onThemeSelect}
        />
      </section>
      <section className="flex w-full h-full justify-center items-center">
        <MinesweeperBox
          theme={theme}
          size={{ width: 20, height: 15 }}
          minesCount={40}
        />
      </section>
    </main>
  );
};

export default Home;
