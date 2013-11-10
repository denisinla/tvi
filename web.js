var express = require('express');
var http = require('http');

var app = express();

app.configure(function(){
        app.set('port', process.env.PORT || 5000);
        app.use(express.static(__dirname + '/public'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server Active on port: " + app.get('port'));
});