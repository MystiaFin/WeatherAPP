app.service("WindService", [
  "$http",
  function ($http) {
    const BASE_URL = "http://localhost:8000";

    return {
      getWindByCity: function (city) {
        return $http.get(`${BASE_URL}/wind/city/${city}`);
      },
      getForecastByCity: function (city) {
        return $http.get(`${BASE_URL}/forecast/city/${city}`);
      },
      getWeatherByCity: function (city) {
        return $http.get(`${BASE_URL}/weather/city/${city}`);
      },
    };
  },
]);
