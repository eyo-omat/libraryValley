
//<script src="https://www.gstatic.com/firebasejs/3.6.5/firebase.js"></script>
  // Initialize Firebase
var firebase = require('firebase');
  var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
  };
  firebase.initializeApp(config);

// Home Route
exports.home = function(req, res) {

	var books = firebase.database().ref('books');
	var users = firebase.database().ref('Users');
	var ref = firebase.database().ref();

	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
	return res.render('home', {
		title: "Library Valley",
		books : bookList
	});
	console.log("Finished")
	});
};
// User Home Route
exports.user = function(req, res) {

	var books = firebase.database().ref('books');
	var users = firebase.database().ref('Users');
	var ref = firebase.database().ref();

	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
	return res.render('user', {
		title: "Library Valley",
		books : bookList
	});
	console.log("Finished")
	});
};
// Categories Route
exports.viewcategories = function(req, res) {
	var ref = firebase.database().ref();

	ref.on("value", function(snapshot) {
		var refs  = snapshot.val();
	return res.render('viewcategories', {
		title: "Categories",
		categories : refs.categories,
		books : refs.books
	});
	console.log("Finished")
	});
};
// Category Route
exports.viewcategory = function(req, res) {
	var ref = firebase.database().ref();

	ref.on("value", function(snapshot) {
		var allTables  = snapshot.val();
		var categoryKey  = req.params.categoryName;
		var category  = allTables.categories[req.params.categoryName];
		var books  = allTables.books;
		var booksz  = [];
		for (key in books){ 
			if (books[key].category === req.params.categoryName) {
					 booksz.push(books[key]); 
			} 
		}
	return res.render('viewcategory', {
		title: category.categoryName,
		category : category,
		categoryKey : categoryKey,
		books : booksz
	});
	console.log("Finished")
	});
};
//Admin add book action route
exports.createCategory = function(req, res) {
	var categories = firebase.database().ref('categories');
	console.log(req.body);
	if( req.body.categoryName != ''){
		categories
          .push({
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription
          });
		return res.redirect('/viewcategories');
	} else {
	  alert('Please fill the name of the category');
	}
};
// admin add book page route
exports.addbooks = function(req, res) {
var tables = firebase.database().ref();

	tables.on("value", function(snapshot) {
		var tableList  = snapshot.val();
		return res.render('addbooks', {
			title: "Add a Book",
			books : tableList.books,
			categories : tableList.categories
		});
	console.log("Finished")
	});

};
//Admin add book action route
exports.createbook = function(req, res) {
	var books = firebase.database().ref('books');
	console.log(req.body);
	var image = "https://firebasestorage.googleapis.com/v0/b/libraryvalley-358ff.appspot.com/o/bookcovers%2F2016-01-27-PHOTO-00008304.jpg?alt=media&token=16c74a5a-cff4-42f2-8d02-b1cc985db42e";
	if( req.body.bookName != '' || req.body.bookAuthor != '' ){
		if( req.body.linkbox != ''){
	        image = req.body.linkbox;
	    }
        books
          .push({
            bookName: req.body.bookName,
            author: req.body.bookAuthor,
            year: req.body.year,
            category: req.body.category,
            image: image,
            quantity: req.body.quantity
          });
		return res.redirect('/');
		//return res.writeHead(302, { 'Location' : 'http://localhost:4400'} );
	} else {
	  //alert('Please fill atlease name and author!');
	}
};
//user sign up page route
exports.signup = function(req, res) {
	console.log(req.body);
	return res.render('signup', {
		title: "Sign Up",
		error: "",
	});
	console.log("Finished")

};
//user login page page route
exports.login = function(req, res) {
	console.log(req.body);
	return res.render('login', {
		title: "Log in",
		error: "",
	});
	console.log("Finished")

};
//user login page page route
exports.logout = function(req, res) {
	console.log(req.body);
firebase.auth().signOut().then(function() {
   console.log("Logged out!")
	return res.render('login', {
		title: "Log in",
		error: "",
	});
}, function(error) {
   console.log(error.code);
   console.log(error.message);
});
	console.log("Finished")

};
//user login page page route
exports.logins = function(req, res) {
	console.log(req.body);
if( req.body.email != '' || req.body.conPassword != '' ){
firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function (){ 
	if (req.body.email === "admin@liibraryvalley.heroku.com") { 
		return res.redirect('/')
	} else {
		return res.redirect('/user')
	}
	}).catch(function(error) {
   console.log(error.code);
   console.log(error.message);
	if (error.message != '' || error.code ) { 
	return res.render('login', {
		title: "Log in",
		error: error.message,
	});
} });
	} else {
				res.redirect('/signup');
	}
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
						return res.redirect('/login');
						console.log("Finished")

				}).catch(function(error) {
			   console.log(error.code);
			   console.log(error.message);
			   if (error.message != '' || error.code ) { 
					res.redirect('/signup'); 
				}
				
		});
	} else {
				res.redirect('/signup');
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
	return res.render('singlebook', {
		title: book.bookName,
		books : bookList,
		book : book,
		bookKey : bookKey
	});
	console.log("Finished")
	});

};
// Display a book route
exports.usersinglebook = function(req, res) {
	var books = firebase.database().ref('books');

	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
		var book = bookList[req.params.bookname];
		var bookKey = req.params.bookname;
		console.log(book);
	return res.render('usersinglebook', {
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
	var borrow = firebase.database().ref('borrowed');
	book.update({"quantity": book.quantity - 1 });
	var bookKey = req.params.bookname;
	var referenceCode = Math.random().toString(36).substr(2, 8); //randomString(8);
	var now = new Date();
	var rnow = new Date();
	rnow.setDate(now.getDate() + 10);
	var dd = now.getDate();
	var rdd = rnow.getDate();
	var mm = now.getMonth()+1;
	var rmm = rnow.getMonth()+1;
	var yyyy = now.getFullYear();
	var ryyyy = rnow.getFullYear();
	
	var now = dd+'/'+mm+'/'+yyyy;
	var rnow = rdd+'/'+rmm+'/'+ryyyy;
	console.log("now", now, "rnow", rnow, "referenceCode", referenceCode);
	borrow.push({
	            bookID: req.params.bookname,
	            borrowedDate: now,
	            returnDate: rnow,
	            referenceCode: referenceCode,
	            userID: "kojo",
	            status: "pending"
	          });
	books.on("value", function(snapshot) {
		var bookList  = snapshot.val();
	return res.redirect('/');
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
		return res.render('managebook', {
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
		return res.redirect('/');
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
	return res.redirect('/');
	console.log("Finished")
	});

};
// List all borrowed books route
exports.borrowedbooks = function(req, res) {
	var tables = firebase.database().ref();
	tables.on("value", function(snapshot) {
		var allTables  = snapshot.val();
	return res.render('borrowedbooks', {
		title: "Borrowed Books",
		books : allTables.books,
		borrowedbooks : allTables.borrowed
	});
	 console.log("Finished")
	 });

};
// return a book route
exports.returnbook = function(req, res) {
	var tables = firebase.database().ref();
	var borrowed = firebase.database().ref('borrowed');
	tables.on("value", function(snapshot) {
		var allTables  = snapshot.val();
		var borrowedbook = allTables.borrowed[req.params.borrowedbookkey];
		var returnDate = borrowedbook.returnDate;
		var user = users[borrowed.userID];
		var date1 = new Date();
		var date2 = new Date(returnDate);
		var diff = date2.valueOf() - date1.valueOf();
		if (diff < 0) { 
			return res.render('surcharge', {
				title: "Surcharge User",
				books : allTables.books,
				user : user
			}); 
		} else { 
			borrowed.update({status : "Returned"});
			return res.render('borrowedbooks', {
				title: "Borrowed Books",
				books : allTables.books,
				borrowedbooks : allTables.borrowed
			});
	 }
	 console.log("Finished")
	 });

};
// Route for all other page requests
exports.notFound = function(req, res) {
	var books = firebase.database().ref('books');
	return res.render('notFound', {
		books : books,
		title : "Oops , this page doesn't exist"
	});
};