import { useEffect } from "react";

type OutsideClickType = (event: MouseEvent | TouchEvent) => void;

// Close modal when clicked or touched outside of ref
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null> | null,
  onOutsideClick: () => void,
  enabled = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClick: OutsideClickType = (event) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, onOutsideClick, enabled]);
};
