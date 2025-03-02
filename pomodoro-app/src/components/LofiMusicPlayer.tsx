import React from 'react';

const LofiMusicPlayer = () => {
  return (
    <div className="music-player">
      <iframe
        width="200"
        height="100"
        src="https://www.youtube.com/embed/jfKfPfyJRdk"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Lofi Music"
      ></iframe>
    </div>
  );
};

export default LofiMusicPlayer;