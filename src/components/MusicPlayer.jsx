import React, { useState, useEffect, useRef } from 'react';
import { playlist } from '../data';

const MusicPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef(new Audio(playlist[0].src));
  const intervalRef = useRef();

  useEffect(() => {
    audioRef.current.volume = volume / 100;
    audioRef.current.play().catch(() => setIsPlaying(false));

    audioRef.current.addEventListener('ended', handleTrackEnd);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioRef.current.removeEventListener('ended', handleTrackEnd);
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const handleTrackEnd = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    audioRef.current.src = playlist[nextIndex].src;
    audioRef.current.play();
    setTrackProgress(0);
  };

  const handleTimeUpdate = () => {
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setTrackProgress(progress);
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleTimeUpdate, 1000);
  };

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const skipTrack = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentTrackIndex + 1) % playlist.length;
    } else {
      newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    }
    
    setCurrentTrackIndex(newIndex);
    audioRef.current.src = playlist[newIndex].src;
    if (isPlaying) audioRef.current.play();
    setTrackProgress(0);
  };

  return (
    <div className="music-player">
      <div className="player-info">
        <span className="track-name">{playlist[currentTrackIndex].title}</span>
        <span className="artist-name">{playlist[currentTrackIndex].artist}</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${trackProgress}%` }}></div>
        </div>
      </div>
      <div className="player-controls">
        <button className="control-btn" onClick={() => skipTrack('prev')}>⏮</button>
        <button className="control-btn play-pause" onClick={togglePlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="control-btn" onClick={() => skipTrack('next')}>⏭</button>
      </div>
      <div className="volume-control">
        <span>🔊</span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;