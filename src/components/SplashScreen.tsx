
import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC = () => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000); // Match this with the CSS animation duration + delay
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!show) return null;
  
  return (
    <div id="splash-screen">
      <svg className="splash-cloud" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    </div>
  );
};

export default SplashScreen;
