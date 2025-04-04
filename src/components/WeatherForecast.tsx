import React, { useState } from 'react';
import ForecastCard from './ForecastCard';
import { ForecastDay, TemperatureUnit } from '../types/weather';
interface WeatherForecastProps {
  forecast: ForecastDay[];
  unit: TemperatureUnit;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, unit }) => {
  const convertTemp = (temp: number): number => {
    if (unit === 'celsius') {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9/5) + 32);
    }
  };
  const [selectedForecast, setSelectedForecast] = useState<number>(0);

  const handleForecastClick = (index: number) => {
    setSelectedForecast(index);
  };
  
  return (
    <div className="mt-6">
      <h2 className="text-xl text-center font-display font-medium mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>Previsão para 5 dias</h2>
        {/* Forecast Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <ForecastCard 
            key={day.dt} 
            data={day} 
            unit={unit} 
            convertTemp={convertTemp}
            index={index}
            isActive={selectedForecast === index}
            onClick={() => handleForecastClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
