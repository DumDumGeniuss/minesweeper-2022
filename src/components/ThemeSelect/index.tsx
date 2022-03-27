import { useState, useCallback, useRef } from 'react';
import classnames from 'classnames';
import useClickOutside from '@/hooks/useClickOutside';

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

  const onThemeButtonClick = useCallback((value: string) => {
    onOptionClick(value);
    setIsDropdownVisible(false);
  }, []);

  const chosenOption = options.find((o) => o.value === choice) || null;
  const chosenBgColor = chosenOption?.bgColor || null;
  const displayDropdown = () => {
    setIsDropdownVisible(true);
  };
  console.log(options, choice);

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
          'rounded-md',
        ])}
        onClick={displayDropdown}
      >
        <section
          aria-label="Chosen theme display"
          className={classnames(['w-6', 'h-6', 'rounded-md', chosenBgColor])}
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
          'pt-3',
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
        </section>
      </section>
    </section>
  );
};

export default ThemeSelect;
export type { Options };
