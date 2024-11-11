var app = angular.module("WeatherAPP", ["ngRoute"]).config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      .when("/", {
        templateUrl: "src/pages/home.html",
        controller: "HomeController",
      })
      .when("/forecast", {
        templateUrl: "src/pages/forecast.html",
      })
      .when("/temperature", {
        templateUrl: "src/pages/temperature/temperature.html",
        controller: "TemperatureController",
      })
      .when("/airpolution", {
        templateUrl: "src/pages/airpolution/airpolution.html",
        controller: "AirPolutionController",
      })
      .when("/wind", {
        templateUrl: "src/pages/wind/wind.html",
        controller: "WindController",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);
