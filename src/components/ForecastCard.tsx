
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import WeatherIcon from './WeatherIcon';
import { ForecastDay, TemperatureUnit } from '../types/weather';

interface ForecastCardProps {
  data: ForecastDay;
  unit: TemperatureUnit;
  convertTemp: (kelvin: number) => number;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ 
  data, 
  unit, 
  convertTemp, 
  index, 
  isActive = false,
  onClick 
}) => {
  const date = new Date(data.dt * 1000);
  const dayName = format(date, 'EEE', { locale: ptBR });
  const dayOfMonth = format(date, 'd');
  const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';
  const maxTemp = Math.round(convertTemp(data.temp.max));
  const minTemp = Math.round(convertTemp(data.temp.min));
  
  return (
    <div 
      className={`weather-card p-4 w-full sm:w-auto flex-shrink-0 cursor-pointer animate-fade-in ${isActive ? 'active' : ''}`}
      style={{
        background: `linear-gradient(180deg, rgba(32, 39, 50, ${isActive ? '0.7' : '0.5'}) 0%, rgba(32, 39, 50, ${isActive ? '0.5' : '0.3'}) 100%)`,
        animationDelay: `${0.2 * (index + 1)}s`
      }}
      onClick={onClick}
    >
      <p className="text-sm font-medium text-center">{capitalizedDay}, {dayOfMonth}</p>
      
      <div className="flex justify-center my-3">
        <WeatherIcon weatherId={data.weather[0].id} size="md" />
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="font-semibold text-primary">{maxTemp}{unitSymbol}</span>
        <span className="text-muted-foreground">{minTemp}{unitSymbol}</span>
      </div>
    </div>
  );
};

export default ForecastCard;
