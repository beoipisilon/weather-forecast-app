
import React from 'react';
import { 
  Sun, CloudSun, Cloud, CloudDrizzle, CloudRain, 
  CloudLightning, CloudSnow, Wind, CloudFog
} from 'lucide-react';

type IconSizes = 'sm' | 'md' | 'lg' | 'xl';

interface WeatherIconProps {
  weatherId: number;
  size?: IconSizes;
  className?: string;
}

const sizeMap: Record<IconSizes, number> = {
  sm: 24,
  md: 36,
  lg: 48,
  xl: 64
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  weatherId, 
  size = 'md', 
  className = '' 
}) => {
  const iconSize = sizeMap[size];
  const iconProps = {
    size: iconSize,
    className: `transition-all duration-300 text-primary ${className}`
  };

  // Weather condition codes based on OpenWeather API
  // https://openweathermap.org/weather-conditions

  // Group 2xx: Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    return <CloudLightning {...iconProps} />;
  }
  
  // Group 3xx: Drizzle
  if (weatherId >= 300 && weatherId < 400) {
    return <CloudDrizzle {...iconProps} />;
  }
  
  // Group 5xx: Rain
  if (weatherId >= 500 && weatherId < 600) {
    return <CloudRain {...iconProps} />;
  }
  
  // Group 6xx: Snow
  if (weatherId >= 600 && weatherId < 700) {
    return <CloudSnow {...iconProps} />;
  }
  
  // Group 7xx: Atmosphere (fog, haze, etc.)
  if (weatherId >= 700 && weatherId < 800) {
    return <CloudFog {...iconProps} />;
  }
  
  // 800: Clear sky
  if (weatherId === 800) {
    return <Sun {...iconProps} />;
  }
  
  // Group 80x: Clouds
  if (weatherId === 801) {
    return <CloudSun {...iconProps} />;
  }
  
  if (weatherId > 801 && weatherId < 900) {
    return <Cloud {...iconProps} />;
  }

  // Default
  return <Sun {...iconProps} />;
};

export default WeatherIcon;
