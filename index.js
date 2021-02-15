const express = require('express');

let app = express();

app.get('/', function(req, res){
	res.send('<h1>Hello Docker lalalal yoyoyo</h1>');
});

app.get('/hello', function(req, res){
	res.send('<h1>Hello page lalalal yoyoyo</h1>');
});

let port = 8000;

app.listen(port, function(){
  console.log("Start on " + port);
});