import React from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import LofiMusicPlayer from './components/LofiMusicPlayer';


const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white flex flex-col items-center p-4 w-full h-full">
      <Timer />
      <TaskList />
      {/* <LofiMusicPlayer /> */}
    </div>
  );
};

export default App;
