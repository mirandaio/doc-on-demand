'use strict';

angular.module('docOnDemand', [])
  .controller('MainController', [$scope, function($scope) {
    $scope.greeting = 'Doc On Demand';
  }]);
