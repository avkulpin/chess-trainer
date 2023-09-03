import { useEffect } from 'react';

export const useOutsideAction = (ref, handler, ...additionalRefs) => {
  useEffect(() => {
    const clickListener = (event) => {
      if (additionalRefs.length) {
        const foundHit = [ref, ...additionalRefs].some((ref) => {
          if (ref && ref.current?.contains?.(event.target)) {
            return true;
          }
        });

        if (foundHit) {
          return;
        }
      } else if (ref && ref.current?.contains?.(event.target)) {
        return;
      }

      handler(event);
    };

    const keyDownListener = (event) => {
      if (event.key === 'Escape') {
        handler(event);
      }
    };

    document.addEventListener('mousedown', clickListener);
    document.addEventListener('touchstart', clickListener);
    document.addEventListener('keydown', keyDownListener);

    return () => {
      document.removeEventListener('mousedown', clickListener);
      document.removeEventListener('touchstart', clickListener);
      document.removeEventListener('keydown', keyDownListener);
    };
  }, [ref, handler, ...additionalRefs]);
};
