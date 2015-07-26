var express = require('express');
var athenahealthapi = require('./athenahealthapi');
var events = require('events');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static('views'));
app.use(express.static('bower_components'));
app.use(express.static('js'));
app.use(express.static('img'));
app.use(express.static('css'));

var key = 'w7vh4qegxmh9xbrhkyx2b779';
var secret = 'cNy7r8DhDJVRFWk';
var version = 'preview1';
var practiceid = 195900;
var api = new athenahealthapi.Connection(version, key, secret, practiceid);

api.status.on('ready', main)
api.status.on('error', function(error) {
  console.log(error)
})

var patientids = [1, 4918, 3, 4, 4908];

function main() {
  app.get('/patients', function(req, res) {
    var patients = [];
    var dataCount = 0;

    function checkDataCount() {
      if(dataCount === patientids.length) {
        res.json(patients);
      }
    }

    patientids.forEach(function(patientid) {
      var patient = {};
      api.GET('/patients/' + patientid)
        .on('done', function(response) {
          patient.patientid = response[0].patientid;
          patient.firstname = response[0].firstname;
          patient.lastname = response[0].lastname;
          patients.push(patient);
          dataCount++;
          checkDataCount();
        })
        .on('error', function(error) {
          res.end(error);
        });
    });
  });

  app.get('/appointments', function(req, res) {
    var appointments = [];
    var count = 0;

    function checkCount() {
      if(count === patientids.length) {
        res.json(appointments);
      }
    }

    patientids.forEach(function(patientid) {
      setTimeout(function() {
      var appointment = {};
      api.GET('/patients/' + patientid + '/appointments')
        .on('done', function(response) {
          appointment.patientid = patientid;
          appointment.appointments = response.appointments;
          appointments.push(appointment);
          count++;
          checkCount();
        })
        .on('error', function(error) {
          res.send(error);
        });
      }, 300);
    });
  })

  app.listen(port);
}
