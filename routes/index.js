
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
	
	ref.on("value", function(snapshot) {
	   console.log(snapshot.val());
	}, function (error) {
	   console.log("Error: " + error.code);
	});

	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
	res.render('home', {
		title: "Library Valley",
		books : bookList
	});
	console.log("Finished")
	});

	

};
// admin add book page route
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
//Admin add book action route
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
		res.redirect('home', {
			title: "Library Valley",
			books : bookList,
		});
		console.log("Finished")
		});
	} else {
	  alert('Please fill atlease name or email!');
	}
};
//user sign up page route
exports.signup = function(req, res) {
	console.log(req.body);
	res.render('signup', {
		title: "Sign Up",
		error: "",
	});
	console.log("Finished")

};
//User sign up action route
exports.register = function(req, res) {
	var users = firebase.database().ref('Users');
	var books = firebase.database().ref('books');

	if( req.body.email != '' || req.body.conPassword != '' ){
		firebase.auth().createUserWithEmailAndPassword( req.body.email, req.body.conPassword).then(function (){ 
					console.log("BEfore push")
			        userKey = users.push({
			            fullName: req.body.name,
			            email: req.body.email,
			            password: req.body.conPassword,
			            userRole: "user"
			          });
				console.log("after push")
					books.on("value", function(snapshot) {
						var bookList  = snapshot.val();
						res.redirect('home', {
							title: "Library Valley",
							books : bookList
						});
						console.log("Finished")
					});
					users.on("value", function(snapshot) {
						var userList  = snapshot.val();
						var user  = userList[userKey];
						res.redirect('home', {
							title: "Library Valley",
							books : bookList,
							users : userList,
							user : user,
						});
						console.log("Finished")
					});

				}).catch(function(error) {
			   console.log(error.code);
			   console.log(error.message);
			   if (error.message != '' || error.code ) { 
					res.redirect('signup', {
						title: "Sign Up",
						error: error.message
					}); 
				}
				
		});
	} else {
				res.redirect('signup', {
					title: "Library Valley",
					error: "Email and password are compulsory",
				});
	}

	console.log("Finished")

};
// Display a book route
exports.singlebook = function(req, res) {
	var books = firebase.database().ref('books');

	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
		var book = bookList[req.params.bookname];
		var bookKey = req.params.bookname;
		console.log(book);
	res.render('singlebook', {
		title: book.bookName,
		books : bookList,
		book : book,
		bookKey : bookKey
	});
	console.log("Finished")
	});

};
//borrow a book route
exports.borrowbook = function(req, res) {
	var book = firebase.database().ref('books').child(req.params.bookname);
	var books = firebase.database().ref('books');
	book.once("value", function(snapshot) {
		var book1  = snapshot.val(); 
		console.log(book1);
		if( book1 === null ) {
	        /* does not exist */
	    } else {
	        book.update({"borrowed": req.params.borrowedValue});
	    }
		var bookKey = req.params.bookname;
	 console.log("Finished")
	 });
	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
	res.redirect('home', {
		title: "Library Valley",
		books : bookList
	});
	console.log("Finished")
	});

};
//manage a book route
exports.managebook = function(req, res) {
	var book = firebase.database().ref('books').child(req.params.bookname);
	var books = firebase.database().ref('books');
	books.on("value", function(snapshot) {
		var bookList  = snapshot.val(); 
		console.log(book1);
		var book1 = bookList[req.params.bookname];
		var bookKey = req.params.bookname;
		 res.render('managebook', {
		 	title: book1.bookName,
		 	book : book1,
		 	books : bookList,
		 	bookKey : bookKey
		 });
	 console.log("Finished")
	 });

};
//update a book route
exports.updatebook = function(req, res) {
	var book = firebase.database().ref('books').child(req.params.bookname);
	var books = firebase.database().ref('books');
	console.log(req.params);
	console.log(req.body);
	book.update({
            bookName: req.body.bookName,
            author: req.body.bookAuthor,
            year: req.body.year,
            category: req.body.category
          })
	books.on("value", function(snapshot) {
		var bookList  = snapshot.val(); 
		console.log(book1);
		var book1 = bookList[req.params.bookname];
		var bookKey = req.params.bookname;
		 res.redirect('home', {
		 	title: "Library Valley",
		 	book : book1,
		 	books : bookList,
		 	bookKey : bookKey
		 });
	 console.log("Finished")
	 });

};
// Delete a book route
exports.deletebook = function(req, res) {
	var book = firebase.database().ref('books').child(req.params.bookname);
	var books = firebase.database().ref('books');
	book.once("value", function(snapshot) {
		var book1  = snapshot.val(); 
		console.log(book1);
		if( book1 === null ) {
	        /* does not exist */
	    } else {
	        book.remove();
	    }
		var bookKey = req.params.bookname;
	 console.log("Finished")
	 });
	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
	res.redirect('home', {
		title: "Library Valley",
		books : bookList
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