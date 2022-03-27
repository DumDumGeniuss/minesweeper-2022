import { useEffect, RefObject } from 'react';

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  onClickOutside: () => any
) {
  const onMouseClick = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      ref.current &&
      !ref.current.contains(e.target)
    ) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener('click', onMouseClick);

    return () => {
      document.removeEventListener('click', onMouseClick);
    };
  });
}
