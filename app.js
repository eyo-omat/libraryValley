var express = require('express');

var app = express();

var routes = require('./routes');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.home);
app.get('/addbooks', routes.addbooks);
app.post('/addbook', routes.addbook);
app.get('/signup', routes.signup);
app.get('/booksummary/:bookname?', routes.singlebook);

app.listen(4400, function(){
	console.log("The application runs on localhost:4400");
})










