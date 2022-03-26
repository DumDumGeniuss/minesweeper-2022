import type { NextPage } from 'next';
import MinesweeperBox, { Theme } from '@/components/MinesweeperBox';

const Home: NextPage = function Home() {
  return (
    <main className="flex w-screen h-screen justify-center items-center bg-slate-100">
      <MinesweeperBox
        theme={Theme.Gray}
        size={{ width: 20, height: 15 }}
        minesCount={40}
      />
    </main>
  );
};

export default Home;
