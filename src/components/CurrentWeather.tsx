import React from "react";

interface CurrentWeatherProps {
  temp: number;
  isCelsius: boolean;
  wind: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  onToggleUnit: () => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temp,
  isCelsius,
  wind,
  humidity,
  sunrise,
  sunset,
  onToggleUnit,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p>
          Temperature: {temp}°{isCelsius ? "C" : "F"}
        </p>
        <button
          onClick={onToggleUnit}
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
        </button>
      </div>
      <p>Wind: {wind} kph</p>
      <p>Humidity: {humidity}%</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </div>
  );
};

export default CurrentWeather;
