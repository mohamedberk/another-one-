import React from 'react';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
}

const PlaceholderImage = ({
  width,
  height,
  text = 'Travel Image',
  bgColor = '#3498db',
  textColor = '#ffffff',
}: PlaceholderImageProps) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor,
        fontWeight: 600,
        fontSize: '16px',
        borderRadius: '8px',
      }}
    >
      {text}
    </div>
  );
};

export default PlaceholderImage; 