
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

	/*$('.addValue').on("click", function( event ) {  
    event.preventDefault();
    //if( auth != null ){
      if( $('#bookTitle').val() != '' || $('#author').val() != '' ){
        books
          .push({
            bookName: $('#bookTitle').val(),
            author: $('#author').val(),
            year: $('#year').val(),
            category: $('#category').val()
          })
          document.addBookForm.reset();
      } else {
        alert('Please fill atlease name or email!');
      }
    //} else {
      //inform user to login
    //}
  });*/
console.log(req);

};

exports.signup = function(req, res) {
	var users = firebase.database().ref('Users');
	res.render('signup', {
		title: "Sign Up",
	});
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