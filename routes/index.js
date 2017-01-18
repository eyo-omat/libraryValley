
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

	var books = firebase.database().ref('books');
	var users = firebase.database().ref('Users');
	var ref = firebase.database().ref();
	
	// ref.on("value", function(snapshot) {
	//    console.log(snapshot.val());
	// }, function (error) {
	//    console.log("Error: " + error.code);
	// });

	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
	res.render('home', {
		title: "Library Valley",
		books : bookList
	});
	console.log("Finished")
	});
	//console.log(userlist);

	

};

exports.addbooks = function(req, res) {
var books = firebase.database().ref('books');

	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
	res.render('addbooks', {
		title: "Add a Book",
		books : bookList,
	});
	console.log("Finished")
	});

};

exports.createbook = function(req, res) {
	var books = firebase.database().ref('books');
	if( req.body.bookName != '' || req.body.bookAuthor != '' ){
        books
          .push({
            bookName: req.body.bookName,
            author: req.body.bookAuthor,
            year: req.body.year,
            category: req.body.category
            //image: req.body.linkbox
          })
		books.on("value", function(snapshot) {
			var bookList  = snapshot.val();
		res.render('home', {
			title: "Library Valley",
			books : bookList,
		});
		console.log("Finished")
		});
	} else {
	  alert('Please fill atlease name or email!');
	}
};

exports.signup = function(req, res) {
	console.log(req.body);
	res.render('signup', {
		title: "Sign Up",
		error: "",
	});
	console.log("Finished")

};

exports.register = function(req, res) {
	var users = firebase.database().ref('Users');
	//var email = req.body.email;
	//var password = req.body.conPassword;
	//console.log(req.body);
	/*res.render('signup', {
		title: "Sign Up",
	});*/
	/*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		   console.log(error.code);
		   console.log(error.message);
	});*/

	if( req.body.email != '' || req.body.conPassword != '' ){
		firebase.auth().createUserWithEmailAndPassword( req.body.email, req.body.conPassword).catch(function(error) {
			   console.log(error.code);
			   console.log(error.message);
			   if (error.message != '' || error.code ) { 
					res.render('signup', {
						title: "Sign Up",
						error: error.message
					}); 
				} else {
		        users.push({
		            fullName: req.body.name,
		            email: req.body.email,
		            password: req.body.conPassword,
		            userRole: "user"
		          }) 
				res.render('home', {
					title: "Library Valley",
				});
				}
		});
	} else {
				res.render('signup', {
					title: "Library Valley",
					error: "Email and password are compulsory",
				});
	}

	console.log("Finished")

};

exports.singlebook = function(req, res) {
	var books = firebase.database().ref('books');

	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
		var book = bookList[req.params.bookname];
		console.log(book);
	res.render('singlebook', {
		title: book.bookName,
		books : bookList,
		book : book,
	});
	console.log("Finished")
	});

};
// Route for all other page requests
exports.notFound = function(req, res) {
	var books = firebase.database().ref('books');
	res.render('notFound', {
		books : books,
		title : "Oops , this page doesn't exist"
	});
};