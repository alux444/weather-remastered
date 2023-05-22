import React from "react";
import { useState, useEffect } from "react";
import { fetchWeather } from "../utils/fetchWeather";
import ForecastBox from "./ForecastBox";

import { Box, Button } from "@mui/material";

const WeatherBox = ({ cityName, closeWeatherBox }) => {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tempUnits, setTempUnits] = useState(true);
  const [showResults, setShowResults] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      closeWeatherBox(cityName);
    }, 300);
  };

  useEffect(() => {
    fetchWeather(cityName.toLowerCase()).then((data) => {
      if (data !== null) {
        setWeather(data);
        setLoaded(true);
      } else {
        setError(true);
      }
    });
  }, []);

  const switchTempUnits = () => {
    setTempUnits(!tempUnits);
  };

  const handleShow = () => {
    setShowResults(!showResults);
  };

  return (
    <Box
      sx={{
        width: "29vw",
        border: "2px solid white",
        borderRadius: "25px",
        padding: "10px",
      }}
      className={`weather-box ${show ? "show" : ""}`}
    >
      <Button onClick={() => handleClose()}>Close Search</Button>
      {error ? (
        <div>
          <small>Sorry, the city you entered was invalid :(</small>
        </div>
      ) : null}
      {loaded ? (
        showResults ? (
          <Box>
            <h5>
              {weather.location.name} {weather.location.country}{" "}
              {weather.location.region}
            </h5>
            <img src={weather.current.condition.icon} />
            <p>{weather.current.condition.text}</p>
            <div>
              <p>
                Temperature : {weather.current.temp_c}°C (
                {weather.current.temp_f}°F)
              </p>
              <p>
                Feels like : {weather.current.feelslike_c}°C (
                {weather.current.feelslike_f}°F)
              </p>
            </div>
            <button onClick={switchTempUnits}>O</button>
            <div>
              <div>
                <button onClick={handleShow}>See Forecast</button>
              </div>
              <div>
                <small>Shows forecast for the next 3 days</small>
              </div>
            </div>
          </Box>
        ) : (
          <ForecastBox city={cityName} hideForecast={handleShow} />
        )
      ) : null}
    </Box>
  );
};

export default WeatherBox;
