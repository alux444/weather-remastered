import React from "react";
import { useEffect, useState } from "react";
import { fetchAutoComp } from "../utils/fetchAutoComp";
import WeatherBox from "./WeatherBox";
import { TextField, Box, Button } from "@mui/material";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);

  const [submitted, setSubmitted] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (search.length > 0) {
      fetchAutoComp(search.toLowerCase())
        .then((data) => {
          setSuggested(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching autocomplete data:", error);
          setLoading(false);
        });
    } else {
      fetchAutoComp("auckland")
        .then((data) => {
          setSuggested(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching autocomplete data:", error);
          setLoading(false);
        });
    }
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSuggestion = (suggestion) => {
    if (!submitted.includes(suggestion.toLowerCase())) {
      setSubmitted((prevSubmitted) => [
        ...prevSubmitted,
        suggestion.toLowerCase(),
      ]);
      setSearchHistory((prevSearchHistory) => [
        ...prevSearchHistory,
        suggestion.toLowerCase(),
      ]);
    }
    setSearch("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!submitted.includes(search.toLowerCase()) && search !== "") {
      setSubmitted((prevSubmitted) => [...prevSubmitted, search.toLowerCase()]);
      setSearchHistory((prevSearchHistory) => [
        ...prevSearchHistory,
        search.toLowerCase(),
      ]);
    }
    setSearch("");
  };

  const suggestions = suggested.map((city) => (
    <div key={city.id}>
      <Button
        variant="outlined"
        size="small"
        color="warning"
        style={{ flex: "0 0 25" }}
        onClick={() =>
          handleSuggestion(city.name + " " + city.country + " " + city.region)
        }
      >
        {city.name}, {city.country}. {city.region}
      </Button>
    </div>
  ));

  const removeSearch = (city) => {
    setSubmitted((prevSubmitted) =>
      prevSubmitted.filter((spec) => spec !== city)
    );
  };

  const handleVisibilitySuggestion = (e) => {
    e.preventDefault();
    setShowSuggestions(!showSuggestions);
  };

  const handleVisibilityHistory = (e) => {
    e.preventDefault();
    setShowHistory(!showHistory);
  };

  const results = submitted.map((city) => (
    <Box
      sx={{ "@media (max-width: 600px)": { marginBottom: "15px" } }}
      key={city}
    >
      <WeatherBox cityName={city} closeWeatherBox={() => removeSearch(city)} />
    </Box>
  ));

  const history = searchHistory.slice(-5).map((previousSearch) => (
    <Button
      color="warning"
      size="small"
      onClick={() => handleSuggestion(previousSearch)}
      key={previousSearch}
    >
      {previousSearch}
    </Button>
  ));

  return (
    <div>
      <form>
        <TextField
          sx={{
            width: {
              lg: 500,
              md: 400,
            },
            "& .MuiFormLabel-root": {
              color: "orange",
            },
            borderRadius: "15px",
            margin: "15px",
            input: { color: "white", textAlign: "center" },
          }}
          label="Enter your city!"
          color="warning"
          variant="filled"
          size="large"
          type="text"
          value={search}
          onChange={handleChange}
        />
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginBottom: "25px",
          }}
        >
          <button onClick={onSubmit}>Submit</button>
          <button onClick={handleVisibilitySuggestion}>
            {showSuggestions ? "Hide Suggestions" : "Show Suggestions"}
          </button>
          <button onClick={handleVisibilityHistory}>
            {showHistory ? "Hide History" : "Show History"}
          </button>
        </Box>
      </form>
      {showSuggestions && (
        <Box
          sx={{
            height: "min-content",
            padding: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {suggestions}
        </Box>
      )}
      {showHistory && (
        <>
          <small>Your previous searches:</small>
          <Box
            sx={{
              height: "min-content",
              padding: "10px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {history}
          </Box>
        </>
      )}
      <Box
        sx={{
          display: { lg: "flex", sm: "" },
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        {results}
      </Box>
    </div>
  );
};

export default SearchBar;
