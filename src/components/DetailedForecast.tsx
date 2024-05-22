import React, { useState } from "react";

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
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : filteredHourly.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < filteredHourly.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div>
      <div className="mb-4 p-4 border rounded shadow-sm">
        <p className="font-bold">
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

export default DetailedForecast;
