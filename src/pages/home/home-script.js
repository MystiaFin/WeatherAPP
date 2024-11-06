// angular.module("weatherAPP").directive("home", function () {
//   return {
//     restrict: "E",
//     scope: {
//       weatherData: "=",
//     },
//     templateUrl: "src/pages/home/home.html",
//   };
// });

angular.module("weatherController", []).controller("MainController", [
  "$scope",
  "WeatherService",
  function ($scope, WeatherService) {
    $scope.city = "Jakarta";
    $scope.weatherData = {};
    $scope.forecastData = {};

    $scope.goTo = function (path) {
      $location.path("#/" + path);
    };

    WeatherService.getUVIndex().then(function (response) {
      if (response && response.data && response.data.value !== undefined) {
        $scope.uvIndex = {
          current: response.data.value,
        };
      } else {
        $scope.uvIndex = {
          current: "Data not available",
        };
      }
    });

    $scope.getWeather = function () {
      WeatherService.getCurrentWeather($scope.city).then(function (response) {
        $scope.weatherData = response.data;
      });
    };

    $scope.getForecast = function () {
      WeatherService.getForecast($scope.city).then(function (response) {
        $scope.forecastData = response.data;
      });
    };

    $scope.getWeather();
    $scope.getForecast();
  },
]);
