import React from "react";
import axios from "axios";

export const fetchForecast = async (city) => {
  let data = {};

  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    params: { q: city, days: 3 },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
    return null;
  }

  return data;
};
