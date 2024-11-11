app.controller("HomeController", function ($scope) {
  $scope.selectedCity = "Jakarta";
  $scope.cities = ["Jakarta", "New York"];

  $scope.changeCity = function (city) {
    $scope.selectedCity = city;
  };
});

app.controller("HomeForecast", function ($scope, WeatherService) {
  $scope.forecast = [];
  $scope.loading = true;

  function loadForecast() {
    $scope.loading = true;
    WeatherService.getForecastByCity($scope.$parent.selectedCity)
      .then(function (response) {
        $scope.forecast = response.data.list.map((item) => ({
          weather: item.weather[0].main,
          icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
          date: new Date(item.dt * 1000),
        }));
        $scope.loading = false;
      })
      .catch(function (error) {
        console.error("Error fetching forecast:", error);
        $scope.loading = false;
      });
  }

  $scope.$watch("$parent.selectedCity", function () {
    loadForecast();
  });
});
