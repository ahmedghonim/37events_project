import React, { useRef, useState } from 'react';
import "./css/VideoPlayer.css"

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="w-100"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {!isPlaying && (
        <div className="spinner-overlay">
          <a href="#" className="spinner">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="spinner__svg">
              <path id="spinner-circle" className="spinner__path" d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" stroke="none" fill="none" />
              <path className="spinner__arrow" d="M 75 100 L 125 100 L 110 85 M 125 100 L 110 115" fill="none" />
              <text className="spinner__text">
                <textPath href="#spinner-circle">Play Video Play Video</textPath>
              </text>
            </svg>
          </a>
        </div>
      )}

      <button onClick={togglePlayPause} className="play-pause-btn">
        {isPlaying ? (
          <span className="pause-icon">❚❚</span>
        ) : (
          <span className="play-icon">▶</span>
        )}
      </button>
    </div>
  );
};

export default VideoPlayer;
