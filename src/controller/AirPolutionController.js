app.controller("AirPolutionController", function ($scope, AirPolutionService) {
    // Initialize the selected city and available cities
    $scope.selectedCity = "Jakarta";
    $scope.cities = ["Jakarta", "New York"];
    
    // Function to change the selected city
    $scope.changeCity = function (city) {
      $scope.selectedCity = city;
      loadAirPollution(); // Load air pollution data when the city is changed
    };
  
    // Function to load air pollution data based on the selected city
    function loadAirPollution() {
      $scope.loading = true;
      AirPolutionService.getAirPolutionByCity($scope.selectedCity) // Use selectedCity instead of city
        .then(function (response) {
          $scope.airPollution = response.data;
          $scope.loading = false;
        })
        .catch(function (error) {
          console.error("Error fetching air pollution data:", error);
          $scope.loading = false;
        });
    }
  
    // Watch the selectedCity variable for changes and reload air pollution data
    $scope.$watch("selectedCity", function () {
      loadAirPollution();
    });
  });