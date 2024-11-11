require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;

app.use(cors());

// APU config
const API_KEY =
  process.env.OPENWEATHER_API_KEY || "640a58fa0d5bbc1efc7c286e2c547ed2"; // default api key for testing purposes

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Middleware to parse JSON bodies
app.use(express.json());

// get weather by city name
app.get("/weather/city/:cityName", async (req, res) => {
  try {
    const { cityName } = req.params;
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: "metric", // in celcius
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Internal server error",
    });
  }
});

// Get weather by coordinates
app.get("/weather/coords", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Internal server error",
    });
  }
});

// Get 5-day forecast by city name
app.get("/forecast/city/:cityName", async (req, res) => {
  try {
    const { cityName } = req.params;
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: "metric",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching forecast data:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Internal server error",
    });
  }
});

// Endpoint to get air pollution data by city name
app.get("/airpollution/city/:cityName", async (req, res) => {
  try {
    const { cityName } = req.params;

    // Step 1: Get coordinates by city name
    const cityResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: cityName,
        appid: API_KEY,
      },
    });

    const { lat, lon } = cityResponse.data.coord;

    // Step 2: Use coordinates to get air pollution data
    const pollutionResponse = await axios.get(`${BASE_URL}/air_pollution`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });

    res.json(pollutionResponse.data);
  } catch (error) {
    console.error("Error fetching air pollution data:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Internal server error",
    });
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Weather API server running on port ${port}`);
});
