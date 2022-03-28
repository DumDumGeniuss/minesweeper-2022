import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
function SvgWrapper({ children }: Props) {
  return children;
}

export default SvgWrapper;
