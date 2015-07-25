var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static('views'));
app.use(express.static('bower_components'));

app.listen(port, function() {
  console.log('The app is running!');
});
