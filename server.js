var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.send('This is Doc on Demand!');
});

app.listen(port, function() {
  console.log('The app is running!');
});
