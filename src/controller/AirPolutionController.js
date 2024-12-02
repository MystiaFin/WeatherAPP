app.controller("AirPolutionController", function ($scope, AirPolutionService, $interval) {
  $scope.selectedCity = "Jakarta";
  $scope.cities = ["Jakarta", "New York"];
  

  $interval(function () {
    $scope.currentDate = new Date();
  }, 1000);

  $scope.changeCity = function (city) {
    $scope.selectedCity = city;
    loadAirPollution();
  };

  function loadAirPollution() {
    $scope.loading = true;
    AirPolutionService.getAirPolutionByCity($scope.selectedCity)
    .then(function (response) {
      $scope.airPollution = response.data; // Use airPollution to store AQI and level
      $scope.loading = false;
    })
    .catch(function (error) {
      console.error("Error fetching air pollution data:", error);
      $scope.loading = false;
    });
  }

  

  $scope.$watch("selectedCity", function () {
    loadAirPollution();
  });

  

  

});
