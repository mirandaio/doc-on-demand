var express = require('express');
var athenahealthapi = require('./athenahealthapi');
var events = require('events');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static('views'));
app.use(express.static('bower_components'));
app.use(express.static('js'));
app.use(express.static('img'));

var key = 'w7vh4qegxmh9xbrhkyx2b779';
var secret = 'cNy7r8DhDJVRFWk';
var version = 'preview1';
var practiceid = 195900;
var api = new athenahealthapi.Connection(version, key, secret, practiceid);

api.status.on('ready', main)
api.status.on('error', function(error) {
          console.log(error)
})

function main() {
  app.get('/patients/:id', function(req, res) {
    var id = req.params.id;
    api.GET('/patients/' + id)
      .on('done', function(response) {
        res.json(response);
      })
      .on('error', function(error) {
        res.end(error);
      });
  });

  app.listen(port);
}
