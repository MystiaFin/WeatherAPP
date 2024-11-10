app.controller("HomeController", function ($scope) {
  $scope.test = "Hello Forecast";
});

app.controller("HomeForecast", function ($scope) {
  $scope.forecast = [];
  $scope.loading = true;

  WeatherService.getForecast()
    .then(function (response) {
      $scope.forecast = response.data;
      $scope.loading = false;
    })
    .catch(function (error) {
      console.error("Error fetching forecast:", error);
      $scope.loading = false;
    });
});
