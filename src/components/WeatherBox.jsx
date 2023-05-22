import React from "react";
import { useState, useEffect } from "react";
import { fetchWeather } from "../utils/fetchWeather";
import ForecastBox from "./ForecastBox";
import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";

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

  const handleShow = () => {
    setShowResults(!showResults);
  };

  return (
    <Box
      sx={{
        width: {
          sm: "90vw",
          md: "45vw",
          lg: "33vw",
        },
        border: "2px solid white",
        borderRadius: "25px",
        padding: "20px",
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
          <Box
            sx={{
              width: {
                sm: "90vw",
                md: "45vw",
                lg: "33vw",
              },
            }}
          >
            <h5>
              {weather.location.name} {weather.location.country}{" "}
              {weather.location.region}
            </h5>
            <img
              src={weather.current.condition.icon}
              className="weather-icon"
            />
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
              <p>Humidity : {weather.current.humidity}%</p>
              <p>
                Wind : {weather.current.wind_kph}kmph (
                {weather.current.wind_mph}mph)
              </p>
            </div>
            <div>
              <button onClick={handleShow}>See Forecast</button>
            </div>
            <div>
              <small>Shows forecast for the next 3 days</small>
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
