import { useState, useCallback, useRef } from 'react';
import classnames from 'classnames';
import useClickOutside from '@/hooks/useClickOutside';
import Svg from '@/components/Svg';

enum Testid {
  ChosenThemeDisplay = 'chosen-theme-color-display',
  ThemeList = 'theme-list',
}

type Options = {
  value: string;
  bgColor: string;
  borderColor: string;
  borderColorSelect: string;
  borderColorHover: string;
}[];

type Props = {
  choice: string;
  options: Options;
  onOptionClick: (value: string) => any;
};

const ThemeSelect = function ThemeSelect({
  choice,
  options,
  onOptionClick,
}: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const rootElementRef = useRef<HTMLElement>(null);
  const onClickOutside = () => {
    setIsDropdownVisible(false);
  };
  useClickOutside(rootElementRef, onClickOutside);

  const onThemeButtonClick = useCallback(
    (value: string) => {
      onOptionClick(value);
      setIsDropdownVisible(false);
    },
    [onOptionClick]
  );

  const onDisplayThemeDropdownButtonClick = useCallback(() => {
    setIsDropdownVisible(!isDropdownVisible);
  }, [isDropdownVisible]);

  const chosenOption = options.find((o) => o.value === choice) || null;
  const chosenBgColor = chosenOption?.bgColor || null;

  return (
    <section ref={rootElementRef} className="relative">
      <button
        type="button"
        aria-label="Display theme dropdown"
        className={classnames([
          'flex',
          'justify-between',
          'items-center',
          'p-3',
          'bg-white',
          'drop-shadow-lg',
          'rounded-md',
        ])}
        onClick={onDisplayThemeDropdownButtonClick}
      >
        <section
          data-testid={Testid.ChosenThemeDisplay}
          className={classnames(['w-6', 'h-6', 'rounded-md', chosenBgColor])}
        />
        <section
          className={classnames([
            'flex',
            'justify-center',
            'items-center',
            'w-4',
            'h-4',
            'ml-2',
            isDropdownVisible && 'rotate-180',
          ])}
        >
          <Svg name="arrow" />
        </section>
      </button>
      <ul
        data-testid={Testid.ThemeList}
        className={classnames([
          'absolute',
          'top-full',
          'pt-3',
          !isDropdownVisible && 'hidden',
        ])}
      >
        <li
          className={classnames([
            'p-3',
            'flex',
            'flex-col',
            'bg-white',
            'drop-shadow-lg',
            'rounded-md',
          ])}
        >
          {options.map((item, itemIdx, allItems) => (
            <button
              key={item.value}
              type="button"
              aria-label="Select theme"
              className={classnames([
                'w-6',
                'h-6',
                'rounded-md',
                'border-2',
                item.bgColor,
                item.borderColorHover,
                item.value === choice
                  ? item.borderColorSelect
                  : item.borderColor,
                itemIdx !== allItems.length - 1 && 'mb-2',
              ])}
              onClick={() => onThemeButtonClick(item.value)}
            />
          ))}
        </li>
      </ul>
    </section>
  );
};

export default ThemeSelect;
export { Testid };
export type { Options };
