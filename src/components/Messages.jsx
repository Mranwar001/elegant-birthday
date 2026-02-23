import React, { useState, useEffect } from 'react';
import { appreciationMessages } from '../data';

const Messages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting]);

  const handleTyping = () => {
    const fullText = `${appreciationMessages[currentIndex].text} ${appreciationMessages[currentIndex].emoji}`;

    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        setDisplayText(fullText.slice(0, displayText.length + 1));
        setTypingSpeed(100);
      } else {
        setTimeout(() => setIsDeleting(true), 3000);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(fullText.slice(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % appreciationMessages.length);
        setTypingSpeed(100);
      }
    }
  };

  return (
    <div className="messages-container">
      <span className="typing-text">{displayText}</span>
      <span className="typing-cursor">|</span>
    </div>
  );
};

export default Messages;