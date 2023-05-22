import React from "react";
import { useState, useEffect } from "react";

import { fetchWeather } from "../utils/fetchWeather";
import ForecastBox from "./ForecastBox";

import { Box } from "@mui/material";

const WeatherBox = ({ cityName }) => {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tempUnits, setTempUnits] = useState(true);

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

  const test = () => {
    console.log(weather);
  };

  const switchTempUnits = () => {
    setTempUnits(!tempUnits);
  };

  return (
    <Box
      sx={{
        width: "550px",
        height: "fit-content",
        border: "2px solid white",
        borderRadius: "25px",
        padding: "10px",
      }}
    >
      <button onClick={test}>test</button>
      {error ? (
        <div>
          <small>Sorry, the city you entered was invalid :(</small>
        </div>
      ) : null}
      {loaded ? (
        <div>
          <h5>
            {weather.location.name} {weather.location.country}{" "}
            {weather.location.region}
          </h5>
          <img src={weather.current.condition.icon} />
          <p>{weather.current.condition.text}</p>
          {tempUnits ? (
            <div>
              <p>Temperature : {weather.current.temp_c}°C</p>
              <p>Feels like : {weather.current.feelslike_c}°C</p>
            </div>
          ) : (
            <div>
              <p>Temperature : {weather.current.temp_f}°F</p>
              <p>Feels like : {weather.current.feelslike_f}°F</p>
            </div>
          )}
          <button onClick={switchTempUnits}>O</button>
          <ForecastBox city={cityName} />
        </div>
      ) : null}
    </Box>
  );
};

export default WeatherBox;
