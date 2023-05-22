import React from "react";

import { useState, useEffect } from "react";
import { fetchForecast } from "../utils/fetchForecast";
import ForecastDisplay from "./ForecastDisplay";

import { Box } from "@mui/material";

const ForecastBox = (city) => {
  const [forecast, setForecast] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchForecast(city.city).then((data) => {
      if (data !== null) {
        setForecast(data);
        setLoaded(true);
      } else {
        setError(true);
      }
    });
  }, []);

  const handleShow = (e) => {
    setShowResults(!showResults);
    console.log(forecast);
  };

  return (
    <Box>
      {showResults ? (
        <Box>
          <button onClick={handleShow}>Hide Forecast</button>
          <ForecastDisplay forecast={forecast} />
        </Box>
      ) : (
        <div>
          <div>
            <button onClick={handleShow}>See Forecast</button>
          </div>
          <div>
            <small>Shows forecast for the next 3 days</small>
          </div>
        </div>
      )}
    </Box>
  );
};

export default ForecastBox;
