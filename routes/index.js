
//<script src="https://www.gstatic.com/firebasejs/3.6.5/firebase.js"></script>
  // Initialize Firebase
var firebase = require('firebase');
  var config = {
    apiKey: "AIzaSyAZvRrQcRSdeA_5VUCLJsP8W3UkfyEHFYw",
    authDomain: "libraryvalley-358ff.firebaseapp.com",
    databaseURL: "https://libraryvalley-358ff.firebaseio.com",
    storageBucket: "libraryvalley-358ff.appspot.com",
    messagingSenderId: "237777156570"
  };
  firebase.initializeApp(config);

// Home Route
exports.home = function(req, res) {

	var books = firebase.database().ref('books/');
	var users = firebase.database().ref('Users/');
	var ref = firebase.database().ref();
	
	ref.on("value", function(snapshot) {
	   //console.log(snapshot.val());
	}, function (error) {
	   console.log("Error: " + error.code);
	});
	console.log(users.toString());
	res.render('home', {
		title: "Library Valley",
		books : books
	});

	

};


// Route for all other page requests
exports.notFound = function(req, res) {
	var books = firebase.database().ref('books');
	res.render('notFound', {
		books : books,
		title : "Oops, this page doesn't exist"
	});
};