app.service("AirPolutionService", [
    "$http",
    function ($http) {
      const BASE_URL = "http://localhost:8000";
  
      return {
        getAirPolutionByCity: function (city) {
          return $http.get(`${BASE_URL}/airpollution/city/${city}`);
        },
      };
    },
  ]);