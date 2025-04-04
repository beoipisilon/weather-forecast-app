import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Droplet, Wind } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { CurrentWeather as CurrentWeatherType, TemperatureUnit } from '../types/weather';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  city: { name: string; country: string };
  unit: TemperatureUnit;
  onUnitToggle: () => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, city, unit, onUnitToggle }) => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR });
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  const convertTemp = (temp: number): number => {
    if (unit === 'celsius') {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9/5) + 32);
    }
  };

  return (
    <div 
      className="glass-panel p-8 animate-scale-in gradient-border"
      style={{
        background: "linear-gradient(135deg, rgba(32, 39, 50, 0.7) 0%, rgba(32, 39, 50, 0.4) 100%)"
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
            {city.name}, {city.country}
          </h1>
          <p className="text-muted-foreground font-light">{capitalizedDate}</p>
          
          <div className="mt-6 flex items-center">
            <span className="text-5xl md:text-7xl font-display font-semibold">
              {convertTemp(data.temp)}°{unit === 'celsius' ? 'C' : 'F'}
            </span>
            <button 
              onClick={onUnitToggle}
              className="ml-2 text-xs bg-secondary px-2 py-1 rounded-md hover:bg-secondary/80 transition-colors"
              aria-label={`Mudar para ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
            >
              {unit === 'celsius' ? '°F' : '°C'}
            </button>
          </div>
          
          <p className="text-muted-foreground">
            Sensação térmica: {convertTemp(data.feels_like)}°{unit === 'celsius' ? 'C' : 'F'}
          </p>
        </div>
        
        <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <WeatherIcon weatherId={data.weather[0].id} size="xl" className="animate-float" />
          <span className="mt-2 text-lg font-medium capitalize">
            {data.weather[0].description}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="bg-gradient-to-r from-card/50 to-card/20 backdrop-blur-sm rounded-xl p-4 flex items-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Droplet className="h-6 w-6 text-primary mr-3" />
          <div>
            <p className="text-sm text-muted-foreground">Umidade</p>
            <p className="text-xl font-semibold">{data.humidity}%</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-card/50 to-card/20 backdrop-blur-sm rounded-xl p-4 flex items-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <Wind className="h-6 w-6 text-primary mr-3" />
          <div>
            <p className="text-sm text-muted-foreground">Vento</p>
            <p className="text-xl font-semibold">{data.wind_speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
