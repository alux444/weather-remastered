import React from "react";
import { useEffect, useState } from "react";
import { fetchAutoComp } from "../utils/fetchAutoComp";

import WeatherBox from "./WeatherBox";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);

  const [submitted, setSubmitted] = useState([]);

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
          // Handle any errors that occur during the API request
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
    }
    setSearch("");
  };

  const test = () => {
    console.log(submitted);
    console.log(
      submitted.map((city) => {
        city;
      })
    );
  };

  const suggestions = suggested.map((city) => (
    <div key={city.id}>
      <button
        onClick={() =>
          handleSuggestion(city.name + " " + city.country + " " + city.region)
        }
      >
        {city.name}, {city.country}. {city.region}
      </button>
    </div>
  ));

  const results = submitted.map((city, index) => (
    <>
      <WeatherBox cityName={city} key={index} />
    </>
  ));

  return (
    <div>
      <form>
        <input type="text" value={search} onChange={handleChange} />
        <div>{!loading ? null : <small>Loading suggestions...</small>}</div>
        <button onClick={onSubmit}>Submit</button>
      </form>
      <button onClick={test}>aaaa</button>
      {suggestions}
      <div>{results}</div>
    </div>
  );
};

export default SearchBar;
