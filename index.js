'use strict';

var express = require('express');
var app = express();
var pgp = require("pg-promise")(/*options*/);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var db = pgp("postgres://usgoktrmrqwtmg:BxZd9s90tp6da7Zyjd1Nkp-ok6@ec2-54-228-226-93.eu-west-1.compute.amazonaws.com:5432/ddt5c3cnmvpoqg?ssl=true");

app.get('/', function(request, response) {

  db.one("SELECT $1 AS value", 123)
      .then(function (data) {
        response.send('Hello From Heroku postGres DB ' + data.value);
      })
      .catch(function (error) {
        response.send('Error From Heroku postGres DB ' + data.value);
      });

});

app.listen(app.get('port'), function() {
  console.log('Node CodeApp is running on port', app.get('port'));
});
