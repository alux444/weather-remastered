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
        display: activeDayIndex === index ? "" : "none",
      }}
    >
      <div>
        <p>{day.date}</p>
      </div>
      <Container
        sx={{
          overflow: "auto",
          border: "2px solid white",
          borderRadius: "15px",
          padding: "10px",
          background: "#383838",
          "@media (max-width: 600px)": {
            width: "70vw",
          },
        }}
      >
        <Container
          sx={{
            display: "flex",
            width: "100%",

            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {day.hour.map((hour) => (
            <IndividualForecast key={day.epoch} hour={hour} />
          ))}
        </Container>
      </Container>
    </Container>
  ));

  return (
    <Container>
      <div>
        <p>
          Forecast for: {forecast.location.name}, {forecast.location.country}{" "}
          {forecast.location.region}
        </p>
        <Button
          color="warning"
          variant="outlined"
          onClick={handlePrevDay}
          sx={{ margin: "10px" }}
        >
          Previous Day
        </Button>
        <Button
          color="warning"
          variant="outlined"
          onClick={handleNextDay}
          sx={{ margin: "10px" }}
        >
          Next Day
        </Button>
      </div>
      <small>(Scroll left and right)</small>

      {forecasts}
    </Container>
  );
};

export default ForecastDisplay;
