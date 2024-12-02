app.controller("ForecastController", [
  "$scope",
  "WeatherService",
  "$routeParams",
  function ($scope, WeatherService, $routeParams) {
    $scope.cityName = $routeParams.cityName;
    $scope.forecast = [];
    $scope.loading = true;

    function loadForecast() {
      $scope.loading = true;
      WeatherService.getForecastByCity($scope.cityName)
        .then(function (response) {
          $scope.forecast = response.data.list.map((item) => {
            const weatherMain = item.weather[0].main;
            const localIcon = weatherIconMap[weatherMain];
            const defaultIcon = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
            const date = new Date(item.dt * 1000);

            return {
              weather: weatherMain,
              icon: localIcon ? localIcon : defaultIcon,
              date: date,
              hour: date.getHours() + ":00",
              temp: Math.round(item.main.temp),
            };
          });
          $scope.loading = false;
        })
        .catch(function (error) {
          console.error("Error fetching forecast:", error);
          $scope.loading = false;
        });
    }

    $scope.changeCity = function (city) {
      $scope.cityName = city;
      loadForecast();
    };

    // Load initial forecast
    loadForecast();
  },
]);
