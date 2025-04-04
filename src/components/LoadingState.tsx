
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse mt-6 w-full">
      {/* Current weather skeleton */}
      <div className="glass-panel p-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-3 w-full md:w-3/5">
            <div className="h-8 bg-secondary/50 rounded-md w-4/5"></div>
            <div className="h-6 bg-secondary/50 rounded-md w-2/5"></div>
            <div className="h-16 bg-secondary/50 rounded-md w-3/5 mt-6"></div>
          </div>
          <div className="w-24 h-24 bg-secondary/50 rounded-full mx-auto md:mx-0"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="h-16 bg-secondary/50 rounded-md"></div>
          <div className="h-16 bg-secondary/50 rounded-md"></div>
        </div>
      </div>
      
      {/* Forecast skeleton */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="weather-card p-4 w-36 flex-shrink-0">
            <div className="h-5 bg-secondary/50 rounded-md w-20 mb-3"></div>
            <div className="w-14 h-14 bg-secondary/50 rounded-full mx-auto my-3"></div>
            <div className="h-6 bg-secondary/50 rounded-md w-full mt-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
