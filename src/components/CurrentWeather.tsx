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
    <div className="bg-white p-4 rounded-lg shadow-lg text-gray-800 w-full">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">
          Temperature: {temp}°{isCelsius ? "C" : "F"}
        </p>
        <button
          onClick={onToggleUnit}
          className="px-3 py-1 bg-blue-500 text-white rounded-full"
        >
          {isCelsius ? "°F" : "°C"}
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-lg">
          <span className="font-semibold">Wind:</span> {wind} kph
        </p>
        <p className="text-lg">
          <span className="font-semibold">Humidity:</span> {humidity}%
        </p>
        <p className="text-lg">
          <span className="font-semibold">Sunrise:</span> {sunrise}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Sunset:</span> {sunset}
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
