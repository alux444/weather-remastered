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
    setSearch(suggestion);
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
      <button
        style={{ flex: "0 0 25" }}
        onClick={() =>
          handleSuggestion(city.name + " " + city.country + " " + city.region)
        }
      >
        {city.name}, {city.country}. {city.region}
      </button>
    </div>
  ));

  const removeSearch = (city) => {
    setSubmitted((prevSubmitted) =>
      prevSubmitted.filter((spec) => spec !== city)
    );
  };

  const results = submitted.map((city) => (
    <WeatherBox
      cityName={city}
      closeWeatherBox={() => removeSearch(city)}
      key={city}
    />
  ));

  const history = searchHistory.slice(-5).map((previousSearch) => (
    <Button
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
              sm: 300,
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
        <div>{!loading ? null : <small>Loading suggestions...</small>}</div>
        <button onClick={onSubmit}>Submit</button>
      </form>
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
      <Box
        sx={{
          display: "flex",
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
