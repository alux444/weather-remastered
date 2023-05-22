import React from "react";
import { useState } from "react";
import { Container, Button } from "@mui/material";
import IndividualForecast from "./IndividualForecast";

const ForecastDisplay = ({ forecast }) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const handleNextDay = () => {
    if (activeDayIndex < 2) {
      setActiveDayIndex(activeDayIndex + 1);
    }
  };

  const handlePrevDay = () => {
    if (activeDayIndex > 0) {
      setActiveDayIndex(activeDayIndex - 1);
    }
  };

  const forecasts = forecast.forecast.forecastday.map((day, index) => (
    <Container
      key={day.epoch}
      sx={{
        display: activeDayIndex === index ? "relative" : "none",
      }}
    >
      <div>
        <p>{day.date}</p>
      </div>
      <Container
        sx={{
          display: "flex",
          width: "100%",
          overflow: "auto",
          border: "2px solid white",
          borderRadius: "15px",
          background: "#383838",
        }}
      >
        {day.hour.map((hour) => (
          <IndividualForecast key={day.epoch} hour={hour} />
        ))}
      </Container>
    </Container>
  ));

  return (
    <Container maxWidth="550px">
      <div>
        <p>
          Forecast for: {forecast.location.name}, {forecast.location.country}{" "}
          {forecast.location.region}
        </p>
        <Button onClick={handlePrevDay}>Previous Day</Button>
        <Button onClick={handleNextDay}>Next Day</Button>
      </div>
      <small>(Scroll left and right)</small>

      {forecasts}
    </Container>
  );
};

export default ForecastDisplay;
