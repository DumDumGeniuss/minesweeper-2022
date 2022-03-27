import { useState, useCallback, useRef } from 'react';
import classnames from 'classnames';
import useClickOutside from '@/hooks/useClickOutside';

type Options = {
  value: string;
  bgColor: string;
  darkColor: string;
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

  const onThemeButtonClick = useCallback((value: string) => {
    onOptionClick(value);
    setIsDropdownVisible(false);
  }, []);

  const chosenOption = options.find((o) => o.value === choice) || null;
  const chosenBgColor = chosenOption?.bgColor || null;
  const displayDropdown = () => {
    setIsDropdownVisible(true);
  };

  return (
    <section ref={rootElementRef} className="relative">
      <button
        type="button"
        aria-label="Display theme select"
        className={classnames([
          'flex',
          'justify-between',
          'items-center',
          'p-3',
          'bg-white',
          'drop-shadow-lg',
          'rounded-lg',
        ])}
        onClick={displayDropdown}
      >
        <section
          aria-label="Chosen theme display"
          className={classnames(['w-5', 'h-5', 'rounded-sm', chosenBgColor])}
        />
        <section
          className={classnames(['w-4', 'h-4', 'ml-2', 'bg-blue-500'])}
        />
      </button>
      <section
        role="listbox"
        className={classnames([
          'absolute',
          'top-full',
          'pt-2',
          !isDropdownVisible && 'hidden',
        ])}
      >
        <section
          role="listitem"
          className={classnames([
            'p-3',
            'flex',
            'flex-col',
            'bg-white',
            'drop-shadow-lg',
            'rounded-lg',
          ])}
        >
          {options.map((item, itemIdx, allItems) => (
            <button
              key={item.value}
              type="button"
              aria-label="Select theme"
              className={classnames([
                'w-5',
                'h-5',
                'rounded-sm',
                itemIdx !== allItems.length - 1 ? 'mb-2' : '',
                item.bgColor,
              ])}
              onClick={() => onThemeButtonClick(item.value)}
            />
          ))}
        </section>
      </section>
    </section>
  );
};

export default ThemeSelect;
export type { Options };
