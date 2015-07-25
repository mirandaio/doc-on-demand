'use strict';

angular.module('docOnDemand', [])
  .controller('MainController', ['$scope', '$http', function($scope, $http) {
    $http.get('/customfields')
      .success(function(data, status, headers, config) {
        console.log(data);
      })
      .error(function(data, status, headers, config) {
        console.log(data);
      });
  }]);
