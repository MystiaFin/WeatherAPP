app.service("WeatherService", [
  "$http",
  function ($http) {
    const BASE_URL = "http://localhost:3000"; // Assuming this is your Node.js backend URL

    return {
      getForecast: function () {
        return $http.get(`${BASE_URL}/api/forecast`);
      },
    };
  },
]);
