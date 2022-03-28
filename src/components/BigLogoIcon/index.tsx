import classnames from 'classnames';
import { Theme } from '@/styles/theme';
import Svg from '@/components/Svg';

enum Testid {
  Root = 'root',
}

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

type Props = {
  theme: Theme;
};

function BigLogoIcon({ theme }: Props) {
  return (
    <section
      data-testid={Testid.Root}
      className={classnames(['inline-flex', convertThemeToLogoColor(theme)])}
    >
      <Svg name="bigLogo" />
    </section>
  );
}

export default BigLogoIcon;
export { convertThemeToLogoColor, Testid };
