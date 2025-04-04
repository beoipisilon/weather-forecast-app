import React, { useState, useRef, useEffect } from 'react';
import { CitySearchResult } from '../hooks/useWeather';
import { Search } from 'lucide-react';
import { createPortal } from 'react-dom';

interface SearchInputProps {
  onSearch: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: CitySearchResult[];
  isSearching: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearching
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verificar se o clique foi em um item do dropdown
      const target = event.target as HTMLElement;
      const isDropdownItem = target.closest('li');
      
      if (isDropdownItem) {
        return;
      }
      
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update inputValue when searchQuery changes
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Update dropdown position when input is focused or value changes
  useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
    setIsOpen(value.length >= 2);
  };  

  const handleCitySelect = (city: CitySearchResult) => {
    setIsSelecting(true);
    
    // Primeiro, chamamos onSearch diretamente para garantir que a pesquisa seja iniciada
    onSearch(city.name);
    
    // Depois, atualizamos os estados locais
    setInputValue(city.name);
    setSearchQuery(city.name);
    setIsOpen(false);
    
    // Resetamos o estado de seleção após um pequeno atraso
    setTimeout(() => {
      setIsSelecting(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setIsOpen(false);
    }
  };

  // Render dropdown using portal
  const renderDropdown = () => {
    if (!isOpen || inputValue.length < 2) return null;
    
    return createPortal(
      <div 
        ref={dropdownRef}
        className="fixed z-[99999] bg-card backdrop-blur-lg border border-border/50 shadow-xl rounded-xl max-h-60 overflow-y-auto"
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
          maxWidth: '28rem'
        }}
      >
        {isSearching ? (
          <div className="p-4 text-center text-gray-500">Buscando...</div>
        ) : searchResults.length > 0 ? (
          <ul>
            {searchResults.map((city) => (
              <li
                key={city.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCitySelect(city);
                }}
                className="px-4 py-2 hover:bg-secondary cursor-pointer"
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-sm text-gray-500">
                  {city.region}, {city.country}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Nenhuma cidade encontrada
          </div>
        )}
      </div>,
      document.body
    );
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
      <div className={`searchbar flex items-center transition-all p-1.5 ${isFocused ? 'ring-2 ring-primary/30 glow' : ''}`}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(inputValue.length >= 2);
          }}
          onBlur={() => {
            // Não fechar o dropdown se estiver selecionando uma cidade
            if (!isSelecting) {
              setTimeout(() => {
                setIsFocused(false);
                setIsOpen(false);
              }, 200);
            }
          }}
          placeholder="Digite o nome da cidade..."
          className="flex-1 px-4 py-2.5 bg-transparent text-foreground focus:outline-none placeholder:text-muted-foreground"
          aria-label="Nome da cidade"
          style={{ color: 'var(--foreground)' }}
        />
        <button
          type="submit"
          className="primary-button flex items-center justify-center">
          Buscar
        </button>
        </div>
      </form>

      {renderDropdown()}
    </div>
  );
}; 