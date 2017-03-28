/*
    @name server.js
    @summary Express API server
*/

// NODE MODULES
var express = require('express'); // express server framework
var mongoose = require('mongoose'); // MongoDB ORM module
var bodyParser = require('body-parser'); // express body parser middleware

// LOCAL VARS
var db = mongoose.connect('mongodb://localhost/libraryAPI');
var server = express();
var port = process.env.PORT || 3003;

// MODELS
var Book = require('./models/book');
var AudioBook = require('./models/audioBook');


// init body-parser middleware
server.use(bodyParser.json()); // handle JSON objects
server.use(bodyParser.urlencoded({extended: true}));

// setup /books router
var bookRouter = express.Router();

// configure route handlers
bookRouter.route('/books')
    .post(
        function createNewBook(request, response) {
            var newBook = new Book(request.body);
            // save the new book to db
            newBook.save();
            // reply success with newBook JSON
            response.json(newBook);
        }
    )
    .get(
        function getAllBooks(request, response) {
            Book.find(function(err, books) {
                if(err) {
                    response.status(500).send(err);
                } else {
                    response.json(books);
                }
            });
        }
    );

bookRouter.route('/books/:id')
    .get(
        function getBookById(request, response) {
            Book.findById(request.params.id, function(err, book) {
                if(!err) response.json(book);
                else response.status(500).send(err);
            });
        }
    );

// setup /audiobooks router
var audioBookRouter = express.Router();

// configure route handlers
audioBookRouter.route('/audiobooks')
    .get(
        function getAllAudioBooks(request, response) {
            AudioBook.find(function(err, audioBooks) {
                if(!err) response.json(audioBooks);
                else response.status(500).send(err);
            });
        }
    );

audioBookRouter.route('/audiobooks/:isbn')
    .get(
        function getAudioBookByIsbn(request, response) {
            AudioBook.find({isbn: request.params.isbn}, function(err, audioBook) {
                if(!err) response.json(audioBook);
                else response.status(500).send(err);
            });
        }
    );

server.use('/api', [bookRouter, audioBookRouter]);

server.get('/', function defaultRouteHandler(request, response) {
    response.send('Library API (Express) is up!');
});

server.listen(port, function startServer() {
    console.log(`Dev Server running at http://localhost:${port}`);
});

// END OF LINE
