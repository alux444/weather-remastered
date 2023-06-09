import React from "react";

import { useState, useEffect } from "react";
import { fetchForecast } from "../utils/fetchForecast";
import ForecastDisplay from "./ForecastDisplay";

import { Box } from "@mui/material";

const ForecastBox = ({ city, hideForecast }) => {
  const [forecast, setForecast] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchForecast(city).then((data) => {
      if (data !== null) {
        setForecast(data);
        setLoaded(true);
      } else {
        setLoaded(false);
      }
    });
  }, []);

  return (
      <>
        {loaded ? (
          <Box sx={{ width: "100%" }}>
            <button onClick={hideForecast}>Hide Forecast</button>
            <ForecastDisplay forecast={forecast} />
          </Box>
        ) : (
          <div>
            <small>Loading forecast info...</small>
          </div>
        )}
      </>
  );
};

export default ForecastBox;
