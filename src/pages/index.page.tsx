import type { NextPage } from 'next';
import MinesweeperBox from '@/components/MinesweeperBox';

const Home: NextPage = function Home() {
  return (
    <main className="flex w-screen h-screen justify-center items-center bg-slate-100">
      <MinesweeperBox size={{ width: 10, height: 15 }} minesCount={10} />
    </main>
  );
};

export default Home;
