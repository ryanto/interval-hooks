import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useSynchronizedInterval } from '../.';

const BackgroundColor = () => {
  let [isOn, setIsOn] = React.useState(false);
  let [index, setIndex] = React.useState(0);

  let backgrounds = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-pink-500',
    'bg-purple-500',
  ];

  let changeBackground = () => {
    setIndex(index => (index + 1) % backgrounds.length);
  };

  useSynchronizedInterval(
    () => {
      changeBackground();
    },
    isOn ? 1500 : null
  );

  return (
    <div
      className={`
        flex items-center justify-center flex-grow w-full
        ${backgrounds[index]}
      `}
    >
      <button
        className="bg-white py-2 px-4 rounded shadow-xl"
        onClick={() => {
          if (!isOn) {
            changeBackground();
          }
          setIsOn(on => !on);
        }}
      >
        {isOn ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

let App = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-0.5">
      <BackgroundColor />
      <BackgroundColor />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
