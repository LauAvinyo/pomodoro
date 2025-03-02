import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      if (interval !== null) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };


  return (
    <div className="text-center w-full mt-12">
      <h1 className="text-4xl font-bold mb-4 text-purple-500">Pomodoro Timer</h1>
      <div className="text-6xl font-bold mb-4 text-purple-300 transition-transform duration-300 ease-in-out transform hover:scale-105">
        {formatTime(time)}
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="bg-purple-700 px-6 py-2 rounded-md text-white mx-2 transition-all duration-200 ease-in-out transform hover:scale-110"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={() => setTime(25 * 60)}
        className="bg-purple-900 px-6 py-2 rounded-md text-white mx-2"
      >
        Reset
      </button>
    </div>
  );
};




export default Timer;
