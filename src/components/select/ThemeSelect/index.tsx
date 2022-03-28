import { useCallback } from 'react';
import ColorSelect, { Options } from '@/components/select/ColorSelect';
import { Theme, convertStringToTheme } from '@/styles/theme';

const themeOptions: Options = [
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

type Props = {
  theme: Theme;
  onSelect: (theme: Theme) => any;
};

function ThemeSelect({ theme, onSelect }: Props) {
  const onOptionClick = useCallback((value: string) => {
    onSelect(convertStringToTheme(value));
  }, []);
  return (
    <ColorSelect
      choice={theme}
      options={themeOptions}
      onOptionClick={onOptionClick}
    />
  );
}

export default ThemeSelect;
