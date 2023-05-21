import React from "react";

const ForecastDisplay = ({ forecast }) => {
  const forecasts = forecast.forecast.forecastday.map((day) => (
    <div key={day.epoch}>
      <p>{day.date}</p>
    </div>
  ));

  return (
    <div>
      <p>
        Forecast for: {forecast.location.name}, {forecast.location.country}{" "}
        {forecast.location.region}
      </p>
      {forecasts}
    </div>
  );
};

export default ForecastDisplay;
