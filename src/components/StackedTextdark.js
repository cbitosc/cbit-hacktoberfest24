"use client"
import React, { useState } from 'react';

const StackedTextDark = ({ text, fontSize = '48px'}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    fontWeight: 'bold',
    fontSize: fontSize,
    position: 'absolute',
    whiteSpace: 'nowrap', // Prevent text wrapping
    transition: 'all 0.3s ease', // Smooth transition
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First layer (deep pink with text border) */}
      <span
        style={{
          ...baseStyle,
          left: isHovered ? '0' : '12px', // Moves back to 0 on hover
          top: isHovered ? '0' : '12px',
          color: '#183717',
          textShadow: `
            -1px -1px 0 #183717, 
            1px -1px 0 #183717, 
            -1px 1px 0 #183717, 
            1px 1px 0 #183717`,
        }}
      >
        {text}
      </span>

      {/* Second layer (green with text border) */}
      <span
        style={{
          ...baseStyle,
          left: isHovered ? '0' : '6px', // Moves back to 0 on hover
          top: isHovered ? '0' : '6px',
          color: '#50DA4C',
          textShadow: `
            -1px -1px 0 #50DA4C, 
            1px -1px 0 #50DA4C, 
            -1px 1px 0 #50DA4C, 
            1px 1px 0 #50DA4C`,
          
        }}
      >
        {text}
      </span>

      {/* Third (top) layer (white with text border) */}
      <span
        style={{
          ...baseStyle,
          color: '#C401C4',
          textShadow: `
            -1px -1px 0 #C401C4, 
            1px -1px 0 #C401C4, 
            -1px 1px 0 #C401C4, 
            1px 1px 0 #C401C4`,
          position: 'relative',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default StackedTextDark;
