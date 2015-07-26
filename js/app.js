'use strict';

angular.module('docOnDemand', ['ngMaterial'])
  .controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.patients = [];

    function setLastAppointment(data) {
      var lastappointment = '';
      var laststarttime = '';
      var lastappointmentvalue = 0;
      data.appointments.forEach(function(appointment) {
        var value = Date.parse(appointment.date);
        if(value > lastappointmentvalue) {
          lastappointment = appointment.date;
          laststarttime = appointment.starttime;
          lastappointmentvalue = value;
        }
      });

      $scope.patients.forEach(function(patient) {
        if(patient.patientid == data.patientid) {
          patient.lastappointment = lastappointment;
          patient.starttime = laststarttime;
        }
      });
    }

    $scope.getPatient = function () {
      $http.get('/patients/' + $scope.patient.patientid)
        .success(function(data, status, header, config) {
          $scope.patient = data[0];
        })
        .error(function(data, status, headers, config) {
          console.log(data);
        });
    };

    $scope.refresh = function() {
      $http.get('/patients')
        .success(function(data, status, header, config) {
          $scope.patients = data;
          $http.get('/appointments')
            .success(function(data, status, header, config) {
              data.forEach(function(element) {
                setLastAppointment(element);
              });
              console.log($scope.patients);
            })
            .error(function(data, status, header, config) {
              console.log('Error getting appointments');
            });
        })
        .error(function(data, status, header, config) {
          console.log(data);
        });
    };

    $scope.refresh();
  }]);
