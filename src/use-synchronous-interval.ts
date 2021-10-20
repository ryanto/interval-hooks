import { useEffect, useRef } from 'react';

type intervalFn = () => void;
type Callback = React.MutableRefObject<intervalFn>;
type Bucket = {
  delay: number;
  callbacks: Callback[];
  interval: number;
};
type Buckets = Record<number, Bucket>;

let buckets: Buckets = {};

let setupBucket = (delay: number): Bucket => {
  let bucket = buckets[delay];
  if (!bucket) {
    bucket = {
      callbacks: [],
      delay,
      interval: window.setInterval(() => {
        bucket.callbacks.forEach(f => {
          f.current();
        });
      }, delay),
    };
    buckets[delay] = bucket;
  }
  return bucket;
};

let addSyncInterval = function(delay: number, callback: Callback) {
  let bucket = setupBucket(delay);
  bucket.callbacks = [...bucket.callbacks, callback];
};

let removeSyncInterval = function(delay: number, callback: Callback) {
  let bucket = setupBucket(delay);
  bucket.callbacks = bucket.callbacks.filter(c => c !== callback);
  if (bucket.callbacks.length === 0) {
    clearInterval(bucket.interval);
    delete buckets[delay];
  }
};

export const useSynchronousInterval = (
  fn: intervalFn,
  delay: number | null
) => {
  let callback = useRef<intervalFn>(fn);

  // Remember the latest fn.
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // Add the callback as the sync interval.
  useEffect(() => {
    if (delay !== null) {
      addSyncInterval(delay, callback);

      return () => {
        removeSyncInterval(delay, callback);
      };
    } else {
      return;
    }
  }, [delay]);
};
