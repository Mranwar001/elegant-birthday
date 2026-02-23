import React, { useState, useEffect, useRef } from 'react';  // Added useRef here!
import './App.css';
import Intro from './components/Intro';
import Gallery from './components/Gallery';
import MusicPlayer from './components/MusicPlayer';
import Messages from './components/Messages';
import { colors } from './data';

// Heart Particles Component
const HeartParticles = () => {
  const canvasRef = useRef(null);  // Now useRef is defined

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 5,
          speedY: Math.random() * 0.5 + 0.2,
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const drawHeart = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 15, size / 15);
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
      ctx.bezierCurveTo(10, 0, 5, -5, 0, 5);
      ctx.fillStyle = `rgba(255, 182, 193, ${opacity})`;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.y -= particle.speedY;
        particle.x += particle.speedX;
        if (particle.y < -50) {
          particle.y = canvas.height + 50;
          particle.x = Math.random() * canvas.width;
        }
        drawHeart(particle.x, particle.y, particle.size, particle.opacity);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="heart-particles" />;
};

// Confetti Component
const Confetti = () => {
  const canvasRef = useRef(null);  // And here too!

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const colors = ['#ffb6c1', '#ffd700', '#ffd7b0', '#e6b8b8', '#ffa07a'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          size: Math.random() * 8 + 4,
          speedY: Math.random() * 5 + 3,
          speedX: (Math.random() - 0.5) * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const drawParticle = (particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;
        if (particle.y > canvas.height + 50) {
          particle.y = -50;
          particle.x = Math.random() * canvas.width;
        }
        drawParticle(particle);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
};

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowConfetti(true);
      localStorage.setItem('hasVisited', 'true');
      setTimeout(() => setShowConfetti(false), 8000);
    }
  }, []);

  return (
    <div className="app">
      {showConfetti && <Confetti />}
      <HeartParticles />
      
      {!isEntered ? (
        <Intro onEnter={() => setIsEntered(true)} />
      ) : (
        <main className="main-content">
          <header className="elegant-header">
            <h1 className="glow-title">Happy Birthday</h1>
            <Messages />
          </header>
          <MusicPlayer />
          <Gallery />
        </main>
      )}
    </div>
  );
}

export default App;