import React from "react";
import { useState, useEffect } from "react";
import { fetchWeather } from "../utils/fetchWeather";
import ForecastBox from "./ForecastBox";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const WeatherBox = ({ cityName, closeWeatherBox }) => {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [show, setShow] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);

  const handleClose = () => {
    setTimeout(() => {
      closeWeatherBox(cityName);
    }, 1000);
    setShow(false);
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
        transition: "border-color 0.5s, background-color 0.5s, transform 0.5s",
        "&:hover": {
          border: "2px solid orange",
          transform: "scale(1.03)",
          background: "rgba(0, 0, 0, 0.1)",
        },
      }}
      className={`weather-box ${show ? "show" : ""}`}
    >
      <Box sx={{ position: "relative" }}>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => handleClose()}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            height: "60px",
          }}
        >
          <CloseIcon />
        </Button>
      </Box>
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
            <h3>
              {weather.location.name}, {weather.location.country}
            </h3>
            <img
              src={weather.current.condition.icon}
              className="weather-icon"
            />
            <h4>{weather.current.condition.text}</h4>
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
