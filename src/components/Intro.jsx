import React, { useState, useEffect } from 'react';

const Intro = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsVisible(false);
    setTimeout(onEnter, 500);
  };

  return (
    <div className={`intro-screen ${!isVisible ? 'fade-out' : ''}`}>
      <div className="intro-content">
        <div className="elegant-circle"></div>
        <h1 className="intro-title" style={{
          textShadow: `0 0 ${20 + glowIntensity * 0.5}px rgba(255, 182, 193, ${0.3 + glowIntensity * 0.005})`
        }}>
          A Special Celebration
        </h1>
        <p className="intro-subtitle">For Someone Extraordinary</p>
        <button className="enter-button glow-hover" onClick={handleClick}>
          <span className="button-text">Tap to Enter</span>
          <span className="button-glow"></span>
        </button>
        <div className="floating-hearts">
          <span>❤️</span>
          <span>❤️</span>
          <span>❤️</span>
        </div>
      </div>
    </div>
  );
};

export default Intro;