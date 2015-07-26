'use strict';

angular.module('docOnDemand', ['ngMaterial'])
  .controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.patient = {};

    $scope.getPatient = function () {
      $http.get('/patients/' + $scope.patient.id)
        .success(function(data, status, header, config) {
          console.log(data);
        })
        .error(function(data, status, headers, config) {
          console.log(data);
        });
    };
  }]);
