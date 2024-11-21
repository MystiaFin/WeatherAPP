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
    res.status(200).json(response.data);
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
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching forecast data:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Internal server error",
    });
  }
});

//______________ AIR POLUTION ____________
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

    const aqi = pollutionResponse.data.list[0].main.aqi; // AQI score
    const components = pollutionResponse.data.list[0].components;

    // Define air quality levels based on AQI
    let airQualityLevel;
    if (aqi === 1) airQualityLevel = "Very Good";
    else if (aqi === 2) airQualityLevel = "Good";
    else if (aqi === 3) airQualityLevel = "Moderate";
    else if (aqi === 4) airQualityLevel = "Poor";
    else airQualityLevel = "Very Poor";

    // Function to determine the category basd on value and ranges
    function classifyComponent(component, ranges) {
      for (const range of ranges) {
        if (component >= range.min && component < range.max) {
          return range.label;
        }
      }
      return ranges[ranges.length - 1].label; // Default to highest category
    }

    // Classification ranges
    const classificationRanges = {
      so2: [
        { min: 0, max: 20, label: "Very Good" },
        { min: 20, max: 80, label: "Good" },
        { min: 80, max: 250, label: "Moderate" },
        { min: 250, max: 350, label: "Poor" },
        { min: 350, max: Infinity, label: "Very Poor" },
      ],
      no2: [
        { min: 0, max: 40, label: "Very Good" },
        { min: 40, max: 70, label: "Good" },
        { min: 70, max: 150, label: "Moderate" },
        { min: 150, max: 200, label: "Poor" },
        { min: 200, max: Infinity, label: "Very Poor" },
      ],
      pm10: [
        { min: 0, max: 20, label: "Very Good" },
        { min: 20, max: 50, label: "Good" },
        { min: 50, max: 100, label: "Moderate" },
        { min: 100, max: 200, label: "Poor" },
        { min: 200, max: Infinity, label: "Very Poor" },
      ],
      pm2_5: [
        { min: 0, max: 10, label: "Very Good" },
        { min: 10, max: 25, label: "Good" },
        { min: 25, max: 50, label: "Moderate" },
        { min: 50, max: 75, label: "Poor" },
        { min: 75, max: Infinity, label: "Very Poor" },
      ],
      o3: [
        { min: 0, max: 60, label: "Very Good" },
        { min: 60, max: 100, label: "Good" },
        { min: 100, max: 140, label: "Moderate" },
        { min: 140, max: 180, label: "Poor" },
        { min: 180, max: Infinity, label: "Very Poor" },
      ],
      co: [
        { min: 0, max: 4400, label: "Very Good" },
        { min: 4400, max: 9400, label: "Good" },
        { min: 9400, max: 12400, label: "Moderate" },
        { min: 12400, max: 15400, label: "Poor" },
        { min: 15400, max: Infinity, label: "Very Poor" },
      ],
      nh3: [
        { min: 0, max: 200, label: "Good" },
        { min: 200, max: 400, label: "Fair" },
        { min: 400, max: 800, label: "Moderate" },
        { min: 800, max: 1200, label: "Poor" },
        { min: 1200, max: Infinity, label: "Very Poor" },
      ],
      no: [
        { min: 0, max: 40, label: "Good" },
        { min: 40, max: 80, label: "Fair" },
        { min: 80, max: 180, label: "Moderate" },
        { min: 180, max: 400, label: "Poor" },
        { min: 400, max: Infinity, label: "Very Poor" },
      ],
    };

    // Classify each component
    const classifiedComponents = Object.fromEntries(
      Object.entries(components).map(([key, value]) => {
        const ranges = classificationRanges[key];
        const classification = ranges
          ? classifyComponent(value, ranges)
          : "Unknown"; // Default if no classification found
        return [key, { value, classification }];
      })
    );

    res.json({
      aqi,
      airQualityLevel,
      components: classifiedComponents,
    });
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
