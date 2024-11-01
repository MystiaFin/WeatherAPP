angular.module("WeatherAPP", ["ngRoute"]).config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      .when("/", {
        templateUrl: "pages/home.html",
      })
      .when("/forecast", {
        templateUrl: "pages/forecast.html",
      })
      .when("/temperature", {
        templateUrl: "pages/temperature.html",
      })
      .when("/airpolution", {
        templateUrl: "pages/airpolution.html",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);
