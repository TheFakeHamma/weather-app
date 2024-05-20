import React from "react";

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

  return (
    <div>
      {filteredHourly.map((hour) => (
        <div key={hour.time} className="mb-4 p-4 border rounded shadow-sm">
          <p className="font-bold">{hour.time.split(" ")[1]}</p>
          <p>
            Temp: {hour.temp}°{isCelsius ? "C" : "F"}
          </p>
          <p>Wind: {hour.wind} kph</p>
          <p>Humidity: {hour.humidity}%</p>
          <p>{hour.condition}</p>
          <img src={hour.icon} alt={hour.condition} />
        </div>
      ))}
    </div>
  );
};

export default DetailedForecast;
