import { useEffect, useRef } from 'react';

type intervalFn = () => void;

// Taken from https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export const useInterval = (fn: intervalFn, delay: number | null) => {
  let callback = useRef<intervalFn>(fn);

  // Remember the latest fn.
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => {
        callback.current();
      }, delay);

      return () => {
        clearInterval(id);
      };
    } else {
      return;
    }
  }, [delay]);
};
