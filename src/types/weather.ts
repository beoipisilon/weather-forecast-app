
export interface WeatherData {
  city: {
    name: string;
    country: string;
  };
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export interface CurrentWeather {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface ForecastDay {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
