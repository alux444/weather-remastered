import React from "react";
import { Box } from "@mui/material";
import { useEffect } from "react";

const IndividualForecast = ({ hour }) => {
  return (
    <Box key={hour.date_epoch} sx={{ width: "200px", flexShrink: 0 }}>
      <p>{hour.time.split(" ")[1]}</p>
      <div>
        <img src={hour.condition.icon} />
      </div>
      <small>{hour.condition.text}</small>
      <div>
        <small>
          Temp: {hour.temp_c}°C ({hour.temp_f}°F)
        </small>
      </div>
      <div>
        <small>
          Feels like: {hour.feelslike_c}°C ({hour.feelslike_f}°F)
        </small>
      </div>
    </Box>
  );
};

export default IndividualForecast;
