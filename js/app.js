'use strict';

angular.module('docOnDemand', ['ngMaterial'])
  .controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.patient = {};
    $scope.showTable = true;

    $scope.setShowTable = function(showTable) {
      $scope.showTable = showTable;
    }

    $scope.getPatient = function () {
      $http.get('/patients/' + $scope.patient.patientid)
        .success(function(data, status, header, config) {
          console.log(data);
          $scope.patient = data[0];
        })
        .error(function(data, status, headers, config) {
          console.log(data);
        });
    };
  }]);
