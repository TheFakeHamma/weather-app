import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface HourlyForecast {
  time: string;
  temp: number;
  wind: number;
  humidity: number;
  condition: string;
  icon: string;
}

interface DetailedForecastProps {
  hourly: HourlyForecast[];
  isCelsius: boolean;
}

const DetailedForecast: React.FC<DetailedForecastProps> = ({
  hourly,
  isCelsius,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < hourly.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full">
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
          <p className="font-bold text-xl">
            {hourly[currentIndex].time.split(" ")[1]}
          </p>
          <p>
            Temp: {hourly[currentIndex].temp}°{isCelsius ? "C" : "F"}
          </p>
          <p>Wind: {hourly[currentIndex].wind} kph</p>
          <p>Humidity: {hourly[currentIndex].humidity}%</p>
          <p>{hourly[currentIndex].condition}</p>
          <img
            src={hourly[currentIndex].icon}
            alt={hourly[currentIndex].condition}
            className="mx-auto"
          />
        </div>
        {currentIndex < hourly.length - 1 && (
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

export default DetailedForecast;
