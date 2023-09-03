import { useCallback, useEffect } from 'react';

export const useKeyInput = (inputs) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (Array.isArray(inputs)) {
        inputs.forEach(([key, handler]) => {
          if (e.key === key) {
            handler();
          }
        });
      } else {
        const [key, handler] = inputs;

        if (e.key === key) {
          handler();
        }
      }
    },
    [inputs],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => void window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
