import React from "react";
import axios from "axios";

export const fetchWeather = async (city) => {
  let data = {};

  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: city },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    data = response.data;
  } catch (error) {
    console.error(error);
    return null;
  }

  return data;
};
