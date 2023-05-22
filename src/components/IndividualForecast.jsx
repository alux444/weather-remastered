import React from "react";
import { Box } from "@mui/material";
import { useEffect } from "react";

const IndividualForecast = ({ hour }) => {
  return (
    <Box key={hour.date_epoch} sx={{ display: "flex" }}>
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
  );
};

export default IndividualForecast;
