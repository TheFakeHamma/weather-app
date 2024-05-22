import React, { useState } from "react";

interface ForecastDay {
  date: string;
  maxtemp: number;
  mintemp: number;
  condition: string;
  icon: string;
}

interface ForecastProps {
  forecast: ForecastDay[];
  isCelsius: boolean;
}

const Forecast: React.FC<ForecastProps> = ({ forecast, isCelsius }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : forecast.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < forecast.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div>
      <div className="mb-4 p-4 border rounded shadow-sm">
        <p className="font-bold">{forecast[currentIndex].date}</p>
        <p>
          {forecast[currentIndex].maxtemp}°{isCelsius ? "C" : "F"} /{" "}
          {forecast[currentIndex].mintemp}°{isCelsius ? "C" : "F"}
        </p>
        <p>{forecast[currentIndex].condition}</p>
        <img
          src={forecast[currentIndex].icon}
          alt={forecast[currentIndex].condition}
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Forecast;
