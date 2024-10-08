import React, { useState, useEffect } from 'react';

const TypingEffect2 = ({ text, speed = 100, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId;

    if (!isTypingComplete) {
      setDisplayedText(''); // Reset text when effect runs
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(prev => text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
          setIsTypingComplete(true);
          if (onComplete) {
            onComplete();
          }
        }
      }, speed);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, speed, onComplete, isTypingComplete]);

  useEffect(() => {
    const cursorIntervalId = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorIntervalId);
  }, []);

  return (
    <div >
      {displayedText}
      <span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>_</span>
    </div>
  );
};

export default TypingEffect2;