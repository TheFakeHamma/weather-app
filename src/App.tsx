import React, { useEffect, useState } from "react";
import { fetchWeather } from "./api/weather";

interface Weather {
  temp_c: number;
  temp_f: number;
  wind_kph: number;
  humidity: number;
  sunrise: string;
  sunset: string;
}

const App: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather("auto:ip");
        setWeather({
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          wind_kph: data.current.wind_kph,
          humidity: data.current.humidity,
          sunrise: data.forecast.forecastday[0].astro.sunrise,
          sunset: data.forecast.forecastday[0].astro.sunset,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    getWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="text-4xl font-bold mb-8">Weather App</header>
      <main className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {weather ? (
          <div>
            <p>
              Temperature: {weather.temp_c}°C / {weather.temp_f}°F
            </p>
            <p>Wind: {weather.wind_kph} kph</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Sunrise: {weather.sunrise}</p>
            <p>Sunset: {weather.sunset}</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </main>
    </div>
  );
};

export default App;
