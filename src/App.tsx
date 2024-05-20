import React, { useEffect, useState } from "react";
import { fetchWeather } from "./api/weather";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import DetailedForecast from "./components/DetailedForecast";
import SearchBar from "./components/SearchBar";

interface Weather {
  temp_c: number;
  temp_f: number;
  wind_kph: number;
  humidity: number;
  sunrise: string;
  sunset: string;
}

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  hour: {
    time: string;
    temp_c: number;
    temp_f: number;
    wind_kph: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
    };
  }[];
}

const App: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [activeTab, setActiveTab] = useState("today");

  const getWeatherData = async (location: string) => {
    try {
      const data = await fetchWeather(location);
      setWeather({
        temp_c: data.current.temp_c,
        temp_f: data.current.temp_f,
        wind_kph: data.current.wind_kph,
        humidity: data.current.humidity,
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        sunset: data.forecast.forecastday[0].astro.sunset,
      });
      setForecast(data.forecast.forecastday);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Failed to fetch weather data. Please try again later.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation position:", position);
          getWeatherData(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setError(
            "Failed to get your location. Please allow location access and refresh the page."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSearch = (city: string) => {
    getWeatherData(city);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="text-4xl font-bold mb-8">Weather App</header>
      <SearchBar onSearch={handleSearch} />
      <main className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : weather && forecast ? (
          <div>
            <CurrentWeather
              temp={isCelsius ? weather.temp_c : weather.temp_f}
              isCelsius={isCelsius}
              wind={weather.wind_kph}
              humidity={weather.humidity}
              sunrise={weather.sunrise}
              sunset={weather.sunset}
              onToggleUnit={toggleTemperatureUnit}
            />
            <div className="mt-8">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setActiveTab("today")}
                  className={`px-4 py-2 ${
                    activeTab === "today"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setActiveTab("forecast")}
                  className={`px-4 py-2 ${
                    activeTab === "forecast"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  5-Day Forecast
                </button>
              </div>
              {activeTab === "today" ? (
                <DetailedForecast
                  hourly={forecast[0].hour.map((hour) => ({
                    time: hour.time,
                    temp: isCelsius ? hour.temp_c : hour.temp_f,
                    wind: hour.wind_kph,
                    humidity: hour.humidity,
                    condition: hour.condition.text,
                    icon: hour.condition.icon,
                  }))}
                  isCelsius={isCelsius}
                />
              ) : (
                <Forecast
                  forecast={forecast.map((day) => ({
                    date: day.date,
                    maxtemp: isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f,
                    mintemp: isCelsius ? day.day.mintemp_c : day.day.mintemp_f,
                    condition: day.day.condition.text,
                    icon: day.day.condition.icon,
                  }))}
                  isCelsius={isCelsius}
                />
              )}
            </div>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </main>
    </div>
  );
};

export default App;
