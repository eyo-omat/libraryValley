var express = require('express');

var app = express();

require('dotenv').config();
var routes = require('./routes');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.home);
app.get('/addbooks', routes.addbooks);
app.post('/createbook', routes.createbook);
app.get('/signup', routes.signup);
app.post('/register', routes.register);
app.get('/booksummary/:bookname?', routes.singlebook);
app.get('/borrowbook/:borrowedValue/:bookname', routes.borrowbook);
app.post('/deletebook/:bookname', routes.deletebook);
app.get('/managebook/:bookname', routes.managebook);
app.post('/updatebook/:bookname', routes.updatebook);
app.get('/viewcategories', routes.viewcategories);
app.get('/viewcategory/:categoryName', routes.viewcategory);
app.post('/createCategory', routes.createCategory);
app.get('/borrowedbooks', routes.borrowedbooks);
app.post('/returnbook/:borrowedValue/:borrowbookkey/:bookname', routes.updatebook);
app.get('*', routes.notFound);
app.listen(process.env.PORT || 4400);










