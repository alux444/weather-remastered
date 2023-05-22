import React from "react";
import { Container, Box } from "@mui/material";

const ForecastDisplay = ({ forecast }) => {
  const forecasts = forecast.forecast.forecastday.map((day) => (
    <div key={day.epoch}>
      <p>{day.date}</p>
      {day.hour.map((hour) => (
        <Box key={day.date_epoch} sx={{ display: "flex" }}>
          <p>{hour.time.split(" ")[1]}</p>
          <div>
            <img src={hour.condition.icon} />
          </div>
          <div>{hour.condition.text}</div>
          <div>
            <small>
              Temp:{hour.temp_c}°C ({hour.temp_f}°F)
            </small>
          </div>
          <div>
            <small>
              Feels like:{hour.feelslike_c}°C ({hour.feelslike_f}°F)
            </small>
          </div>
        </Box>
      ))}
    </div>
  ));

  return (
    <Container maxWidth="500px">
      <div>
        <p>
          Forecast for: {forecast.location.name}, {forecast.location.country}{" "}
          {forecast.location.region}
        </p>
      </div>
      <Container
        maxWidth="500px"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        {forecasts}
      </Container>
    </Container>
  );
};

export default ForecastDisplay;
