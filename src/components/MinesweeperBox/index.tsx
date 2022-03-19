import { useRef } from 'react';
// import Minesweeper from '@/lib/minesweeper';

const MinesweeperBox = function MinesweeperBox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [] = useState<Minesweeper>(
  //   new Minesweeper({ width: 10, height: 10 }, 5)
  // );

  // useEffect(() => {
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvasDom = canvasRef.current;
  //   canvasDom.width = 300;
  //   canvasDom.height = 300;
  //   const context = canvasDom.getContext('2d');
  //   if (context) {
  //     context.beginPath();
  //     context.rect(0, 0, canvasDom.width, canvasDom.height);
  //     context.fillStyle = 'grey';
  //     context.fill();
  //   }
  // }, [canvasRef.current]);

  return <canvas ref={canvasRef} />;
};

export default MinesweeperBox;
