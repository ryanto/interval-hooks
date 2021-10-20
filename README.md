# Interval hooks

This package provides React hooks for running code at intervals.

## Install

```bash
npm install interval-hooks

# or

yarn add interval-hooks
```

## Usage

### `useInterval`

The `useInterval` hook will run a function at a specific interval.

```js
useInterval(() => {
  console.log('This runs every 5 seconds.');
}, 5000);
```

You can set the delay to `null` to stop the interval from running.

```js
useInterval(() => {
  console.log("This won't run because the `delay` is null.");
}, null);
```

### `useSynchronousInterval`

The `useSynchronousInterval` hook is just like `useInterval`, however it will run all functions with the same delay at the same time.

```js
useSynchronousInterval(() => {
  console.log('These console logs will happen at the same time.');
}, 5000);

// wait 3 seconds...

useSynchronousInterval(() => {
  console.log('These console logs will happen at the same time.');
}, 5000);
```

Synchronous intervals are useful for calling functions that need to happen at the same time, like ticking clocks.
