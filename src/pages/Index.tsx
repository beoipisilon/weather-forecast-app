import React from 'react';
import { toast } from 'sonner';
import { Cloud, SunMoon } from 'lucide-react';
import CurrentWeather from '../components/CurrentWeather';
import WeatherForecast from '../components/WeatherForecast';
import ErrorMessage from '../components/ErrorMessage';
import LoadingState from '../components/LoadingState';
import { useWeather } from '../hooks/useWeather';
import { SearchInput } from '../components/SearchInput';

const Index = () => {
  const {
    weatherData,
    isLoading,
    error,
    searchWeather,
    setUnit,
    unit,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching
  } = useWeather();
  
  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
    toast.success(`Unidade alterada para ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`);
  };
  
  const handleSearch = (city: string) => {
    searchWeather(city);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto relative">
      <header className="flex justify-between items-center mb-8 px-4 animate-fade-in" style={{animationDelay: "0.1s"}}>
        <div className="flex items-center">
          <Cloud className="h-8 w-8 text-primary mr-2 animate-float" />
          <h1 className="text-2xl font-display font-bold tracking-tight">ClimaTempo</h1>
        </div>
        <button 
          onClick={toggleUnit} 
          className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label={`Mudar para ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
        >
          <SunMoon className="h-5 w-5 text-muted-foreground" />
        </button>
      </header>
      
      <main className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
        <div className="text-center mb-2 animate-fade-in max-w-2xl" style={{animationDelay: "0.2s"}}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            <span className="text-white">Previsão do </span>
            <span className="text-primary text-glow">Tempo</span>
          </h2>
          <p className="text-muted-foreground mb-6">Confira o clima atual e a previsão para os próximos dias em qualquer cidade do mundo. Receba informações precisas sobre temperatura, umidade, vento e muito mais.</p>
          
          <div className="flex flex-col gap-3 text-center mb-8">
            <div className="glass-panel gradient-border p-4 rounded-xl" style={{
              background: "linear-gradient(135deg, rgba(32, 39, 50, 0.7) 0%, rgba(32, 39, 50, 0.4) 100%)"
            }}>
              <h3 className="text-lg font-medium mb-2">Como usar</h3>
              <p className="text-sm text-muted-foreground">Digite o nome da cidade na barra de pesquisa e clique em "Buscar" para consultar as informações climáticas.</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center w-full animate-fade-in" style={{animationDelay: "0.3s"}}>
          <div className="w-full max-w-md">
            <SearchInput
              onSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              isSearching={isSearching}
            />
          </div>
        </div>
        
        {error && (
          <ErrorMessage message={error.message} />
        )}
        
        {isLoading ? (
          <LoadingState />
        ) : weatherData ? (
          <div className="space-y-6 w-full">
            <CurrentWeather 
              data={weatherData.current} 
              city={weatherData.city} 
              unit={unit}
              onUnitToggle={toggleUnit}
            />
            
            <WeatherForecast 
              forecast={weatherData.forecast} 
              unit={unit}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center animate-fade-in" style={{animationDelay: "0.4s"}}>
            <div className="w-32 h-32 opacity-50 animate-float">
              <Cloud className="w-full h-full text-primary" />
            </div>
          </div>
        )}
      </main>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <div className="fixed bottom-0 left-0 right-0 pt-20 pb-4 pointer-events-none">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="glass-panel px-5 py-2 rounded-full text-xs flex items-center">
              <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></div>
              <span>Desenvolvido com atenção aos detalhes</span>
            </div>
            <div className="glass-panel px-4 py-2 rounded-full flex items-center">
              <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
              <span className="text-xs">v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
