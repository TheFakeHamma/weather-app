import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < forecast.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative">
      <div className="mb-4 p-4 border rounded shadow-sm relative flex items-center justify-center bg-white">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
        )}
        <div className="text-center mx-10">
          <p className="font-bold text-xl">{forecast[currentIndex].date}</p>
          <p>
            {forecast[currentIndex].maxtemp}°{isCelsius ? "C" : "F"} /{" "}
            {forecast[currentIndex].mintemp}°{isCelsius ? "C" : "F"}
          </p>
          <p>{forecast[currentIndex].condition}</p>
          <img
            src={forecast[currentIndex].icon}
            alt={forecast[currentIndex].condition}
            className="mx-auto"
          />
        </div>
        {currentIndex < forecast.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white"
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Forecast;
