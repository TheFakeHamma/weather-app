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
  const currentTime = new Date().getHours();

  const filteredHourly = hourly.filter((hour) => {
    const hourTime = new Date(hour.time).getHours();
    return hourTime >= currentTime;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredHourly.length - 1) {
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
          <p className="font-bold text-xl">
            {filteredHourly[currentIndex].time.split(" ")[1]}
          </p>
          <p>
            Temp: {filteredHourly[currentIndex].temp}°{isCelsius ? "C" : "F"}
          </p>
          <p>Wind: {filteredHourly[currentIndex].wind} kph</p>
          <p>Humidity: {filteredHourly[currentIndex].humidity}%</p>
          <p>{filteredHourly[currentIndex].condition}</p>
          <img
            src={filteredHourly[currentIndex].icon}
            alt={filteredHourly[currentIndex].condition}
            className="mx-auto"
          />
        </div>
        {currentIndex < filteredHourly.length - 1 && (
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
