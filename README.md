# Weather Forecast App

A modern weather forecast application built with React, TypeScript, and Tailwind CSS.

## Features

- Real-time weather data for cities worldwide
- 5-day weather forecast
- Temperature unit toggle (Celsius/Fahrenheit)
- City search with autocomplete
- Responsive design with beautiful UI
- Portuguese language support

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Query
- WeatherAPI.com

## Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/beoipisilon/weather-forecast-app
cd weather-forecast-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your WeatherAPI key
```
VITE_WEATHERAPI_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.