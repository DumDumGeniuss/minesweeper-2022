import type { NextPage } from 'next';
import MinesweeperBox from '@/components/MinesweeperBox';

const Home: NextPage = function Home() {
  return (
    <main>
      <section>
        <MinesweeperBox />
      </section>
    </main>
  );
};

export default Home;
