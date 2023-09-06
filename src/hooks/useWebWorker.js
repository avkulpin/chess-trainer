import { useCallback, useEffect, useRef } from 'react';

export const useWebWorker = (filepath) => {
  const webWorker = useRef();

  useEffect(() => {
    webWorker.current = new Worker(filepath);
  }, [filepath]);

  const setHandler = useCallback((handler) => {
    if (webWorker.current) webWorker.current.onmessage = handler;
  }, []);

  const command = useCallback((command) => {
    webWorker.current?.postMessage(command);
  }, []);

  return { setHandler, command };
};
