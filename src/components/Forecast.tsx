import React from "react";

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
  return (
    <div>
      {forecast.map((day) => (
        <div key={day.date} className="mb-4 p-4 border rounded shadow-sm">
          <p className="font-bold">{day.date}</p>
          <p>
            {day.maxtemp}°{isCelsius ? "C" : "F"} / {day.mintemp}°
            {isCelsius ? "C" : "F"}
          </p>
          <p>{day.condition}</p>
          <img src={day.icon} alt={day.condition} />
        </div>
      ))}
    </div>
  );
};

export default Forecast;
