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

  useEffect(() => {
    const getWeather = async (latitude: number, longitude: number) => {
      try {
        const data = await fetchWeather(`${latitude},${longitude}`);
        setWeather({
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          wind_kph: data.current.wind_kph,
          humidity: data.current.humidity,
          sunrise: data.forecast.forecastday[0].astro.sunrise,
          sunset: data.forecast.forecastday[0].astro.sunset,
        });
        setForecast(data.forecast.forecastday);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setError("Failed to fetch weather data. Please try again later.");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation position:", position);
          getWeather(position.coords.latitude, position.coords.longitude);
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

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="text-4xl font-bold mb-8">Weather App</header>
      <main className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : weather ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p>
                Temperature: {isCelsius ? weather.temp_c : weather.temp_f}°
                {isCelsius ? "C" : "F"}
              </p>
              <button
                onClick={toggleTemperatureUnit}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
              </button>
            </div>
            <p>Wind: {weather.wind_kph} kph</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Sunrise: {weather.sunrise}</p>
            <p>Sunset: {weather.sunset}</p>
            <h2 className="text-2xl font-bold mt-8 mb-4">5-Day Forecast</h2>
            <div>
              {forecast?.map((day) => (
                <div
                  key={day.date}
                  className="mb-4 p-4 border rounded shadow-sm"
                >
                  <p className="font-bold">{day.date}</p>
                  <p>
                    {isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f}°
                    {isCelsius ? "C" : "F"} /{" "}
                    {isCelsius ? day.day.mintemp_c : day.day.mintemp_f}°
                    {isCelsius ? "C" : "F"}
                  </p>
                  <p>{day.day.condition.text}</p>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                  />
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4">
              Today's Detailed Forecast
            </h2>
            <div>
              {forecast &&
                forecast[0].hour.map((hour) => (
                  <div
                    key={hour.time}
                    className="mb-4 p-4 border rounded shadow-sm"
                  >
                    <p className="font-bold">{hour.time.split(" ")[1]}</p>
                    <p>
                      Temp: {isCelsius ? hour.temp_c : hour.temp_f}°
                      {isCelsius ? "C" : "F"}
                    </p>
                    <p>Wind: {hour.wind_kph} kph</p>
                    <p>Humidity: {hour.humidity}%</p>
                    <p>{hour.condition.text}</p>
                    <img src={hour.condition.icon} alt={hour.condition.text} />
                  </div>
                ))}
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
