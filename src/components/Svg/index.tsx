import arrow from './icons/arrow';
import bigLogo from './icons/big-logo';

type Props = {
  name: 'arrow' | 'bigLogo';
};

const svgMap = {
  arrow,
  bigLogo,
};

function Svg({ name }: Props) {
  return svgMap[name];
}

export default Svg;
