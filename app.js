var express = require('express');

var app = express();

var routes = require('./routes');

app.set('view engine', 'ejs');

var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.home);

app.listen(4400, function(){
	console.log("The application runs on localhost:4400");
})










