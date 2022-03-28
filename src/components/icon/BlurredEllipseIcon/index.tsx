import classnames from 'classnames';
import { Theme } from '@/styles/theme';

enum Testid {
  Root = 'root',
}

const convertThemeToEllipseColor = (theme: Theme) => {
  switch (theme) {
    case Theme.Amber:
      return 'bg-amber-400';
    case Theme.Emerald:
      return 'bg-emerald-400';
    case Theme.Indigo:
      return 'bg-indigo-400';
    case Theme.Gray:
      return 'bg-gray-400';
    case Theme.Green:
      return 'bg-green-400';
    case Theme.Purple:
      return 'bg-purple-400';
    case Theme.Red:
      return 'bg-red-400';
    case Theme.Sky:
      return 'bg-sky-400';
    case Theme.Pink:
      return 'bg-pink-400';
    default:
      return 'bg-sky-400';
  }
};

type Props = {
  theme: Theme;
  opacity: number;
  width: number;
  height: number;
};

function BlurredEllipseIcon({ theme, opacity, width, height }: Props) {
  const color = convertThemeToEllipseColor(theme);
  return (
    <section
      data-testid={Testid.Root}
      className={classnames(['blur-3xl', 'rounded-full', color])}
      style={{
        opacity: `${opacity}`,
        width: `calc(${width}vw)`,
        height: `calc(${height}vw)`,
      }}
    />
  );
}

export default BlurredEllipseIcon;
export { Testid, convertThemeToEllipseColor };
