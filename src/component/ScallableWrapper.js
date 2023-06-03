import React, { useEffect, useState } from 'react';

const ScallableWrapper = (props) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const contentWidth = 1080; 
      const contentHeight = 720; 

      const scaleX = screenWidth / contentWidth;
      const scaleY = screenHeight / contentHeight;
      const minScale = Math.min(scaleX, scaleY);

      setScale(minScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: '1080px',
        height: '720px',
        transform: `scale(${scale})`,
      }}
    >
      {props.children}
    </div>
  );
};

export default ScallableWrapper;
