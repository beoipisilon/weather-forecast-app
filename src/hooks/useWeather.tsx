import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WeatherData, TemperatureUnit, ForecastDay } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

// WeatherAPI.com endpoints
const CURRENT_WEATHER_URL = 'https://api.weatherapi.com/v1/current.json';
const FORECAST_URL = 'https://api.weatherapi.com/v1/forecast.json';
const SEARCH_URL = 'https://api.weatherapi.com/v1/search.json';

// Lista pré-configurada das principais cidades brasileiras
const BRAZILIAN_CITIES = [
  { id: 1, name: 'São Paulo', region: 'SP', country: 'Brazil', lat: -23.5505, lon: -46.6333 },
  { id: 2, name: 'Rio de Janeiro', region: 'RJ', country: 'Brazil', lat: -22.9068, lon: -43.1729 },
  { id: 3, name: 'Brasília', region: 'DF', country: 'Brazil', lat: -15.7975, lon: -47.8919 },
  { id: 4, name: 'Salvador', region: 'BA', country: 'Brazil', lat: -12.9714, lon: -38.5014 },
  { id: 5, name: 'Fortaleza', region: 'CE', country: 'Brazil', lat: -3.7319, lon: -38.5267 },
  { id: 6, name: 'Belo Horizonte', region: 'MG', country: 'Brazil', lat: -19.9167, lon: -43.9345 },
  { id: 7, name: 'Manaus', region: 'AM', country: 'Brazil', lat: -3.1190, lon: -60.0217 },
  { id: 8, name: 'Curitiba', region: 'PR', country: 'Brazil', lat: -25.4297, lon: -49.2671 },
  { id: 9, name: 'Recife', region: 'PE', country: 'Brazil', lat: -8.0476, lon: -34.8770 },
  { id: 10, name: 'Porto Alegre', region: 'RS', country: 'Brazil', lat: -30.0346, lon: -51.2177 },
  { id: 11, name: 'Goiânia', region: 'GO', country: 'Brazil', lat: -16.6869, lon: -49.2648 },
  { id: 12, name: 'Campinas', region: 'SP', country: 'Brazil', lat: -22.9071, lon: -47.0632 },
  { id: 13, name: 'Vitória', region: 'ES', country: 'Brazil', lat: -20.2976, lon: -40.2958 },
  { id: 14, name: 'Florianópolis', region: 'SC', country: 'Brazil', lat: -27.5969, lon: -48.5495 },
  { id: 15, name: 'Natal', region: 'RN', country: 'Brazil', lat: -5.7793, lon: -35.2009 },
  { id: 16, name: 'Cuiabá', region: 'MT', country: 'Brazil', lat: -15.6010, lon: -56.0979 },
  { id: 17, name: 'João Pessoa', region: 'PB', country: 'Brazil', lat: -7.1150, lon: -34.8631 },
  { id: 18, name: 'Aracaju', region: 'SE', country: 'Brazil', lat: -10.9472, lon: -37.0731 },
  { id: 19, name: 'Campo Grande', region: 'MS', country: 'Brazil', lat: -20.4435, lon: -54.6478 },
  { id: 20, name: 'Teresina', region: 'PI', country: 'Brazil', lat: -5.0892, lon: -42.8096 },
  { id: 21, name: 'Belém', region: 'PA', country: 'Brazil', lat: -1.4558, lon: -48.4902 },
  { id: 22, name: 'Ananindeua', region: 'PA', country: 'Brazil', lat: -1.3656, lon: -48.3722 },
  { id: 23, name: 'Santarém', region: 'PA', country: 'Brazil', lat: -2.4385, lon: -54.6996 },
  { id: 24, name: 'Marabá', region: 'PA', country: 'Brazil', lat: -5.3807, lon: -49.1327 },
  { id: 25, name: 'Parauapebas', region: 'PA', country: 'Brazil', lat: -6.0678, lon: -49.9037 },
];

export interface CitySearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export const useWeather = () => {
  const [city, setCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [randomData, setRandomData] = useState<WeatherData | null>(null);

  // Query for city search
  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ['citySearch', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      // Primeiro, procura na lista pré-configurada
      const localResults = BRAZILIAN_CITIES.filter(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.region.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Se encontrou resultados locais, retorna eles
      if (localResults.length > 0) {
        return localResults;
      }

      // Se não encontrou, busca na API
      const response = await fetch(
        `${SEARCH_URL}?key=${API_KEY}&q=${encodeURIComponent(searchQuery.trim())}`
      );

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      // Filtra apenas cidades do Brasil e adiciona à lista local se não existir
      const apiResults = (data as CitySearchResult[]).filter(city => city.country === 'Brazil');
      
      // Adiciona novas cidades à lista local
      apiResults.forEach(newCity => {
        if (!BRAZILIAN_CITIES.some(existingCity => existingCity.name === newCity.name)) {
          BRAZILIAN_CITIES.push(newCity);
        }
      });

      return apiResults;
    },
    enabled: searchQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Function to convert temperature based on unit
  const convertTemp = (temp: number): number => {
    if (unit === 'celsius') {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9/5) + 32);
    }
  };

  // Function to generate random weather data for testing
  const generateRandomWeatherData = (): WeatherData => {
    const weatherConditions = [
      { id: 1000, main: "Clear", description: "céu limpo", icon: "113" },
      { id: 1003, main: "Partly cloudy", description: "parcialmente nublado", icon: "116" },
      { id: 1009, main: "Overcast", description: "nublado", icon: "119" },
      { id: 1063, main: "Rain", description: "chuva leve", icon: "176" },
      { id: 1087, main: "Thunderstorm", description: "tempestade", icon: "200" },
      { id: 1066, main: "Snow", description: "neve leve", icon: "179" },
    ];

    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const forecast: ForecastDay[] = [];
    
    // Generate 5 days of forecast
    for (let i = 0; i < 5; i++) {
      const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      forecast.push({
        dt: Math.floor(Date.now() / 1000) + (i * 86400),
        temp: {
          min: Math.random() * 10 + 10,
          max: Math.random() * 15 + 20
        },
        weather: [randomCondition]
      });
    }

    const randomWeatherData = {
      city: {
        name: city || "São Paulo",
        country: "BR"
      },
      current: {
        dt: Math.floor(Date.now() / 1000),
        temp: Math.random() * 15 + 20,
        feels_like: Math.random() * 15 + 18,
        humidity: Math.floor(Math.random() * 100),
        wind_speed: Math.random() * 10,
        weather: [randomWeather]
      },
      forecast: forecast
    };
    
    setRandomData(randomWeatherData);
    return randomWeatherData;
  };

  // Function to fetch weather data
  const fetchWeatherData = async (cityName: string): Promise<WeatherData> => {
    // If we have random data, return it instead of making API calls
    if (randomData) {
      return randomData;
    }

    // Validate city name
    if (!cityName.trim()) {
      throw new Error('Por favor, insira o nome de uma cidade.');
    }
    
    // Fetch current weather
    const currentResponse = await fetch(
      `${CURRENT_WEATHER_URL}?key=${API_KEY}&q=${encodeURIComponent(cityName.trim())}&aqi=no&lang=pt`
    );

    if (!currentResponse.ok) {
      const errorData = await currentResponse.json().catch(() => null);
      console.error('Weather API Error:', {
        status: currentResponse.status,
        statusText: currentResponse.statusText,
        errorData
      });
      
      if (currentResponse.status === 401) {
        throw new Error('API key inválido ou não autorizado. Por favor, verifique sua chave de API.');
      } else if (currentResponse.status === 400) {
        throw new Error('Cidade inválida. Por favor, verifique o nome e tente novamente.');
      } else if (currentResponse.status === 404) {
        throw new Error('Cidade não encontrada. Por favor, verifique o nome e tente novamente.');
      } else {
        throw new Error(`Erro ao buscar dados climáticos: ${currentResponse.statusText}`);
      }
    }

    const currentData = await currentResponse.json();

    // Fetch forecast
    const forecastResponse = await fetch(
      `${FORECAST_URL}?key=${API_KEY}&q=${cityName}&days=5&aqi=no&lang=pt`
    );

    if (!forecastResponse.ok) {
      throw new Error(`Erro ao buscar previsão: ${forecastResponse.statusText}`);
    }

    const forecastData = await forecastResponse.json();

    // Verifica se a cidade está na lista de cidades brasileiras para usar o nome correto
    const brazilianCity = BRAZILIAN_CITIES.find(city => 
      city.name.toLowerCase() === currentData.location.name.toLowerCase() ||
      city.name.toLowerCase().includes(currentData.location.name.toLowerCase()) ||
      currentData.location.name.toLowerCase().includes(city.name.toLowerCase())
    );

    // Transform WeatherAPI.com data to match our WeatherData type
    const weatherData: WeatherData = {
      city: {
        name: brazilianCity ? brazilianCity.name : currentData.location.name,
        country: "Brasil"
      },
      current: {
        dt: Math.floor(new Date(currentData.current.last_updated_epoch * 1000).getTime() / 1000),
        temp: currentData.current.temp_c,
        feels_like: currentData.current.feelslike_c,
        humidity: currentData.current.humidity,
        wind_speed: currentData.current.wind_kph,
        weather: [{
          id: currentData.current.condition.code,
          main: currentData.current.condition.text,
          description: currentData.current.condition.text,
          icon: currentData.current.condition.icon.split('/').pop()?.split('.')[0] || '113'
        }]
      },
      forecast: forecastData.forecast.forecastday.map((day: any) => ({
        dt: Math.floor(new Date(day.date).getTime() / 1000),
        temp: {
          min: day.day.mintemp_c,
          max: day.day.maxtemp_c
        },
        weather: [{
          id: day.day.condition.code,
          main: day.day.condition.text,
          description: day.day.condition.text,
          icon: day.day.condition.icon.split('/').pop()?.split('.')[0] || '113'
        }]
      }))
    };

    return weatherData;
  };

  // Query for weather data
  const { data: weatherData, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', city, unit],
    queryFn: () => fetchWeatherData(city),
    enabled: !!city, // Enable query when city is set
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Function to search weather
  const searchWeather = async (searchCity: string) => {
    if (!searchCity.trim()) {
      throw new Error('Por favor, insira o nome de uma cidade.');
    }
    setCity(searchCity.trim());
    setSearchQuery(''); // Clear search query after selection
  };

  return {
    weatherData,
    isLoading,
    error,
    searchWeather,
    setUnit,
    unit,
    searchQuery,
    setSearchQuery,
    searchResults: searchResults || [],
    isSearching
  };
};
